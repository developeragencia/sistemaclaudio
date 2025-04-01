
import React, { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Calculator, FileDown, RefreshCw, Save, Clock, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';

// Tipos de empresas para cálculo do IRRF
const TAX_RATES = [
  { id: '1', type: 'Serviços de limpeza, conservação ou zeladoria', rate: 1.0 },
  { id: '2', type: 'Serviços de vigilância ou segurança', rate: 1.0 },
  { id: '3', type: 'Construção civil', rate: 1.5 },
  { id: '4', type: 'Serviços de transporte de carga', rate: 1.5 },
  { id: '5', type: 'Serviços de engenharia e arquitetura', rate: 1.5 },
  { id: '6', type: 'Serviços de médicos', rate: 1.5 },
  { id: '7', type: 'Serviços de análises clínicas', rate: 1.5 },
  { id: '8', type: 'Serviços de advocacia', rate: 1.5 },
  { id: '9', type: 'Serviços de publicidade e propaganda', rate: 1.5 },
  { id: '10', type: 'Locação de mão-de-obra', rate: 1.0 },
  { id: '11', type: 'Administração de bens ou negócios', rate: 1.5 },
  { id: '12', type: 'Serviços de informática', rate: 1.5 },
  { id: '13', type: 'Pesquisas e desenvolvimento', rate: 1.5 },
  { id: '14', type: 'Serviços contábeis, de auditoria e consultoria', rate: 1.5 },
  { id: '15', type: 'Serviços de factoring', rate: 0.5 },
  { id: '16', type: 'Locação de imóveis', rate: 3.0 },
  { id: '17', type: 'Demais serviços', rate: 1.5 },
];

// Taxa Selic para os últimos meses (dados fictícios)
const SELIC_RATES = [
  { month: '2023-01', rate: 13.75 },
  { month: '2023-02', rate: 13.75 },
  { month: '2023-03', rate: 13.75 },
  { month: '2023-04', rate: 13.75 },
  { month: '2023-05', rate: 13.75 },
  { month: '2023-06', rate: 13.75 },
  { month: '2023-07', rate: 13.25 },
  { month: '2023-08', rate: 13.25 },
  { month: '2023-09', rate: 12.75 },
  { month: '2023-10', rate: 12.75 },
  { month: '2023-11', rate: 12.25 },
  { month: '2023-12', rate: 12.25 },
  { month: '2024-01', rate: 11.75 },
  { month: '2024-02', rate: 11.75 },
  { month: '2024-03', rate: 11.25 },
  { month: '2024-04', rate: 11.25 },
  { month: '2024-05', rate: 10.75 },
  { month: '2024-06', rate: 10.75 },
];

// Histórico de cálculos
const CALCULATION_HISTORY = [
  { 
    id: '1', 
    date: '2024-05-15T14:30:00Z', 
    serviceType: 'Serviços de advocacia', 
    amount: 10000.00, 
    taxRate: 1.5, 
    taxAmount: 150.00, 
    savedBy: 'Admin Master' 
  },
  { 
    id: '2', 
    date: '2024-05-10T11:15:00Z', 
    serviceType: 'Serviços de informática', 
    amount: 25000.00, 
    taxRate: 1.5, 
    taxAmount: 375.00, 
    savedBy: 'Maria Santos' 
  },
  { 
    id: '3', 
    date: '2024-05-05T09:45:00Z', 
    serviceType: 'Construção civil', 
    amount: 150000.00, 
    taxRate: 1.5, 
    taxAmount: 2250.00, 
    savedBy: 'Pedro Oliveira' 
  },
];

const TaxCalculator = () => {
  const [serviceTaxType, setServiceTaxType] = useState('');
  const [paymentValue, setPaymentValue] = useState('');
  const [taxRate, setTaxRate] = useState<number | null>(null);
  const [taxAmount, setTaxAmount] = useState<number | null>(null);
  const [netAmount, setNetAmount] = useState<number | null>(null);
  
  const [monetaryPaymentValue, setMonetaryPaymentValue] = useState('');
  const [monetaryTaxValue, setMonetaryTaxValue] = useState('');
  const [referenceDate, setReferenceDate] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [correctionFactor, setCorrectionFactor] = useState<number | null>(null);
  const [correctedValue, setCorrectedValue] = useState<number | null>(null);
  
  const [loadingSelic, setLoadingSelic] = useState(false);
  const [selicProgress, setSelicProgress] = useState(0);
  
  const handleCalculateTax = () => {
    if (!serviceTaxType || !paymentValue) {
      toast({
        variant: 'destructive',
        title: 'Dados incompletos',
        description: 'Por favor, preencha todos os campos obrigatórios.',
      });
      return;
    }
    
    const selectedTaxRate = TAX_RATES.find(rate => rate.id === serviceTaxType);
    if (!selectedTaxRate) return;
    
    const value = parseFloat(paymentValue);
    if (isNaN(value)) {
      toast({
        variant: 'destructive',
        title: 'Valor inválido',
        description: 'O valor do pagamento deve ser um número válido.',
      });
      return;
    }
    
    const calculatedTaxRate = selectedTaxRate.rate;
    const calculatedTaxAmount = (value * calculatedTaxRate) / 100;
    const calculatedNetAmount = value - calculatedTaxAmount;
    
    setTaxRate(calculatedTaxRate);
    setTaxAmount(calculatedTaxAmount);
    setNetAmount(calculatedNetAmount);
    
    toast({
      title: 'Cálculo realizado',
      description: 'O cálculo do imposto foi realizado com sucesso.',
    });
  };
  
  const handleSaveCalculation = () => {
    toast({
      title: 'Cálculo salvo',
      description: 'O cálculo foi salvo com sucesso no histórico.',
    });
  };
  
  const handleCalculateMonetaryCorrection = () => {
    if (!monetaryPaymentValue || !monetaryTaxValue || !referenceDate || !currentDate) {
      toast({
        variant: 'destructive',
        title: 'Dados incompletos',
        description: 'Por favor, preencha todos os campos obrigatórios.',
      });
      return;
    }
    
    const paymentVal = parseFloat(monetaryPaymentValue);
    const taxVal = parseFloat(monetaryTaxValue);
    
    if (isNaN(paymentVal) || isNaN(taxVal)) {
      toast({
        variant: 'destructive',
        title: 'Valor inválido',
        description: 'Os valores informados devem ser números válidos.',
      });
      return;
    }
    
    // Simular o cálculo da correção monetária com base na taxa Selic
    const factor = 1.15; // Fator de correção simulado
    const corrected = taxVal * factor;
    
    setCorrectionFactor(factor);
    setCorrectedValue(corrected);
    
    toast({
      title: 'Correção calculada',
      description: 'O cálculo da correção monetária foi realizado com sucesso.',
    });
  };
  
  const handleFetchSelicRates = () => {
    setLoadingSelic(true);
    setSelicProgress(0);
    
    const interval = setInterval(() => {
      setSelicProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoadingSelic(false);
          toast({
            title: 'Taxas atualizadas',
            description: 'As taxas Selic foram atualizadas com sucesso.',
          });
          return 100;
        }
        return prev + 10;
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
  
  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <AdminLayout
      title="Calculadora Avançada"
      description="Calculadora de impostos e correção monetária"
    >
      <Tabs defaultValue="tax-calculator" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-[400px]">
          <TabsTrigger value="tax-calculator">Impostos</TabsTrigger>
          <TabsTrigger value="monetary-correction">Correção Monetária</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>
      
        <TabsContent value="tax-calculator" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" /> Calculadora de IRRF
                </CardTitle>
                <CardDescription>
                  Calcule o valor da retenção de IRRF de acordo com o tipo de serviço
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="service-type">Tipo de Serviço</Label>
                  <Select value={serviceTaxType} onValueChange={setServiceTaxType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de serviço" />
                    </SelectTrigger>
                    <SelectContent>
                      {TAX_RATES.map((rate) => (
                        <SelectItem key={rate.id} value={rate.id}>
                          {rate.type} ({formatPercentage(rate.rate)})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="payment-value">Valor do Pagamento</Label>
                  <Input
                    id="payment-value"
                    placeholder="0,00"
                    value={paymentValue}
                    onChange={(e) => setPaymentValue(e.target.value)}
                  />
                </div>
                
                <Button onClick={handleCalculateTax} className="w-full">Calcular</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Resultado do Cálculo</CardTitle>
                <CardDescription>
                  Detalhes da retenção calculada
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {taxRate !== null && taxAmount !== null && netAmount !== null ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Alíquota Aplicada</Label>
                        <div className="text-2xl font-bold">{formatPercentage(taxRate)}</div>
                      </div>
                      <div>
                        <Label>Valor da Retenção</Label>
                        <div className="text-2xl font-bold text-green-600">{formatCurrency(taxAmount)}</div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Valor Bruto</Label>
                        <div className="text-lg">{formatCurrency(parseFloat(paymentValue))}</div>
                      </div>
                      <div>
                        <Label>Valor Líquido</Label>
                        <div className="text-lg">{formatCurrency(netAmount)}</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline">
                        <FileDown className="h-4 w-4 mr-2" />
                        Exportar
                      </Button>
                      <Button onClick={handleSaveCalculation}>
                        <Save className="h-4 w-4 mr-2" />
                        Salvar
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="h-[200px] flex flex-col items-center justify-center text-center p-4">
                    <Calculator className="h-12 w-12 text-gray-300 mb-4" />
                    <p className="text-muted-foreground">
                      Preencha os campos e clique em calcular para ver o resultado
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Regras de Retenção</CardTitle>
              <CardDescription>
                Informações sobre as regras aplicáveis à retenção de IRRF
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    <BookOpen className="h-5 w-5 inline mr-2" />
                    Alíquotas de Retenção
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>Serviços de limpeza, conservação, vigilância</span>
                      <Badge variant="outline">1,0%</Badge>
                    </li>
                    <li className="flex justify-between">
                      <span>Construção civil e engenharia</span>
                      <Badge variant="outline">1,5%</Badge>
                    </li>
                    <li className="flex justify-between">
                      <span>Serviços profissionais (advocacia, médicos, etc.)</span>
                      <Badge variant="outline">1,5%</Badge>
                    </li>
                    <li className="flex justify-between">
                      <span>Serviços de informática e tecnologia</span>
                      <Badge variant="outline">1,5%</Badge>
                    </li>
                    <li className="flex justify-between">
                      <span>Locação de imóveis</span>
                      <Badge variant="outline">3,0%</Badge>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    <BookOpen className="h-5 w-5 inline mr-2" />
                    Regras Gerais
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <span className="font-medium">Dispensa de retenção:</span> Valores abaixo de R$ 666,00 estão dispensados de retenção
                    </li>
                    <li>
                      <span className="font-medium">Competência:</span> A retenção é de competência do contratante do serviço
                    </li>
                    <li>
                      <span className="font-medium">Momento da retenção:</span> No ato do pagamento ou crédito
                    </li>
                    <li>
                      <span className="font-medium">Base legal:</span> Art. 647 do RIR/2018 e IN RFB 1.234/2012
                    </li>
                    <li>
                      <span className="font-medium">Recolhimento:</span> Até o último dia útil do segundo decêndio do mês subsequente
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="monetary-correction" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" /> Correção Monetária pela Selic
                </CardTitle>
                <CardDescription>
                  Calcule a correção monetária de valores com base na taxa Selic
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="monetary-payment-value">Valor Original do Pagamento</Label>
                  <Input
                    id="monetary-payment-value"
                    placeholder="0,00"
                    value={monetaryPaymentValue}
                    onChange={(e) => setMonetaryPaymentValue(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="monetary-tax-value">Valor da Retenção</Label>
                  <Input
                    id="monetary-tax-value"
                    placeholder="0,00"
                    value={monetaryTaxValue}
                    onChange={(e) => setMonetaryTaxValue(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="reference-date">Data de Referência</Label>
                    <Input
                      id="reference-date"
                      type="date"
                      value={referenceDate}
                      onChange={(e) => setReferenceDate(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="current-date">Data Atual</Label>
                    <Input
                      id="current-date"
                      type="date"
                      value={currentDate}
                      onChange={(e) => setCurrentDate(e.target.value)}
                    />
                  </div>
                </div>
                
                <Button onClick={handleCalculateMonetaryCorrection} className="w-full">Calcular Correção</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Resultado da Correção</CardTitle>
                <CardDescription>
                  Correção monetária calculada com base na taxa Selic
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {correctionFactor !== null && correctedValue !== null ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Fator de Correção</Label>
                        <div className="text-2xl font-bold">{correctionFactor.toFixed(6)}</div>
                      </div>
                      <div>
                        <Label>Valor Corrigido</Label>
                        <div className="text-2xl font-bold text-green-600">{formatCurrency(correctedValue)}</div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Valor Original</Label>
                        <div className="text-lg">{formatCurrency(parseFloat(monetaryTaxValue))}</div>
                      </div>
                      <div>
                        <Label>Juros Calculados</Label>
                        <div className="text-lg">{formatCurrency(correctedValue - parseFloat(monetaryTaxValue))}</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline">
                        <FileDown className="h-4 w-4 mr-2" />
                        Exportar
                      </Button>
                      <Button onClick={handleSaveCalculation}>
                        <Save className="h-4 w-4 mr-2" />
                        Salvar
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="h-[200px] flex flex-col items-center justify-center text-center p-4">
                    <Clock className="h-12 w-12 text-gray-300 mb-4" />
                    <p className="text-muted-foreground">
                      Preencha os campos e clique em calcular para ver o resultado da correção
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Taxas Selic</CardTitle>
                <CardDescription>
                  Histórico de taxas Selic para cálculo da correção monetária
                </CardDescription>
              </div>
              <Button onClick={handleFetchSelicRates} disabled={loadingSelic}>
                {loadingSelic ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                    Atualizando...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Atualizar
                  </>
                )}
              </Button>
            </CardHeader>
            {loadingSelic && (
              <div className="px-6 py-2">
                <div className="flex justify-between text-xs">
                  <span>Atualizando taxas</span>
                  <span>{selicProgress}%</span>
                </div>
                <Progress value={selicProgress} className="h-2" />
              </div>
            )}
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Período</TableHead>
                    <TableHead>Taxa Mensal</TableHead>
                    <TableHead>Taxa Anual</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {SELIC_RATES.map((rate, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {new Date(rate.month).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                      </TableCell>
                      <TableCell>{(rate.rate / 12).toFixed(2)}%</TableCell>
                      <TableCell>{rate.rate.toFixed(2)}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Histórico de Cálculos</CardTitle>
                <CardDescription>
                  Registro dos cálculos realizados anteriormente
                </CardDescription>
              </div>
              <Button variant="outline">
                <FileDown className="h-4 w-4 mr-2" />
                Exportar Histórico
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Tipo de Serviço</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Alíquota</TableHead>
                    <TableHead>Retenção</TableHead>
                    <TableHead>Usuário</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {CALCULATION_HISTORY.map((calculation) => (
                    <TableRow key={calculation.id}>
                      <TableCell>{formatDate(calculation.date)}</TableCell>
                      <TableCell>{calculation.serviceType}</TableCell>
                      <TableCell>{formatCurrency(calculation.amount)}</TableCell>
                      <TableCell>{formatPercentage(calculation.taxRate)}</TableCell>
                      <TableCell>{formatCurrency(calculation.taxAmount)}</TableCell>
                      <TableCell>{calculation.savedBy}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Replicar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default TaxCalculator;
