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
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  type: z.string().min(1, "Selecione o tipo de tributo"),
  rate: z.string().min(1, "Informe a alíquota"),
  baseValue: z.string().min(1, "Informe o valor base"),
  status: z.boolean(),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
  validFrom: z.string().min(1, "Informe a data de início da vigência"),
  validTo: z.string().optional(),
  observations: z.string().optional(),
  hasMinimumValue: z.boolean(),
  minimumValue: z.string().optional(),
  hasMaximumValue: z.boolean(),
  maximumValue: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface TaxRuleFormProps {
  onSubmit: (data: FormData) => void;
  initialData?: Partial<FormData>;
}

export function TaxRuleForm({
  onSubmit,
  initialData,
}: TaxRuleFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      type: initialData?.type || "",
      rate: initialData?.rate || "",
      baseValue: initialData?.baseValue || "",
      status: initialData?.status || true,
      description: initialData?.description || "",
      validFrom: initialData?.validFrom || "",
      validTo: initialData?.validTo || "",
      observations: initialData?.observations || "",
      hasMinimumValue: initialData?.hasMinimumValue || false,
      minimumValue: initialData?.minimumValue || "",
      hasMaximumValue: initialData?.hasMaximumValue || false,
      maximumValue: initialData?.maximumValue || "",
    },
  });

  const handleSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      await onSubmit(data);
      form.reset();
    } catch (error) {
      console.error("Erro ao salvar regra tributária:", error);
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome da Regra</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: IRRF - Serviços Profissionais" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Tributo</FormLabel>
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
                    <SelectItem value="PIS/COFINS/CSLL">PIS/COFINS/CSLL</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alíquota</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: 1.5%"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9.,]/g, "");
                      field.onChange(value + "%");
                    }}
                  />
                </FormControl>
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
            name="validFrom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Início da Vigência</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="validTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fim da Vigência</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormDescription>
                  Opcional. Deixe em branco para vigência indeterminada.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="hasMinimumValue"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>Valor Mínimo</FormLabel>
                  <FormDescription>
                    Definir um valor mínimo para aplicação da regra
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {form.watch("hasMinimumValue") && (
            <FormField
              control={form.control}
              name="minimumValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor Mínimo</FormLabel>
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
          )}

          <FormField
            control={form.control}
            name="hasMaximumValue"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>Valor Máximo</FormLabel>
                  <FormDescription>
                    Definir um valor máximo para aplicação da regra
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {form.watch("hasMaximumValue") && (
            <FormField
              control={form.control}
              name="maximumValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor Máximo</FormLabel>
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
          )}
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva detalhadamente a regra tributária..."
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

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Status da Regra</FormLabel>
                <FormDescription>
                  Ative ou desative a aplicação desta regra
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
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