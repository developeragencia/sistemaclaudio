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

const formSchema = z.object({
  clientId: z.string().min(1, "Selecione um cliente"),
  type: z.string().min(1, "Selecione o tipo de crédito"),
  potentialValue: z.string().min(1, "Informe o valor potencial"),
  source: z.string().min(1, "Selecione a fonte dos dados"),
  identificationDate: z.date(),
  probability: z.string().min(1, "Informe a probabilidade"),
  description: z.string().min(10, "Forneça uma descrição detalhada"),
  observations: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface CreditIdentificationFormProps {
  onSubmit: (data: FormData) => void;
  initialData?: Partial<FormData>;
}

export function CreditIdentificationForm({
  onSubmit,
  initialData,
}: CreditIdentificationFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientId: initialData?.clientId || "",
      type: initialData?.type || "",
      potentialValue: initialData?.potentialValue || "",
      source: initialData?.source || "",
      identificationDate: initialData?.identificationDate || new Date(),
      probability: initialData?.probability || "",
      description: initialData?.description || "",
      observations: initialData?.observations || "",
    },
  });

  const handleSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      await onSubmit(data);
      form.reset();
    } catch (error) {
      console.error("Erro ao salvar identificação de crédito:", error);
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
            name="clientId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cliente</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um cliente" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Empresa ABC Ltda</SelectItem>
                    <SelectItem value="2">XYZ Comércio e Serviços</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Crédito</FormLabel>
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
                    <SelectItem value="PIS/COFINS">PIS/COFINS</SelectItem>
                    <SelectItem value="ICMS">ICMS</SelectItem>
                    <SelectItem value="IPI">IPI</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="potentialValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor Potencial</FormLabel>
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
            name="source"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fonte dos Dados</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a fonte" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="notas">Notas Fiscais</SelectItem>
                    <SelectItem value="declaracoes">Declarações</SelectItem>
                    <SelectItem value="contratos">Contratos</SelectItem>
                    <SelectItem value="outros">Outros Documentos</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="identificationDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Identificação</FormLabel>
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
            name="probability"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Probabilidade (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Ex: 85"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Probabilidade estimada de recuperação do crédito
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva detalhadamente a oportunidade de crédito identificada..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="observations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observações</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Observações adicionais..."
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