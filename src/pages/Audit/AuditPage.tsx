
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Loader2, FileText, Calculator, Filter } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

const AuditPage = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [auditResults, setAuditResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [processingAudit, setProcessingAudit] = useState(false);
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);

  // Fetch payments on component mount
  useEffect(() => {
    fetchPayments();
    fetchAuditResults();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('payments')
        .select(`
          id,
          amount,
          payment_date,
          document_number,
          description,
          suppliers (
            id,
            company_name,
            cnpj,
            activity_code
          ),
          clients (
            id,
            company_name,
            cnpj
          )
        `)
        .order('payment_date', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      setPayments(data || []);
    } catch (error) {
      console.error('Error fetching payments:', error);
      toast.error('Falha ao carregar pagamentos');
    } finally {
      setLoading(false);
    }
  };

  const fetchAuditResults = async () => {
    try {
      const { data, error } = await supabase
        .from('audit_results')
        .select(`
          id,
          payment_id,
          original_amount,
          retention_rate,
          retention_amount,
          net_amount,
          created_at,
          suppliers (
            id,
            company_name,
            cnpj
          )
        `)
        .order('created_at', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      setAuditResults(data || []);
    } catch (error) {
      console.error('Error fetching audit results:', error);
      toast.error('Falha ao carregar resultados de auditoria');
    }
  };

  const handleAudit = async () => {
    if (selectedPayments.length === 0) {
      toast.error('Selecione pelo menos um pagamento para auditar');
      return;
    }
    
    setProcessingAudit(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('process-audit', {
        body: { payment_ids: selectedPayments }
      });

      if (error) {
        console.error('Error calling audit function:', error);
        toast.error('Falha ao processar auditoria: ' + error.message);
        return;
      }

      if (data.errors && data.errors.length > 0) {
        toast.warning(`Processado com ${data.errors.length} erros`);
      } else {
        toast.success('Auditoria processada com sucesso');
      }
      
      // Refresh data
      fetchPayments();
      fetchAuditResults();
      setSelectedPayments([]);
    } catch (error) {
      console.error('Exception during audit processing:', error);
      toast.error('Erro ao processar a auditoria');
    } finally {
      setProcessingAudit(false);
    }
  };

  const togglePaymentSelection = (paymentId: string) => {
    setSelectedPayments(prev => 
      prev.includes(paymentId)
        ? prev.filter(id => id !== paymentId)
        : [...prev, paymentId]
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  // Check if a payment has been audited
  const isPaymentAudited = (paymentId: string) => {
    return auditResults.some(result => result.payment_id === paymentId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Auditoria Fiscal</h1>
        <p className="text-muted-foreground">
          Analise e processe pagamentos para cálculo de retenções tributárias
        </p>
      </div>

      <Separator />

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Pagamentos</h2>
        <div className="flex space-x-2">
          <Button
            onClick={fetchPayments}
            variant="outline"
            size="sm"
          >
            Atualizar
          </Button>
          <Button
            onClick={handleAudit}
            disabled={processingAudit || selectedPayments.length === 0}
            size="sm"
          >
            {processingAudit ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Calculator className="h-4 w-4 mr-2" />
            )}
            Auditar Selecionados
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : payments.length > 0 ? (
            <ScrollArea className="h-[400px] w-full rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10">
                      <span className="sr-only">Selecionar</span>
                    </TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Documento</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => {
                    const audited = isPaymentAudited(payment.id);
                    
                    return (
                      <TableRow key={payment.id}>
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={selectedPayments.includes(payment.id)}
                            onChange={() => togglePaymentSelection(payment.id)}
                            disabled={audited}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{payment.clients.company_name}</div>
                          <div className="text-xs text-muted-foreground">{payment.clients.cnpj}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{payment.suppliers.company_name}</div>
                          <div className="text-xs text-muted-foreground">{payment.suppliers.cnpj}</div>
                        </TableCell>
                        <TableCell>{formatDate(payment.payment_date)}</TableCell>
                        <TableCell>{payment.document_number || '-'}</TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(payment.amount)}
                        </TableCell>
                        <TableCell className="text-center">
                          {audited ? (
                            <Badge variant="success">Auditado</Badge>
                          ) : (
                            <Badge variant="outline">Pendente</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </ScrollArea>
          ) : (
            <div className="flex flex-col justify-center items-center h-64 text-muted-foreground">
              <FileText className="h-12 w-12 mb-4 opacity-30" />
              <p>Nenhum pagamento registrado</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between items-center mt-8">
        <h2 className="text-xl font-semibold">Resultados de Auditoria</h2>
        <Button
          onClick={fetchAuditResults}
          variant="outline"
          size="sm"
        >
          Atualizar
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {auditResults.length > 0 ? (
            <ScrollArea className="h-[400px] w-full rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead className="text-right">Valor Original</TableHead>
                    <TableHead className="text-right">Taxa</TableHead>
                    <TableHead className="text-right">Retenção</TableHead>
                    <TableHead className="text-right">Valor Líquido</TableHead>
                    <TableHead>Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditResults.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell>
                        <div className="font-medium">{result.suppliers.company_name}</div>
                        <div className="text-xs text-muted-foreground">{result.suppliers.cnpj}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(result.original_amount)}
                      </TableCell>
                      <TableCell className="text-right">
                        {result.retention_rate}%
                      </TableCell>
                      <TableCell className="text-right font-medium text-destructive">
                        {formatCurrency(result.retention_amount)}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(result.net_amount)}
                      </TableCell>
                      <TableCell>{formatDate(result.created_at)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          ) : (
            <div className="flex flex-col justify-center items-center h-64 text-muted-foreground">
              <Filter className="h-12 w-12 mb-4 opacity-30" />
              <p>Nenhum resultado de auditoria</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Como funciona</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>1. Entrada de Dados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                O cliente fornece a lista de pagamentos realizados aos fornecedores. O sistema verifica se o fornecedor já está cadastrado.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>2. Consulta de Fornecedores</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Caso o fornecedor não esteja no banco de dados, o sistema consulta a API do CNPJ.ws para obter os dados completos.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>3. Cálculo de Retenções</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Com base na atividade do fornecedor, o sistema aplica as alíquotas de retenção corretas e calcula os valores a serem retidos.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuditPage;
