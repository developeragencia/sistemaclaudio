
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Loader2, Plus, Save, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  activity_code: z.string().min(1, 'Código de atividade é obrigatório'),
  retention_rate: z.number()
    .min(0, 'Taxa deve ser no mínimo 0%')
    .max(100, 'Taxa deve ser no máximo 100%'),
  description: z.string().optional(),
});

const TaxRatesPage = () => {
  const [taxRates, setTaxRates] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      activity_code: '',
      retention_rate: 0,
      description: '',
    },
  });

  // Fetch tax rates on component mount
  useEffect(() => {
    fetchTaxRates();
  }, []);

  const fetchTaxRates = async () => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('tax_rates')
        .select('*')
        .order('activity_code');
        
      if (error) {
        throw error;
      }
      
      setTaxRates(data || []);
    } catch (error) {
      console.error('Error fetching tax rates:', error);
      toast.error('Falha ao carregar taxas de retenção');
    } finally {
      setLoading(false);
    }
  };

  const handleEditTaxRate = (taxRate: any) => {
    form.reset({
      activity_code: taxRate.activity_code,
      retention_rate: taxRate.retention_rate,
      description: taxRate.description || '',
    });
    setEditingId(taxRate.id);
    setDialogOpen(true);
  };

  const handleAddNew = () => {
    form.reset({
      activity_code: '',
      retention_rate: 0,
      description: '',
    });
    setEditingId(null);
    setDialogOpen(true);
  };

  const handleDeleteTaxRate = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta alíquota?')) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('tax_rates')
        .delete()
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      toast.success('Alíquota excluída com sucesso');
      fetchTaxRates();
    } catch (error) {
      console.error('Error deleting tax rate:', error);
      toast.error('Falha ao excluir alíquota');
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (editingId) {
        // Update existing tax rate
        const { error } = await supabase
          .from('tax_rates')
          .update(values)
          .eq('id', editingId);
          
        if (error) {
          throw error;
        }
        
        toast.success('Alíquota atualizada com sucesso');
      } else {
        // Create new tax rate
        const { error } = await supabase
          .from('tax_rates')
          .insert(values);
          
        if (error) {
          throw error;
        }
        
        toast.success('Alíquota criada com sucesso');
      }
      
      setDialogOpen(false);
      fetchTaxRates();
    } catch (error) {
      console.error('Error saving tax rate:', error);
      toast.error('Falha ao salvar alíquota');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Alíquotas de Retenção</h1>
        <p className="text-muted-foreground">
          Gerencie as alíquotas de retenção fiscal para diferentes códigos de atividade
        </p>
      </div>

      <Separator />

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Alíquotas Cadastradas</h2>
        <div className="flex space-x-2">
          <Button
            onClick={fetchTaxRates}
            variant="outline"
            size="sm"
          >
            Atualizar
          </Button>
          <Button
            onClick={handleAddNew}
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nova Alíquota
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : taxRates.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código de Atividade</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead className="text-right">Alíquota</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {taxRates.map((taxRate) => (
                  <TableRow key={taxRate.id}>
                    <TableCell className="font-medium">{taxRate.activity_code}</TableCell>
                    <TableCell>{taxRate.description || '-'}</TableCell>
                    <TableCell className="text-right">{taxRate.retention_rate}%</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          onClick={() => handleEditTaxRate(taxRate)}
                          variant="ghost"
                          size="sm"
                        >
                          Editar
                        </Button>
                        <Button
                          onClick={() => handleDeleteTaxRate(taxRate.id)}
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col justify-center items-center h-64 text-muted-foreground">
              <p>Nenhuma alíquota cadastrada</p>
              <Button
                onClick={handleAddNew}
                variant="outline"
                className="mt-4"
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Alíquota
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? 'Editar Alíquota' : 'Nova Alíquota'}</DialogTitle>
            <DialogDescription>
              {editingId 
                ? 'Atualize os dados da alíquota de retenção'
                : 'Preencha os dados para criar uma nova alíquota de retenção'}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="activity_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código de Atividade</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 6201-5/01" {...field} />
                    </FormControl>
                    <FormDescription>
                      Código CNAE da atividade econômica
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="retention_rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alíquota de Retenção (%)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01"
                        min="0"
                        max="100"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      Percentual de retenção fiscal a ser aplicado
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input placeholder="Descrição da atividade" {...field} />
                    </FormControl>
                    <FormDescription>
                      Descrição opcional para identificação da atividade
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">Cancelar</Button>
                </DialogClose>
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaxRatesPage;
