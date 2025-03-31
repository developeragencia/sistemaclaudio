import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface CalculationResult {
  baseValue: number;
  taxType: string;
  rate: number;
  taxValue: number;
  totalValue: number;
  calculatedAt: string;
}

export function SimpleCalculatorPage() {
  const [baseValue, setBaseValue] = useState<string>("");
  const [taxType, setTaxType] = useState<string>("");
  const [rate, setRate] = useState<string>("");
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [history, setHistory] = useState<CalculationResult[]>([]);

  const handleCalculate = () => {
    if (!baseValue || !taxType || !rate) return;

    const baseValueNum = parseFloat(baseValue);
    const rateNum = parseFloat(rate);
    const taxValue = (baseValueNum * rateNum) / 100;
    const totalValue = baseValueNum + taxValue;

    const newResult: CalculationResult = {
      baseValue: baseValueNum,
      taxType,
      rate: rateNum,
      taxValue,
      totalValue,
      calculatedAt: new Date().toISOString(),
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

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Calculadora Simples</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Cálculo de Impostos</CardTitle>
            <CardDescription>
              Calcule rapidamente o valor do imposto para uma operação
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
              <Label htmlFor="taxType">Tipo de Imposto</Label>
              <Select value={taxType} onValueChange={setTaxType}>
                <SelectTrigger id="taxType">
                  <SelectValue placeholder="Selecione o imposto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ICMS">ICMS</SelectItem>
                  <SelectItem value="IPI">IPI</SelectItem>
                  <SelectItem value="ISS">ISS</SelectItem>
                  <SelectItem value="PIS">PIS</SelectItem>
                  <SelectItem value="COFINS">COFINS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate">Alíquota (%)</Label>
              <Input
                id="rate"
                type="number"
                placeholder="0"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </div>
            <Button className="w-full" onClick={handleCalculate}>
              Calcular
            </Button>
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle>Resultado</CardTitle>
              <CardDescription>
                Detalhamento do cálculo realizado
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
                  <Label>Valor do Imposto</Label>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCurrency(result.taxValue)}
                  </div>
                </div>
                <div>
                  <Label>Alíquota</Label>
                  <div className="text-lg">
                    {result.rate}%
                  </div>
                </div>
                <div>
                  <Label>Valor Total</Label>
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(result.totalValue)}
                  </div>
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
                      <th className="p-2 text-left">Imposto</th>
                      <th className="p-2 text-right">Valor Base</th>
                      <th className="p-2 text-right">Alíquota</th>
                      <th className="p-2 text-right">Valor do Imposto</th>
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
                        <td className="p-2 text-right">{item.rate}%</td>
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