import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function SimpleCalculatorPage() {
  const [baseValue, setBaseValue] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculateTax = () => {
    const base = parseFloat(baseValue);
    const rate = parseFloat(taxRate);

    if (isNaN(base) || isNaN(rate)) {
      return;
    }

    const calculatedValue = base * (rate / 100);
    setResult(calculatedValue);
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Calculadora Simples</h2>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Cálculo de Impostos</CardTitle>
          <CardDescription>
            Calcule o valor do imposto baseado em uma alíquota simples
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
            <Label htmlFor="taxRate">Alíquota (%)</Label>
            <Input
              id="taxRate"
              placeholder="Digite a alíquota"
              type="number"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
            />
          </div>
          <Button onClick={calculateTax} className="w-full">
            Calcular
          </Button>

          {result !== null && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Resultado:</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Valor Base:</p>
                  <p className="font-medium">R$ {parseFloat(baseValue).toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Alíquota:</p>
                  <p className="font-medium">{taxRate}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Valor do Imposto:</p>
                  <p className="font-medium">R$ {result.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Valor Total:</p>
                  <p className="font-medium">
                    R$ {(parseFloat(baseValue) + result).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 