
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const CNPJ_API_KEY = Deno.env.get('CNPJ_API_KEY') || 'l7voA9Wjb7XLFe0nUVjCmrwEXV5wK076D7XFVx4M3Z27';
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
    const { cnpj } = await req.json();
    
    if (!cnpj) {
      return new Response(
        JSON.stringify({ error: 'CNPJ is required' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    // Format CNPJ (remove non-numeric characters)
    const formattedCnpj = cnpj.replace(/\D/g, '');
    
    // Check if supplier already exists in our database
    const { data: existingSupplier, error: supplierError } = await supabase
      .from('suppliers')
      .select('*')
      .eq('cnpj', formattedCnpj)
      .maybeSingle();
      
    if (supplierError) {
      console.error('Error checking for existing supplier:', supplierError);
    }
    
    // If supplier exists, return it
    if (existingSupplier) {
      return new Response(
        JSON.stringify({ 
          supplier: existingSupplier,
          message: 'Supplier found in our database'
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    }
    
    // Supplier not found, fetch from CNPJ.ws API
    const apiUrl = `https://publica.cnpj.ws/cnpj/${formattedCnpj}`;
    
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${CNPJ_API_KEY}`
      }
    });
    
    if (!response.ok) {
      return new Response(
        JSON.stringify({ 
          error: `Failed to fetch CNPJ data: ${response.statusText}`,
          status: response.status
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: response.status 
        }
      );
    }
    
    const cnpjData = await response.json();
    
    // Transform the data to match our suppliers table schema
    const supplierData = {
      cnpj: formattedCnpj,
      company_name: cnpjData.razao_social || '',
      trade_name: cnpjData.nome_fantasia || '',
      activity_code: cnpjData.estabelecimento?.atividade_principal?.codigo || '',
      activity_description: cnpjData.estabelecimento?.atividade_principal?.descricao || '',
      tax_regime: cnpjData.simples?.simples || 'Não informado',
    };
    
    // Insert the new supplier into our database
    const { data: newSupplier, error: insertError } = await supabase
      .from('suppliers')
      .insert(supplierData)
      .select('*')
      .single();
      
    if (insertError) {
      console.error('Error inserting new supplier:', insertError);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to save supplier data',
          details: insertError
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      );
    }
    
    return new Response(
      JSON.stringify({ 
        supplier: newSupplier,
        message: 'Supplier retrieved from CNPJ.ws API and saved to database'
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
