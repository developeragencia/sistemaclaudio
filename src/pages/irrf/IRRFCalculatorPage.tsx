import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { DatePicker } from "@/components/ui/date-picker";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  grossIncome: z.string().min(1, "Valor bruto é obrigatório"),
  period: z.date(),
  hasInssDeduction: z.boolean().default(false),
  inssValue: z.string().optional(),
  hasDependents: z.boolean().default(false),
  dependentsCount: z.string().optional(),
  hasAlimony: z.boolean().default(false),
  alimonyValue: z.string().optional(),
  hasOtherDeductions: z.boolean().default(false),
  otherDeductionsValue: z.string().optional(),
});

const IRRF_RATES = [
  { limit: 2112.00, rate: 0, deduction: 0 },
  { limit: 2826.65, rate: 7.5, deduction: 158.40 },
  { limit: 3751.05, rate: 15, deduction: 370.40 },
  { limit: 4664.68, rate: 22.5, deduction: 651.73 },
  { limit: Infinity, rate: 27.5, deduction: 884.96 },
];

const DEPENDENT_DEDUCTION = 189.59;

export function IRRFCalculatorPage() {
  const [result, setResult] = useState<{
    baseValue: number;
    taxValue: number;
    effectiveRate: number;
    netValue: number;
    appliedRate: number;
    deductions: {
      inss?: number;
      dependents?: number;
      alimony?: number;
      others?: number;
      total: number;
    };
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      grossIncome: "",
      period: new Date(),
      hasInssDeduction: false,
      inssValue: "",
      hasDependents: false,
      dependentsCount: "",
      hasAlimony: false,
      alimonyValue: "",
      hasOtherDeductions: false,
      otherDeductionsValue: "",
    },
  });

  const calculateIRRF = (values: z.infer<typeof formSchema>) => {
    const grossIncome = parseFloat(values.grossIncome.replace(/[^\d,]/g, "").replace(",", "."));
    
    // Calcular deduções
    const deductions = {
      inss: values.hasInssDeduction
        ? parseFloat(values.inssValue?.replace(/[^\d,]/g, "").replace(",", ".") || "0")
        : 0,
      dependents: values.hasDependents
        ? parseInt(values.dependentsCount || "0") * DEPENDENT_DEDUCTION
        : 0,
      alimony: values.hasAlimony
        ? parseFloat(values.alimonyValue?.replace(/[^\d,]/g, "").replace(",", ".") || "0")
        : 0,
      others: values.hasOtherDeductions
        ? parseFloat(values.otherDeductionsValue?.replace(/[^\d,]/g, "").replace(",", ".") || "0")
        : 0,
    };

    const totalDeductions = Object.values(deductions).reduce((a, b) => a + b, 0);
    const baseValue = grossIncome - totalDeductions;

    // Encontrar a alíquota aplicável
    const taxBracket = IRRF_RATES.find(rate => baseValue <= rate.limit);
    if (!taxBracket) return null;

    const taxValue = (baseValue * taxBracket.rate) / 100 - taxBracket.deduction;
    const effectiveRate = (taxValue / grossIncome) * 100;
    const netValue = grossIncome - taxValue;

    return {
      baseValue,
      taxValue: Math.max(0, taxValue),
      effectiveRate,
      netValue,
      appliedRate: taxBracket.rate,
      deductions: {
        ...deductions,
        total: totalDeductions,
      },
    };
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const calculationResult = calculateIRRF(values);
    setResult(calculationResult);
  };

  const watch = form.watch();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Calculadora IRRF</h1>
        <p className="text-muted-foreground">
          Calcule o Imposto de Renda Retido na Fonte com precisão
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Dados do Cálculo</CardTitle>
            <CardDescription>
              Informe os valores para calcular o IRRF
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="grossIncome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor Bruto</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="R$ 0,00" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="period"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Período de Competência</FormLabel>
                      <DatePicker
                        date={field.value}
                        setDate={field.onChange}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator className="my-4" />

                <div className="space-y-4">
                  <h3 className="font-medium">Deduções</h3>

                  <FormField
                    control={form.control}
                    name="hasInssDeduction"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Dedução de INSS
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {watch.hasInssDeduction && (
                    <FormField
                      control={form.control}
                      name="inssValue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Valor INSS</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="R$ 0,00" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="hasDependents"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Dependentes
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {watch.hasDependents && (
                    <FormField
                      control={form.control}
                      name="dependentsCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantidade de Dependentes</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" min="0" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="hasAlimony"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Pensão Alimentícia
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {watch.hasAlimony && (
                    <FormField
                      control={form.control}
                      name="alimonyValue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Valor da Pensão</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="R$ 0,00" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="hasOtherDeductions"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Outras Deduções
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {watch.hasOtherDeductions && (
                    <FormField
                      control={form.control}
                      name="otherDeductionsValue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Valor de Outras Deduções</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="R$ 0,00" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                <Button type="submit" className="w-full">
                  Calcular IRRF
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resultado do Cálculo</CardTitle>
            <CardDescription>
              Detalhamento do IRRF calculado
            </CardDescription>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Deduções</h3>
                  <div className="space-y-2">
                    {result.deductions.inss > 0 && (
                      <div className="flex justify-between">
                        <span>INSS:</span>
                        <span>
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(result.deductions.inss)}
                        </span>
                      </div>
                    )}
                    {result.deductions.dependents > 0 && (
                      <div className="flex justify-between">
                        <span>Dependentes:</span>
                        <span>
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(result.deductions.dependents)}
                        </span>
                      </div>
                    )}
                    {result.deductions.alimony > 0 && (
                      <div className="flex justify-between">
                        <span>Pensão Alimentícia:</span>
                        <span>
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(result.deductions.alimony)}
                        </span>
                      </div>
                    )}
                    {result.deductions.others > 0 && (
                      <div className="flex justify-between">
                        <span>Outras Deduções:</span>
                        <span>
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(result.deductions.others)}
                        </span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total de Deduções:</span>
                      <span>
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(result.deductions.total)}
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Base de Cálculo</p>
                    <p className="text-2xl font-bold">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(result.baseValue)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium">Alíquota Aplicada</p>
                    <p className="text-2xl font-bold">
                      {result.appliedRate}%
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium">Valor do IRRF</p>
                    <p className="text-2xl font-bold text-red-600">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(result.taxValue)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium">Alíquota Efetiva</p>
                    <p className="text-2xl font-bold">
                      {result.effectiveRate.toFixed(2)}%
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm font-medium">Valor Líquido</p>
                    <p className="text-2xl font-bold text-green-600">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(result.netValue)}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                Preencha os dados ao lado para calcular o IRRF
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 