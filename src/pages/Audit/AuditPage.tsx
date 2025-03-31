import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Payment, AuditResult } from '@/types/audit';
import { auditService } from '@/services/auditService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DatePickerWithRange } from '@/components/ui/date-picker-with-range';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Loader2 } from 'lucide-react';

export default function AuditPage() {
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [fileContent, setFileContent] = useState<Payment[]>([]);

  const { data: auditResults, isLoading: isLoadingResults } = useQuery({
    queryKey: ['auditResults', dateRange],
    queryFn: () => auditService.getAuditResults(
      'current-client-id',
      dateRange.from,
      dateRange.to
    ),
    enabled: !!dateRange.from && !!dateRange.to,
  });

  const processMutation = useMutation({
    mutationFn: (payments: Payment[]) => auditService.processPaymentsList(payments),
    onSuccess: () => {
      toast({
        title: 'Processamento concluído',
        description: 'Os dados dos fornecedores foram atualizados com sucesso.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro no processamento',
        description: error instanceof Error ? error.message : 'Erro desconhecido',
        variant: 'destructive',
      });
    },
  });

  const auditMutation = useMutation({
    mutationFn: (payments: Payment[]) => auditService.auditPayments(payments),
    onSuccess: () => {
      toast({
        title: 'Auditoria concluída',
        description: 'Os pagamentos foram auditados com sucesso.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro na auditoria',
        description: error instanceof Error ? error.message : 'Erro desconhecido',
        variant: 'destructive',
      });
    },
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const payments = JSON.parse(text) as Payment[];
      setFileContent(payments);
      
      // Processar lista de pagamentos
      await processMutation.mutateAsync(payments);
    } catch (error) {
      toast({
        title: 'Erro ao processar arquivo',
        description: 'O arquivo deve estar no formato JSON válido',
        variant: 'destructive',
      });
    }
  };

  const handleAudit = async () => {
    if (!fileContent.length) {
      toast({
        title: 'Nenhum dado para auditar',
        description: 'Por favor, faça upload do arquivo de pagamentos primeiro.',
        variant: 'destructive',
      });
      return;
    }

    await auditMutation.mutateAsync(fileContent);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Auditoria de Retenções</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="max-w-sm"
            />
            <Button
              onClick={handleAudit}
              disabled={!fileContent.length || auditMutation.isPending}
            >
              {auditMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Auditar Pagamentos
            </Button>
          </div>

          <DatePickerWithRange
            value={dateRange}
            onChange={setDateRange}
          />
        </CardContent>
      </Card>

      {isLoadingResults ? (
        <div className="flex justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : auditResults?.length ? (
        <Card>
          <CardHeader>
            <CardTitle>Resultados da Auditoria</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Fornecedor</TableHead>
                  <TableHead>CNPJ</TableHead>
                  <TableHead>Valor Original</TableHead>
                  <TableHead>Alíquota</TableHead>
                  <TableHead>Valor Retenção</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell>
                      {format(result.audit_date, 'dd/MM/yyyy', { locale: ptBR })}
                    </TableCell>
                    <TableCell>{result.supplier.razao_social}</TableCell>
                    <TableCell>{result.supplier.cnpj}</TableCell>
                    <TableCell>{formatCurrency(result.original_value)}</TableCell>
                    <TableCell>{result.tax_rate}%</TableCell>
                    <TableCell>{formatCurrency(result.tax_value)}</TableCell>
                    <TableCell>{result.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
