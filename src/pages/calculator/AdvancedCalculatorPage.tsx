import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface TaxCalculation {
  baseValue: number;
  taxType: string;
  rate: number;
  additionalRate?: number;
  deductions?: number;
  result: number;
}

export function AdvancedCalculatorPage() {
  const [baseValue, setBaseValue] = useState("");
  const [taxType, setTaxType] = useState("");
  const [rate, setRate] = useState("");
  const [additionalRate, setAdditionalRate] = useState("");
  const [deductions, setDeductions] = useState("");
  const [history, setHistory] = useState<TaxCalculation[]>([]);

  const calculateTax = () => {
    const base = parseFloat(baseValue);
    const mainRate = parseFloat(rate);
    const additional = parseFloat(additionalRate) || 0;
    const deduct = parseFloat(deductions) || 0;

    if (isNaN(base) || isNaN(mainRate)) {
      return;
    }

    const taxValue = base * (mainRate / 100);
    const additionalValue = base * (additional / 100);
    const totalTax = taxValue + additionalValue - deduct;

    const calculation: TaxCalculation = {
      baseValue: base,
      taxType,
      rate: mainRate,
      additionalRate: additional,
      deductions: deduct,
      result: totalTax,
    };

    setHistory([calculation, ...history].slice(0, 10));
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Calculadora Avançada</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Cálculo de Impostos Avançado</CardTitle>
            <CardDescription>
              Calcule impostos com taxas adicionais e deduções
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="baseValue">Valor Base</Label>
              <Input
                id="baseValue"
                placeholder="Digite o valor base"
                type="number"
                value={baseValue}
                onChange={(e) => setBaseValue(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxType">Tipo de Imposto</Label>
              <Select value={taxType} onValueChange={setTaxType}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de imposto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="irpj">IRPJ</SelectItem>
                  <SelectItem value="csll">CSLL</SelectItem>
                  <SelectItem value="pis">PIS</SelectItem>
                  <SelectItem value="cofins">COFINS</SelectItem>
                  <SelectItem value="icms">ICMS</SelectItem>
                  <SelectItem value="ipi">IPI</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rate">Alíquota Principal (%)</Label>
              <Input
                id="rate"
                placeholder="Digite a alíquota principal"
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalRate">Alíquota Adicional (%)</Label>
              <Input
                id="additionalRate"
                placeholder="Digite a alíquota adicional (opcional)"
                type="number"
                value={additionalRate}
                onChange={(e) => setAdditionalRate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deductions">Deduções</Label>
              <Input
                id="deductions"
                placeholder="Digite o valor das deduções (opcional)"
                type="number"
                value={deductions}
                onChange={(e) => setDeductions(e.target.value)}
              />
            </div>

            <Button onClick={calculateTax} className="w-full">
              Calcular
            </Button>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Histórico de Cálculos</CardTitle>
            <CardDescription>
              Últimos 10 cálculos realizados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {history.map((calc, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      {calc.taxType.toUpperCase()}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Alíquota: {calc.rate}%
                      {calc.additionalRate ? ` + ${calc.additionalRate}%` : ""}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Valor Base:</p>
                      <p className="font-medium">
                        R$ {calc.baseValue.toFixed(2)}
                      </p>
                    </div>
                    {calc.deductions ? (
                      <div>
                        <p className="text-muted-foreground">Deduções:</p>
                        <p className="font-medium">
                          R$ {calc.deductions.toFixed(2)}
                        </p>
                      </div>
                    ) : null}
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Imposto Total:</p>
                      <p className="font-medium text-lg">
                        R$ {calc.result.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {history.length === 0 && (
                <p className="text-center text-muted-foreground">
                  Nenhum cálculo realizado ainda
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 