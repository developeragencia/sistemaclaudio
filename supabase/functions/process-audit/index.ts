
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
    const { clientId, paymentIds = [] } = await req.json();
    
    if (!clientId) {
      return new Response(
        JSON.stringify({ error: 'Client ID is required' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    // Get payments for audit
    const { data: payments, error: paymentsError } = await supabase
      .from('payments')
      .select(`
        id,
        amount,
        payment_date,
        document_number,
        supplier_id,
        suppliers(
          id,
          cnpj,
          company_name,
          activity_code
        )
      `)
      .eq('client_id', clientId)
      .in('id', paymentIds.length > 0 ? paymentIds : ['00000000-0000-0000-0000-000000000000']);
    
    if (paymentsError) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch payments', details: paymentsError }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      );
    }

    // Process each payment for audit
    const auditResults = [];
    
    for (const payment of payments) {
      const supplierActivityCode = payment.suppliers?.activity_code;
      
      if (!supplierActivityCode) {
        auditResults.push({
          paymentId: payment.id,
          error: 'Supplier activity code not found'
        });
        continue;
      }
      
      // Get tax rate for supplier activity
      const { data: taxRate, error: taxRateError } = await supabase
        .from('tax_rates')
        .select('retention_rate')
        .eq('activity_code', supplierActivityCode)
        .maybeSingle();
      
      if (taxRateError || !taxRate) {
        auditResults.push({
          paymentId: payment.id,
          error: 'Tax rate not found for supplier activity'
        });
        continue;
      }
      
      const retentionRate = taxRate.retention_rate;
      const originalAmount = parseFloat(payment.amount);
      const retentionAmount = originalAmount * (retentionRate / 100);
      const netAmount = originalAmount - retentionAmount;
      
      // Create audit result
      const { data: auditResult, error: auditError } = await supabase
        .from('audit_results')
        .insert({
          payment_id: payment.id,
          supplier_id: payment.supplier_id,
          original_amount: originalAmount,
          retention_rate: retentionRate,
          retention_amount: retentionAmount,
          net_amount: netAmount
        })
        .select()
        .single();
      
      if (auditError) {
        auditResults.push({
          paymentId: payment.id,
          error: 'Failed to create audit result'
        });
      } else {
        auditResults.push(auditResult);
      }
    }
    
    return new Response(
      JSON.stringify({ 
        results: auditResults,
        message: 'Audit processing completed'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
    
  } catch (error) {
    console.error('Error processing request:', error);
    
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
