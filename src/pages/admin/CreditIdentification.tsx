
import React, { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Search, Upload, FileUp, FileDown, Filter, RefreshCw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock data para fornecedores
const MOCK_SUPPLIERS = [
  {
    id: '1',
    cnpj: '12.345.678/0001-90',
    name: 'Empresa de Consultoria ABC Ltda',
    activity: 'Consultoria em gestão empresarial',
    isTaxable: true,
    lastPayment: '2023-04-15',
    status: 'analyzed',
  },
  {
    id: '2',
    cnpj: '23.456.789/0001-12',
    name: 'Serviços de TI XYZ S.A.',
    activity: 'Desenvolvimento de software',
    isTaxable: true,
    lastPayment: '2023-05-20',
    status: 'pending',
  },
  {
    id: '3',
    cnpj: '34.567.890/0001-34',
    name: 'Construções e Reformas Ltda',
    activity: 'Construção civil',
    isTaxable: false,
    lastPayment: '2023-03-10',
    status: 'exempted',
  },
  {
    id: '4',
    cnpj: '45.678.901/0001-56',
    name: 'Fornecedora de Materiais de Escritório ME',
    activity: 'Comércio varejista',
    isTaxable: false,
    lastPayment: '2023-05-05',
    status: 'exempted',
  },
  {
    id: '5',
    cnpj: '56.789.012/0001-78',
    name: 'Agência de Marketing Digital Ltda',
    activity: 'Marketing e publicidade',
    isTaxable: true,
    lastPayment: '2023-06-02',
    status: 'pending',
  },
];

// Mock data para pagamentos
const MOCK_PAYMENTS = [
  {
    id: '1',
    supplierId: '1',
    supplierName: 'Empresa de Consultoria ABC Ltda',
    value: 12500.0,
    date: '2023-04-15',
    taxValue: 187.5,
    status: 'analyzed',
  },
  {
    id: '2',
    supplierId: '2',
    supplierName: 'Serviços de TI XYZ S.A.',
    value: 8750.0,
    date: '2023-05-20',
    taxValue: 131.25,
    status: 'pending',
  },
  {
    id: '3',
    supplierId: '3',
    supplierName: 'Construções e Reformas Ltda',
    value: 45000.0,
    date: '2023-03-10',
    taxValue: 0.0,
    status: 'exempted',
  },
  {
    id: '4',
    supplierId: '4',
    supplierName: 'Fornecedora de Materiais de Escritório ME',
    value: 3200.0,
    date: '2023-05-05',
    taxValue: 0.0,
    status: 'exempted',
  },
  {
    id: '5',
    supplierId: '5',
    supplierName: 'Agência de Marketing Digital Ltda',
    value: 18500.0,
    date: '2023-06-02',
    taxValue: 277.5,
    status: 'pending',
  },
];

const CreditIdentification = () => {
  const { activeClient } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzeProgress, setAnalyzeProgress] = useState(0);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'analyzed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'exempted':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'analyzed':
        return 'Analisado';
      case 'pending':
        return 'Pendente';
      case 'exempted':
        return 'Isento';
      default:
        return status;
    }
  };

  const filteredSuppliers = MOCK_SUPPLIERS.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.cnpj.includes(searchTerm) ||
      supplier.activity.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter ? supplier.status === statusFilter : true;

    return matchesSearch && matchesStatus;
  });

  const filteredPayments = MOCK_PAYMENTS.filter((payment) => {
    const matchesSearch =
      payment.supplierName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter ? payment.status === statusFilter : true;

    return matchesSearch && matchesStatus;
  });

  const totalCredits = filteredPayments
    .filter((payment) => payment.status === 'analyzed')
    .reduce((total, payment) => total + payment.taxValue, 0);

  const handleFileUpload = () => {
    setUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleAnalyzeData = () => {
    setAnalyzing(true);
    setAnalyzeProgress(0);

    const interval = setInterval(() => {
      setAnalyzeProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setAnalyzing(false);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <AdminLayout
      title="Identificação de Créditos"
      description="Análise automática de pagamentos para identificação de créditos tributários"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total de Fornecedores</CardTitle>
            <CardDescription>Analisados nos últimos 60 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{MOCK_SUPPLIERS.length}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {MOCK_SUPPLIERS.filter((s) => s.isTaxable).length} fornecedores com retenção obrigatória
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total de Pagamentos</CardTitle>
            <CardDescription>Analisados nos últimos 60 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{MOCK_PAYMENTS.length}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {formatCurrency(MOCK_PAYMENTS.reduce((total, p) => total + p.value, 0))} em valor total
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Créditos Potenciais</CardTitle>
            <CardDescription>Identificados na análise</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatCurrency(totalCredits)}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Baseado em {MOCK_PAYMENTS.filter((p) => p.status === 'analyzed').length} pagamentos analisados
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Importação de Dados</CardTitle>
          <CardDescription>
            Importe os dados de pagamentos para análise automática de créditos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="file-upload">Arquivo de Pagamentos</Label>
              <div className="flex gap-2">
                <Input id="file-upload" type="file" />
                <Button onClick={handleFileUpload} disabled={uploading}>
                  {uploading ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Upload className="h-4 w-4 mr-2" />}
                  Importar
                </Button>
              </div>
              {uploading && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Progresso</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Formatos Suportados</Label>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline" className="text-xs">CSV</Badge>
                <Badge variant="outline" className="text-xs">XML</Badge>
                <Badge variant="outline" className="text-xs">JSON</Badge>
                <Badge variant="outline" className="text-xs">XLS/XLSX</Badge>
                <Badge variant="outline" className="text-xs">PDF (Extração)</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                O sistema reconhece automaticamente o formato dos dados e realiza a extração conforme necessário.
              </p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Button onClick={handleAnalyzeData} disabled={analyzing} className="w-full">
                {analyzing ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                    Analisando...
                  </>
                ) : (
                  <>
                    <FileUp className="h-4 w-4 mr-2" />
                    Analisar Dados Importados
                  </>
                )}
              </Button>
              {analyzing && (
                <div className="space-y-1 mt-2">
                  <div className="flex justify-between text-xs">
                    <span>Análise em progresso</span>
                    <span>{analyzeProgress}%</span>
                  </div>
                  <Progress value={analyzeProgress} className="h-2" />
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex justify-between gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <FileDown className="h-4 w-4 mr-2" />
                  Exportar Relatório
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <FileDown className="h-4 w-4 mr-2" />
                  Exportar Dados
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="suppliers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="suppliers">Fornecedores</TabsTrigger>
          <TabsTrigger value="payments">Pagamentos</TabsTrigger>
          <TabsTrigger value="credits">Créditos Identificados</TabsTrigger>
        </TabsList>

        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por nome, CNPJ ou atividade..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Status: {statusFilter ? getStatusLabel(statusFilter) : 'Todos'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                Todos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('analyzed')}>
                Analisados
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('pending')}>
                Pendentes
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('exempted')}>
                Isentos
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <TabsContent value="suppliers">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead>CNPJ</TableHead>
                    <TableHead>Atividade</TableHead>
                    <TableHead>Retenção</TableHead>
                    <TableHead>Último Pagamento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSuppliers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        Nenhum fornecedor encontrado.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSuppliers.map((supplier) => (
                      <TableRow key={supplier.id}>
                        <TableCell className="font-medium">{supplier.name}</TableCell>
                        <TableCell>{supplier.cnpj}</TableCell>
                        <TableCell>{supplier.activity}</TableCell>
                        <TableCell>
                          <Badge variant={supplier.isTaxable ? 'default' : 'secondary'}>
                            {supplier.isTaxable ? 'Obrigatória' : 'Isento'}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(supplier.lastPayment)}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(supplier.status)}>
                            {getStatusLabel(supplier.status)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            Ver Detalhes
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Valor Retenção</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        Nenhum pagamento encontrado.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.supplierName}</TableCell>
                        <TableCell>{formatCurrency(payment.value)}</TableCell>
                        <TableCell>{formatDate(payment.date)}</TableCell>
                        <TableCell>{formatCurrency(payment.taxValue)}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(payment.status)}>
                            {getStatusLabel(payment.status)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            Ver Detalhes
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="credits">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead>CNPJ</TableHead>
                    <TableHead>Valor Original</TableHead>
                    <TableHead>Crédito Identificado</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.filter(p => p.status === 'analyzed' && p.taxValue > 0).length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        Nenhum crédito identificado.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPayments
                      .filter(p => p.status === 'analyzed' && p.taxValue > 0)
                      .map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.supplierName}</TableCell>
                          <TableCell>
                            {MOCK_SUPPLIERS.find(s => s.id === payment.supplierId)?.cnpj}
                          </TableCell>
                          <TableCell>{formatCurrency(payment.value)}</TableCell>
                          <TableCell className="font-medium text-green-600">
                            {formatCurrency(payment.taxValue)}
                          </TableCell>
                          <TableCell>{formatDate(payment.date)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                              Ver Detalhes
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default CreditIdentification;
