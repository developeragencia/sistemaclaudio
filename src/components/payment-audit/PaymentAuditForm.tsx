import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  supplierId: z.string().min(1, "Selecione um fornecedor"),
  documentNumber: z.string().min(1, "Informe o número do documento"),
  documentType: z.string().min(1, "Selecione o tipo de documento"),
  value: z.string().min(1, "Informe o valor do pagamento"),
  paymentDate: z.date(),
  retentionType: z.string().min(1, "Selecione o tipo de retenção"),
  retentionValue: z.string().min(1, "Informe o valor da retenção"),
  hasDocumentation: z.boolean(),
  documentationNotes: z.string().optional(),
  hasCorrectCalculation: z.boolean(),
  calculationNotes: z.string().optional(),
  hasProperDeadlines: z.boolean(),
  deadlineNotes: z.string().optional(),
  observations: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface PaymentAuditFormProps {
  onSubmit: (data: FormData) => void;
  initialData?: Partial<FormData>;
}

export function PaymentAuditForm({
  onSubmit,
  initialData,
}: PaymentAuditFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      supplierId: initialData?.supplierId || "",
      documentNumber: initialData?.documentNumber || "",
      documentType: initialData?.documentType || "",
      value: initialData?.value || "",
      paymentDate: initialData?.paymentDate || new Date(),
      retentionType: initialData?.retentionType || "",
      retentionValue: initialData?.retentionValue || "",
      hasDocumentation: initialData?.hasDocumentation || false,
      documentationNotes: initialData?.documentationNotes || "",
      hasCorrectCalculation: initialData?.hasCorrectCalculation || false,
      calculationNotes: initialData?.calculationNotes || "",
      hasProperDeadlines: initialData?.hasProperDeadlines || false,
      deadlineNotes: initialData?.deadlineNotes || "",
      observations: initialData?.observations || "",
    },
  });

  const handleSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      await onSubmit(data);
      form.reset();
    } catch (error) {
      console.error("Erro ao salvar auditoria:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="supplierId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fornecedor</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um fornecedor" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Fornecedor ABC</SelectItem>
                    <SelectItem value="2">Serviços XYZ</SelectItem>
                    <SelectItem value="3">Consultoria DEF</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="documentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Documento</FormLabel>
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
                    <SelectItem value="nfe">Nota Fiscal Eletrônica</SelectItem>
                    <SelectItem value="nfse">Nota Fiscal de Serviço</SelectItem>
                    <SelectItem value="recibo">Recibo</SelectItem>
                    <SelectItem value="fatura">Fatura</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="documentNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número do Documento</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: NF-e 123456" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor do Pagamento</FormLabel>
                <FormControl>
                  <Input
                    placeholder="R$ 0,00"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      const formattedValue = new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(Number(value) / 100);
                      field.onChange(formattedValue);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="paymentDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data do Pagamento</FormLabel>
                <FormControl>
                  <DatePicker
                    date={field.value}
                    setDate={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="retentionType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Retenção</FormLabel>
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
                    <SelectItem value="ISS">ISS</SelectItem>
                    <SelectItem value="PIS">PIS</SelectItem>
                    <SelectItem value="COFINS">COFINS</SelectItem>
                    <SelectItem value="CSLL">CSLL</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="retentionValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor da Retenção</FormLabel>
                <FormControl>
                  <Input
                    placeholder="R$ 0,00"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      const formattedValue = new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(Number(value) / 100);
                      field.onChange(formattedValue);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Checklist de Auditoria</CardTitle>
            <CardDescription>
              Verifique os itens abaixo e adicione observações quando necessário
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="hasDocumentation"
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
                        Documentação Completa e Adequada
                      </FormLabel>
                      <FormDescription>
                        Todos os documentos necessários estão presentes e corretos
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="documentationNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observações sobre a Documentação</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Adicione observações sobre a documentação..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="hasCorrectCalculation"
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
                        Cálculos Corretos
                      </FormLabel>
                      <FormDescription>
                        Os valores e alíquotas estão calculados corretamente
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="calculationNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observações sobre os Cálculos</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Adicione observações sobre os cálculos..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="hasProperDeadlines"
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
                        Prazos Adequados
                      </FormLabel>
                      <FormDescription>
                        Os prazos de recolhimento e pagamento estão corretos
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deadlineNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observações sobre os Prazos</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Adicione observações sobre os prazos..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <FormField
          control={form.control}
          name="observations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observações Gerais</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Observações adicionais sobre a auditoria..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Salvando..." : "Salvar"}
          </Button>
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Limpar
          </Button>
        </div>
      </form>
    </Form>
  );
} 