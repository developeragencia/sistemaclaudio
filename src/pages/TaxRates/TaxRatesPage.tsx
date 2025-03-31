import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TaxRate } from '@/types/audit';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Plus, Pencil, Trash2 } from 'lucide-react';
import { db } from '@/lib/db';

export default function TaxRatesPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTaxRate, setEditingTaxRate] = useState<TaxRate | null>(null);
  const [formData, setFormData] = useState({
    activity_code: '',
    activity_description: '',
    tax_rate: '',
    tax_type: '',
    minimum_value: '',
  });

  const { data: taxRates, isLoading } = useQuery({
    queryKey: ['taxRates'],
    queryFn: () => db.taxRate.findMany({
      orderBy: {
        activity_code: 'asc'
      }
    })
  });

  const createMutation = useMutation({
    mutationFn: (data: Omit<TaxRate, 'id' | 'created_at' | 'updated_at'>) =>
      db.taxRate.create({
        data: {
          ...data,
          tax_rate: parseFloat(data.tax_rate as unknown as string),
          minimum_value: parseFloat(data.minimum_value as unknown as string),
        }
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['taxRates'] });
      setIsDialogOpen(false);
      resetForm();
      toast({
        title: 'Alíquota criada',
        description: 'A alíquota foi criada com sucesso.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao criar alíquota',
        description: error instanceof Error ? error.message : 'Erro desconhecido',
        variant: 'destructive',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: TaxRate) =>
      db.taxRate.update({
        where: { id: data.id },
        data: {
          activity_code: data.activity_code,
          activity_description: data.activity_description,
          tax_rate: parseFloat(data.tax_rate as unknown as string),
          tax_type: data.tax_type,
          minimum_value: parseFloat(data.minimum_value as unknown as string),
        }
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['taxRates'] });
      setIsDialogOpen(false);
      resetForm();
      toast({
        title: 'Alíquota atualizada',
        description: 'A alíquota foi atualizada com sucesso.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao atualizar alíquota',
        description: error instanceof Error ? error.message : 'Erro desconhecido',
        variant: 'destructive',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      db.taxRate.delete({
        where: { id }
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['taxRates'] });
      toast({
        title: 'Alíquota excluída',
        description: 'A alíquota foi excluída com sucesso.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao excluir alíquota',
        description: error instanceof Error ? error.message : 'Erro desconhecido',
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingTaxRate) {
      updateMutation.mutate({
        ...editingTaxRate,
        ...formData,
      });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (taxRate: TaxRate) => {
    setEditingTaxRate(taxRate);
    setFormData({
      activity_code: taxRate.activity_code,
      activity_description: taxRate.activity_description,
      tax_rate: taxRate.tax_rate.toString(),
      tax_type: taxRate.tax_type,
      minimum_value: taxRate.minimum_value.toString(),
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta alíquota?')) {
      deleteMutation.mutate(id);
    }
  };

  const resetForm = () => {
    setFormData({
      activity_code: '',
      activity_description: '',
      tax_rate: '',
      tax_type: '',
      minimum_value: '',
    });
    setEditingTaxRate(null);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Alíquotas e Regras de Retenção</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                resetForm();
                setIsDialogOpen(true);
              }}>
                <Plus className="mr-2 h-4 w-4" />
                Nova Alíquota
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingTaxRate ? 'Editar Alíquota' : 'Nova Alíquota'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="activity_code">Código da Atividade</label>
                    <Input
                      id="activity_code"
                      value={formData.activity_code}
                      onChange={(e) =>
                        setFormData({ ...formData, activity_code: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="activity_description">Descrição da Atividade</label>
                    <Input
                      id="activity_description"
                      value={formData.activity_description}
                      onChange={(e) =>
                        setFormData({ ...formData, activity_description: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="tax_rate">Alíquota (%)</label>
                    <Input
                      id="tax_rate"
                      type="number"
                      step="0.01"
                      value={formData.tax_rate}
                      onChange={(e) =>
                        setFormData({ ...formData, tax_rate: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="tax_type">Tipo de Imposto</label>
                    <Input
                      id="tax_type"
                      value={formData.tax_type}
                      onChange={(e) =>
                        setFormData({ ...formData, tax_type: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="minimum_value">Valor Mínimo (R$)</label>
                    <Input
                      id="minimum_value"
                      type="number"
                      step="0.01"
                      value={formData.minimum_value}
                      onChange={(e) =>
                        setFormData({ ...formData, minimum_value: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={createMutation.isPending || updateMutation.isPending}
                  >
                    {(createMutation.isPending || updateMutation.isPending) && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {editingTaxRate ? 'Atualizar' : 'Criar'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Alíquota</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Valor Mínimo</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {taxRates?.map((taxRate) => (
                  <TableRow key={taxRate.id}>
                    <TableCell>{taxRate.activity_code}</TableCell>
                    <TableCell>{taxRate.activity_description}</TableCell>
                    <TableCell>{taxRate.tax_rate}%</TableCell>
                    <TableCell>{taxRate.tax_type}</TableCell>
                    <TableCell>{formatCurrency(taxRate.minimum_value)}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(taxRate)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(taxRate.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
