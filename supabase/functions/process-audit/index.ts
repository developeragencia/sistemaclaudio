
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY') || '';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the request body
    const { payment_ids } = await req.json();
    
    if (!payment_ids || !Array.isArray(payment_ids) || payment_ids.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Valid payment_ids array is required' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    const auditResults = [];
    const errors = [];

    // Process each payment
    for (const paymentId of payment_ids) {
      // Fetch payment details with supplier information
      const { data: payment, error: paymentError } = await supabase
        .from('payments')
        .select(`
          id,
          amount,
          supplier_id,
          suppliers!inner (
            id,
            activity_code
          )
        `)
        .eq('id', paymentId)
        .single();
        
      if (paymentError) {
        errors.push({ payment_id: paymentId, error: paymentError.message });
        continue;
      }
      
      // Find applicable tax rate for the supplier's activity
      const { data: taxRate, error: taxRateError } = await supabase
        .from('tax_rates')
        .select('*')
        .eq('activity_code', payment.suppliers.activity_code)
        .maybeSingle();
        
      if (taxRateError) {
        errors.push({ payment_id: paymentId, error: taxRateError.message });
        continue;
      }
      
      // Use default tax rate if none found for this activity code
      const retentionRate = taxRate ? taxRate.retention_rate : 0;
      
      // Calculate retention amount
      const retentionAmount = (payment.amount * retentionRate) / 100;
      const netAmount = payment.amount - retentionAmount;
      
      // Create audit result
      const auditData = {
        payment_id: payment.id,
        supplier_id: payment.supplier_id,
        original_amount: payment.amount,
        retention_rate: retentionRate,
        retention_amount: retentionAmount,
        net_amount: netAmount
      };
      
      // Save audit result to database
      const { data: auditResult, error: auditError } = await supabase
        .from('audit_results')
        .insert(auditData)
        .select('*')
        .single();
        
      if (auditError) {
        errors.push({ payment_id: paymentId, error: auditError.message });
        continue;
      }
      
      auditResults.push(auditResult);
    }
    
    return new Response(
      JSON.stringify({ 
        results: auditResults,
        errors: errors,
        message: `Processed ${auditResults.length} payments with ${errors.length} errors`
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
    
  } catch (error) {
    console.error('Error processing audit:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
