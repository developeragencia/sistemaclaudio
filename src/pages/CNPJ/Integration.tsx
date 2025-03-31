
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Search, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const CNPJIntegration = () => {
  const [cnpj, setCnpj] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCnpjLookup = async () => {
    if (!cnpj.trim()) {
      toast.error('Por favor, informe um CNPJ válido');
      return;
    }

    setLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('cnpj-lookup', {
        body: { cnpj: cnpj.trim() }
      });

      if (error) {
        console.error('Error calling CNPJ lookup function:', error);
        toast.error('Falha ao consultar CNPJ: ' + error.message);
        return;
      }

      setResult(data);
      
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.message || 'Consulta realizada com sucesso');
      }
    } catch (error) {
      console.error('Exception during CNPJ lookup:', error);
      toast.error('Erro ao processar a consulta');
    } finally {
      setLoading(false);
    }
  };

  const formatCnpj = (value: string) => {
    // Remove any non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Apply CNPJ mask (XX.XXX.XXX/XXXX-XX)
    if (digits.length <= 2) {
      return digits;
    } else if (digits.length <= 5) {
      return `${digits.slice(0, 2)}.${digits.slice(2)}`;
    } else if (digits.length <= 8) {
      return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
    } else if (digits.length <= 12) {
      return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
    } else {
      return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12, 14)}`;
    }
  };

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCnpj(e.target.value);
    setCnpj(formattedValue);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Integração CNPJ.ws</h1>
        <p className="text-muted-foreground">
          Consulte e importe dados de fornecedores através do CNPJ
        </p>
      </div>

      <Separator />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Consulta de CNPJ</CardTitle>
            <CardDescription>
              Informe o CNPJ para consultar informações do fornecedor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input
                placeholder="XX.XXX.XXX/XXXX-XX"
                value={cnpj}
                onChange={handleCnpjChange}
                maxLength={18}
              />
              <Button 
                onClick={handleCnpjLookup} 
                disabled={loading || !cnpj.trim()}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Search className="h-4 w-4 mr-2" />
                )}
                Consultar
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resultado da Consulta</CardTitle>
            <CardDescription>
              Informações do fornecedor consultado
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : result?.supplier ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Razão Social</p>
                  <p className="text-lg">{result.supplier.company_name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Nome Fantasia</p>
                  <p>{result.supplier.trade_name || '-'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">CNPJ</p>
                  <p>{result.supplier.cnpj}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Atividade Principal</p>
                  <p>{result.supplier.activity_code} - {result.supplier.activity_description || '-'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Regime Tributário</p>
                  <p>{result.supplier.tax_regime || '-'}</p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center h-40 text-muted-foreground">
                <p>Nenhum resultado para exibir</p>
              </div>
            )}
          </CardContent>
          {result?.supplier && (
            <CardFooter>
              <p className="text-xs text-muted-foreground">{result.message}</p>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CNPJIntegration;
