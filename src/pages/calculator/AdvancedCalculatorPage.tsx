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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const formSchema = z.object({
  calculationType: z.enum(["IRRF", "PIS", "COFINS", "CSLL", "INSS"]),
  baseValue: z.string().min(1, "Valor base é obrigatório"),
  taxRate: z.string().min(1, "Alíquota é obrigatória"),
  period: z.date(),
  additionalInfo: z.object({
    hasDeductions: z.boolean().default(false),
    deductionValue: z.string().optional(),
    hasAdditions: z.boolean().default(false),
    additionValue: z.string().optional(),
  }).default({}),
});

export function AdvancedCalculatorPage() {
  const [result, setResult] = useState<{
    grossValue: number;
    netValue: number;
    taxValue: number;
    effectiveRate: number;
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      calculationType: "IRRF",
      baseValue: "",
      taxRate: "",
      period: new Date(),
      additionalInfo: {
        hasDeductions: false,
        deductionValue: "",
        hasAdditions: false,
        additionValue: "",
      },
    },
  });

  const calculateTax = (values: z.infer<typeof formSchema>) => {
    const baseValue = parseFloat(values.baseValue.replace(/[^\d,]/g, "").replace(",", "."));
    const taxRate = parseFloat(values.taxRate.replace(/[^\d,]/g, "").replace(",", "."));
    const deductions = values.additionalInfo.deductionValue
      ? parseFloat(values.additionalInfo.deductionValue.replace(/[^\d,]/g, "").replace(",", "."))
      : 0;
    const additions = values.additionalInfo.additionValue
      ? parseFloat(values.additionalInfo.additionValue.replace(/[^\d,]/g, "").replace(",", "."))
      : 0;

    const adjustedBase = baseValue - deductions + additions;
    const taxValue = (adjustedBase * taxRate) / 100;
    const netValue = adjustedBase - taxValue;
    const effectiveRate = (taxValue / baseValue) * 100;

    return {
      grossValue: adjustedBase,
      netValue,
      taxValue,
      effectiveRate,
    };
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const calculationResult = calculateTax(values);
    setResult(calculationResult);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Calculadora Avançada</h1>
        <p className="text-muted-foreground">
          Calcule impostos e contribuições com precisão
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Parâmetros do Cálculo</CardTitle>
            <CardDescription>
              Preencha os dados para realizar o cálculo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="calculationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Cálculo</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="IRRF">IRRF</SelectItem>
                          <SelectItem value="PIS">PIS</SelectItem>
                          <SelectItem value="COFINS">COFINS</SelectItem>
                          <SelectItem value="CSLL">CSLL</SelectItem>
                          <SelectItem value="INSS">INSS</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="baseValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor Base</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="R$ 0,00" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="taxRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alíquota (%)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="0,00%" />
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

                <Button type="submit" className="w-full">
                  Calcular
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resultado</CardTitle>
            <CardDescription>
              Detalhamento do cálculo realizado
            </CardDescription>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Valor Bruto</p>
                  <p className="text-2xl font-bold">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(result.grossValue)}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium">Valor do Imposto</p>
                  <p className="text-2xl font-bold text-red-600">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(result.taxValue)}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium">Valor Líquido</p>
                  <p className="text-2xl font-bold text-green-600">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(result.netValue)}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium">Alíquota Efetiva</p>
                  <p className="text-2xl font-bold">
                    {result.effectiveRate.toFixed(2)}%
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                Preencha os dados ao lado para visualizar o resultado
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 