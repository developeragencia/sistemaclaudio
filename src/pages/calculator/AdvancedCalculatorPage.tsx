import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface TaxCalculation {
  baseValue: number;
  taxType: string;
  rate: number;
  taxValue: number;
  totalValue: number;
  calculatedAt: string;
  details: {
    [key: string]: number;
  };
}

export function AdvancedCalculatorPage() {
  const [baseValue, setBaseValue] = useState<string>("");
  const [selectedTaxes, setSelectedTaxes] = useState<string[]>([]);
  const [result, setResult] = useState<TaxCalculation | null>(null);
  const [history, setHistory] = useState<TaxCalculation[]>([]);
  const [isCompound, setIsCompound] = useState(false);

  const taxRates = {
    ICMS: 18,
    IPI: 10,
    ISS: 5,
    PIS: 1.65,
    COFINS: 7.6,
  };

  const handleCalculate = () => {
    if (!baseValue || selectedTaxes.length === 0) return;

    const baseValueNum = parseFloat(baseValue);
    let totalTaxValue = 0;
    const details: { [key: string]: number } = {};

    if (isCompound) {
      let accumulatedValue = baseValueNum;
      selectedTaxes.forEach(tax => {
        const rate = taxRates[tax as keyof typeof taxRates];
        const taxValue = (accumulatedValue * rate) / 100;
        details[tax] = taxValue;
        totalTaxValue += taxValue;
        accumulatedValue += taxValue;
      });
    } else {
      selectedTaxes.forEach(tax => {
        const rate = taxRates[tax as keyof typeof taxRates];
        const taxValue = (baseValueNum * rate) / 100;
        details[tax] = taxValue;
        totalTaxValue += taxValue;
      });
    }

    const totalValue = baseValueNum + totalTaxValue;
    const effectiveRate = (totalTaxValue / baseValueNum) * 100;

    const newResult: TaxCalculation = {
      baseValue: baseValueNum,
      taxType: selectedTaxes.join("+"),
      rate: effectiveRate,
      taxValue: totalTaxValue,
      totalValue,
      calculatedAt: new Date().toISOString(),
      details,
    };

    setResult(newResult);
    setHistory(prev => [newResult, ...prev].slice(0, 10));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleTaxSelection = (tax: string) => {
    setSelectedTaxes(prev => 
      prev.includes(tax) 
        ? prev.filter(t => t !== tax)
        : [...prev, tax]
    );
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Calculadora Avançada</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Cálculo de Impostos Múltiplos</CardTitle>
            <CardDescription>
              Calcule múltiplos impostos simultaneamente com opção de cálculo composto
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="baseValue">Valor Base</Label>
              <Input
                id="baseValue"
                type="number"
                placeholder="0,00"
                value={baseValue}
                onChange={(e) => setBaseValue(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Impostos Aplicáveis</Label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(taxRates).map(([tax, rate]) => (
                  <Button
                    key={tax}
                    variant={selectedTaxes.includes(tax) ? "default" : "outline"}
                    onClick={() => handleTaxSelection(tax)}
                    className="justify-start"
                  >
                    {tax} ({rate}%)
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="compound"
                checked={isCompound}
                onCheckedChange={setIsCompound}
              />
              <Label htmlFor="compound">Cálculo Composto</Label>
            </div>

            <Button 
              className="w-full" 
              onClick={handleCalculate}
              disabled={!baseValue || selectedTaxes.length === 0}
            >
              Calcular
            </Button>
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle>Resultado</CardTitle>
              <CardDescription>
                Detalhamento do cálculo {isCompound ? "composto" : "simples"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Valor Base</Label>
                  <div className="text-2xl font-bold">
                    {formatCurrency(result.baseValue)}
                  </div>
                </div>
                <div>
                  <Label>Total de Impostos</Label>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCurrency(result.taxValue)}
                  </div>
                </div>
                <div>
                  <Label>Alíquota Efetiva</Label>
                  <div className="text-lg">
                    {result.rate.toFixed(2)}%
                  </div>
                </div>
                <div>
                  <Label>Valor Total</Label>
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(result.totalValue)}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Detalhamento por Imposto</Label>
                <div className="rounded-md border p-4 space-y-2">
                  {Object.entries(result.details).map(([tax, value]) => (
                    <div key={tax} className="flex justify-between">
                      <span>{tax}</span>
                      <span className="font-medium">{formatCurrency(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {history.length > 0 && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Histórico de Cálculos</CardTitle>
              <CardDescription>
                Últimos 10 cálculos realizados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-slate-50">
                      <th className="p-2 text-left">Data/Hora</th>
                      <th className="p-2 text-left">Impostos</th>
                      <th className="p-2 text-right">Valor Base</th>
                      <th className="p-2 text-right">Alíquota Efetiva</th>
                      <th className="p-2 text-right">Total Impostos</th>
                      <th className="p-2 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2">
                          {new Date(item.calculatedAt).toLocaleString('pt-BR')}
                        </td>
                        <td className="p-2">{item.taxType}</td>
                        <td className="p-2 text-right">{formatCurrency(item.baseValue)}</td>
                        <td className="p-2 text-right">{item.rate.toFixed(2)}%</td>
                        <td className="p-2 text-right">{formatCurrency(item.taxValue)}</td>
                        <td className="p-2 text-right">{formatCurrency(item.totalValue)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 