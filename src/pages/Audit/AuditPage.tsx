
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { FileUpload, Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useQueryClient } from '@tanstack/react-query';

// Create mock audit records for demo purposes
const mockAuditRecords = [
  {
    id: '1',
    date: '2025-02-15',
    company: 'Empresa ABC Ltda',
    irpjValue: 125000.50,
    csllValue: 45000.20,
    status: 'approved',
    createdBy: 'ana.silva@example.com'
  },
  {
    id: '2',
    date: '2025-01-30',
    company: 'XYZ Comércio S.A.',
    irpjValue: 78500.75,
    csllValue: 28200.90,
    status: 'pending',
    createdBy: 'carlos.oliveira@example.com'
  },
  {
    id: '3',
    date: '2025-01-10',
    company: 'Indústrias Reunidas Ltda',
    irpjValue: 235000.00,
    csllValue: 84600.00,
    status: 'rejected',
    createdBy: 'patricia.santos@example.com'
  }
];

const AuditPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [auditStep, setAuditStep] = useState<'upload' | 'processing' | 'results'>('upload');
  const [processingProgress, setProcessingProgress] = useState(0);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const simulateProcessing = () => {
    setAuditStep('processing');
    setIsProcessing(true);
    setProcessingProgress(0);
    
    const interval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setAuditStep('results');
          return 100;
        }
        return prev + 5;
      });
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast({
        title: "Erro ao enviar arquivo",
        description: "Por favor, selecione um arquivo para iniciar a auditoria.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Arquivo enviado com sucesso",
      description: "Iniciando processamento de auditoria.",
      // Fix the TypeScript error by using a valid variant
      variant: "default"
    });
    
    simulateProcessing();
  };

  const handleReset = () => {
    setFile(null);
    setAuditStep('upload');
    setProcessingProgress(0);
  };

  const renderUploadStep = () => (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6">
        <div className="space-y-2">
          <Label htmlFor="file">Arquivo para Auditoria</Label>
          <div className="flex items-center gap-4">
            <Input
              id="file"
              type="file"
              accept=".xml,.csv,.xlsx"
              onChange={handleFileChange}
              className="flex-1"
            />
            <Button type="submit" disabled={!file}>
              <FileUpload className="mr-2 h-4 w-4" />
              Enviar
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Formatos aceitos: XML, CSV, XLSX. Tamanho máximo: 100MB.
          </p>
        </div>
      </div>
    </form>
  );

  const renderProcessingStep = () => (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center p-6">
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${processingProgress}%` }}
          ></div>
        </div>
        <p className="text-lg font-medium">{processingProgress}% Completo</p>
        <p className="text-muted-foreground mt-2">Processando {file?.name}</p>
      </div>
    </div>
  );

  const renderResultsStep = () => (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">Processamento concluído com sucesso</h3>
            <div className="mt-2 text-sm text-green-700">
              <p>Foram processados todos os registros do arquivo {file?.name}.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Resultados da Auditoria</h3>
          <Button variant="outline" onClick={handleReset}>Nova Auditoria</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">R$ 438.501,25</div>
              <p className="text-muted-foreground">IRPJ Auditado</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">R$ 157.801,10</div>
              <p className="text-muted-foreground">CSLL Auditado</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">85%</div>
              <p className="text-muted-foreground">Taxa de Conformidade</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="py-3 px-4 text-left">Data</th>
                <th className="py-3 px-4 text-left">Empresa</th>
                <th className="py-3 px-4 text-right">IRPJ (R$)</th>
                <th className="py-3 px-4 text-right">CSLL (R$)</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Criado por</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {mockAuditRecords.map((record) => (
                <tr key={record.id}>
                  <td className="py-3 px-4">{record.date}</td>
                  <td className="py-3 px-4">{record.company}</td>
                  <td className="py-3 px-4 text-right">{record.irpjValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td className="py-3 px-4 text-right">{record.csllValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      record.status === 'approved' ? 'bg-green-100 text-green-800' :
                      record.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {record.status === 'approved' ? 'Aprovado' :
                       record.status === 'rejected' ? 'Rejeitado' : 'Pendente'}
                    </span>
                  </td>
                  <td className="py-3 px-4">{record.createdBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Auditoria Fiscal</h1>
        <p className="text-muted-foreground">
          Faça upload de arquivos para análise automática e recuperação de créditos tributários.
        </p>
      </div>
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Auditoria de IRRF/PJ</CardTitle>
          <CardDescription>
            Submeta arquivos de notas fiscais e extratos financeiros para verificação de retenções indevidas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {auditStep === 'upload' && renderUploadStep()}
          {auditStep === 'processing' && renderProcessingStep()}
          {auditStep === 'results' && renderResultsStep()}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditPage;
