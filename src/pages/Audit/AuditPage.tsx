import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from "@/components/ui/use-toast"
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface Payment {
  id: string;
  client_id: string;
  supplier_id: string;
  amount: number;
  date: string;
  description: string;
  suppliers: {
    activity_code: string;
  }
}

interface AuditResult {
  payment_id: string;
  supplier_id: string;
  original_amount: number;
  retention_rate: number;
  retention_amount: number;
  net_amount: number;
}

const AuditPage: React.FC = () => {
  const [auditResults, setAuditResults] = useState<AuditResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAuditResults = async () => {
    try {
      const { data, error } = await supabase
        .from('audit_results')
        .select('*');

      if (error) {
        console.error("Erro ao buscar resultados da auditoria:", error);
        return;
      }

      setAuditResults(data || []);
    } catch (error) {
      console.error("Erro ao buscar resultados da auditoria:", error);
    }
  };

  useEffect(() => {
    fetchAuditResults();
  }, []);

  const columns: ColumnDef<AuditResult>[] = [
    {
      accessorKey: 'payment_id',
      header: 'ID do Pagamento',
    },
    {
      accessorKey: 'supplier_id',
      header: 'ID do Fornecedor',
    },
    {
      accessorKey: 'original_amount',
      header: 'Valor Original',
    },
    {
      accessorKey: 'retention_rate',
      header: 'Taxa de Retenção',
    },
    {
      accessorKey: 'retention_amount',
      header: 'Valor de Retenção',
    },
    {
      accessorKey: 'net_amount',
      header: 'Valor Líquido',
    },
  ];

  // Fix the toast.success type error by changing the variant
  const handleProcessAudit = async (clientId: string) => {
    setIsLoading(true);
    try {
      const { data: paymentData, error: paymentError } = await supabase
        .from('payments')
        .select('*, suppliers(*)')
        .eq('client_id', clientId);

      if (paymentError) {
        toast({
          variant: "destructive",
          title: "Erro ao buscar pagamentos",
          description: paymentError.message,
        });
        setIsLoading(false);
        return;
      }

      // Process each payment
      const results = await Promise.all(
        paymentData.map(async (payment) => {
          // Get tax rate based on supplier's activity code
          const { data: taxRateData, error: taxRateError } = await supabase
            .from('tax_rates')
            .select('*')
            .eq('activity_code', payment.suppliers.activity_code)
            .single();

          if (taxRateError) {
            return {
              payment_id: payment.id,
              error: `Taxa não encontrada para o código de atividade ${payment.suppliers.activity_code}`
            };
          }

          // Calculate retention
          const retentionAmount = (payment.amount * taxRateData.retention_rate) / 100;
          const netAmount = payment.amount - retentionAmount;

          // Save audit result
          const { data: auditData, error: auditError } = await supabase
            .from('audit_results')
            .insert({
              payment_id: payment.id,
              supplier_id: payment.supplier_id,
              original_amount: payment.amount,
              retention_rate: taxRateData.retention_rate,
              retention_amount: retentionAmount,
              net_amount: netAmount
            });

          if (auditError) {
            return {
              payment_id: payment.id,
              error: auditError.message
            };
          }

          return {
            payment_id: payment.id,
            success: true,
            original_amount: payment.amount,
            retention_rate: taxRateData.retention_rate,
            retention_amount: retentionAmount,
            net_amount: netAmount
          };
        })
      );

      // Check for any errors
      const errors = results.filter(r => r.error);
      if (errors.length > 0) {
        toast({
          variant: "destructive",
          title: "Alguns pagamentos não puderam ser processados",
          description: `${errors.length} pagamentos com erro. Verifique os logs.`,
        });
      } else {
        toast({
          title: "Auditoria concluída",
          description: `${results.length} pagamentos processados com sucesso.`,
        });
      }

      // Refresh data
      fetchAuditResults();
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erro ao processar auditoria",
        description: error instanceof Error ? error.message : "Erro desconhecido",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Auditoria</h1>
      <Button
        onClick={() => handleProcessAudit('seu_client_id')}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processando...
          </>
        ) : (
          'Processar Auditoria'
        )}
      </Button>
      <DataTable columns={columns} data={auditResults} />
    </div>
  );
};

export default AuditPage;
