
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Pencil, Save, Plus, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

// Define the type for tax rates
interface TaxRate {
  id: string;
  activity_code: string;
  description: string;
  retention_rate: number;
  created_at?: string;
  updated_at?: string;
}

const TaxRatesPage = () => {
  const [taxRates, setTaxRates] = useState<TaxRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // Form state for new/editing tax rate
  const [formData, setFormData] = useState<{
    activity_code: string;
    description: string;
    retention_rate: number;
  }>({
    activity_code: '',
    description: '',
    retention_rate: 0,
  });

  // Load tax rates from database
  const fetchTaxRates = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('tax_rates')
        .select('*')
        .order('activity_code', { ascending: true });

      if (error) throw error;
      setTaxRates(data || []);
    } catch (error) {
      console.error('Error fetching tax rates:', error);
      toast({
        title: 'Erro ao carregar alíquotas',
        description: 'Não foi possível carregar as alíquotas. Tente novamente mais tarde.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaxRates();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'retention_rate' ? parseFloat(value) || 0 : value
    }));
  };

  // Start editing a tax rate
  const handleEdit = (taxRate: TaxRate) => {
    setEditingId(taxRate.id);
    setFormData({
      activity_code: taxRate.activity_code,
      description: taxRate.description,
      retention_rate: taxRate.retention_rate
    });
  };

  // Cancel editing or adding
  const handleCancel = () => {
    setEditingId(null);
    setIsAddingNew(false);
    setFormData({
      activity_code: '',
      description: '',
      retention_rate: 0
    });
  };

  // Add new tax rate
  const handleAdd = async () => {
    try {
      // Fix TypeScript error: Ensure all required fields have values
      if (!formData.activity_code || formData.retention_rate === undefined) {
        toast({
          title: 'Campos obrigatórios',
          description: 'Código de atividade e alíquota são obrigatórios.',
          variant: 'destructive'
        });
        return;
      }

      const { data, error } = await supabase
        .from('tax_rates')
        .insert({
          activity_code: formData.activity_code,
          description: formData.description,
          retention_rate: formData.retention_rate
        })
        .select();

      if (error) throw error;
      
      toast({
        title: 'Alíquota adicionada',
        description: 'Nova alíquota foi adicionada com sucesso.',
        variant: 'default'
      });
      
      setIsAddingNew(false);
      setFormData({
        activity_code: '',
        description: '',
        retention_rate: 0
      });
      
      // Refresh the list
      fetchTaxRates();
    } catch (error) {
      console.error('Error adding tax rate:', error);
      toast({
        title: 'Erro ao adicionar',
        description: 'Não foi possível adicionar a alíquota. Tente novamente.',
        variant: 'destructive'
      });
    }
  };

  // Update existing tax rate
  const handleUpdate = async () => {
    if (!editingId) return;
    
    try {
      // Fix TypeScript error: Ensure all required fields have values
      if (!formData.activity_code || formData.retention_rate === undefined) {
        toast({
          title: 'Campos obrigatórios',
          description: 'Código de atividade e alíquota são obrigatórios.',
          variant: 'destructive'
        });
        return;
      }

      const { error } = await supabase
        .from('tax_rates')
        .update({
          activity_code: formData.activity_code,
          description: formData.description,
          retention_rate: formData.retention_rate
        })
        .eq('id', editingId);

      if (error) throw error;
      
      toast({
        title: 'Alíquota atualizada',
        description: 'Alíquota foi atualizada com sucesso.',
        variant: 'default'
      });
      
      setEditingId(null);
      setFormData({
        activity_code: '',
        description: '',
        retention_rate: 0
      });
      
      // Refresh the list
      fetchTaxRates();
    } catch (error) {
      console.error('Error updating tax rate:', error);
      toast({
        title: 'Erro ao atualizar',
        description: 'Não foi possível atualizar a alíquota. Tente novamente.',
        variant: 'destructive'
      });
    }
  };

  // Delete tax rate
  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta alíquota?')) return;
    
    try {
      const { error } = await supabase
        .from('tax_rates')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: 'Alíquota excluída',
        description: 'Alíquota foi excluída com sucesso.',
        variant: 'default'
      });
      
      // Refresh the list
      fetchTaxRates();
    } catch (error) {
      console.error('Error deleting tax rate:', error);
      toast({
        title: 'Erro ao excluir',
        description: 'Não foi possível excluir a alíquota. Tente novamente.',
        variant: 'destructive'
      });
    }
  };

  // Filter tax rates based on search
  const filteredTaxRates = taxRates.filter(rate => 
    rate.activity_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rate.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Alíquotas de Retenção</h1>
        <p className="text-muted-foreground">
          Gerencie as alíquotas de retenção fiscal para diferentes códigos de atividade.
        </p>
      </div>
      <Separator />

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Tabela de Alíquotas</CardTitle>
              <CardDescription>
                Consulte, adicione e edite alíquotas por código de atividade.
              </CardDescription>
            </div>
            <Button onClick={() => {
              setIsAddingNew(true);
              setEditingId(null);
              setFormData({
                activity_code: '',
                description: '',
                retention_rate: 0
              });
            }} disabled={isAddingNew || editingId !== null}>
              <Plus className="mr-2 h-4 w-4" />
              Nova Alíquota
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Input
              placeholder="Buscar por código ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>

          {isAddingNew && (
            <div className="bg-muted/50 p-4 rounded-lg mb-6 border">
              <h3 className="text-lg font-medium mb-4">Nova Alíquota</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="activity_code">Código de Atividade</Label>
                  <Input
                    id="activity_code"
                    name="activity_code"
                    value={formData.activity_code}
                    onChange={handleInputChange}
                    placeholder="Ex: 1234-5/67"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Input
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Ex: Consultoria Empresarial"
                  />
                </div>
                <div>
                  <Label htmlFor="retention_rate">Alíquota (%)</Label>
                  <Input
                    id="retention_rate"
                    name="retention_rate"
                    type="number"
                    step="0.01"
                    value={formData.retention_rate}
                    onChange={handleInputChange}
                    placeholder="Ex: 1.5"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={handleCancel}>Cancelar</Button>
                <Button onClick={handleAdd}>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar
                </Button>
              </div>
            </div>
          )}

          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="py-3 px-4 text-left">Código</th>
                  <th className="py-3 px-4 text-left">Descrição</th>
                  <th className="py-3 px-4 text-right">Alíquota (%)</th>
                  <th className="py-3 px-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="py-10 text-center">
                      Carregando alíquotas...
                    </td>
                  </tr>
                ) : filteredTaxRates.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-10 text-center">
                      {searchTerm ? 'Nenhuma alíquota encontrada para sua busca.' : 'Nenhuma alíquota cadastrada.'}
                    </td>
                  </tr>
                ) : (
                  filteredTaxRates.map(rate => (
                    <tr key={rate.id}>
                      {editingId === rate.id ? (
                        <>
                          <td className="py-3 px-4">
                            <Input
                              name="activity_code"
                              value={formData.activity_code}
                              onChange={handleInputChange}
                              className="max-w-xs"
                            />
                          </td>
                          <td className="py-3 px-4">
                            <Input
                              name="description"
                              value={formData.description}
                              onChange={handleInputChange}
                            />
                          </td>
                          <td className="py-3 px-4">
                            <Input
                              name="retention_rate"
                              type="number"
                              step="0.01"
                              value={formData.retention_rate}
                              onChange={handleInputChange}
                              className="max-w-xs text-right"
                            />
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex justify-center gap-2">
                              <Button variant="outline" size="sm" onClick={handleCancel}>
                                Cancelar
                              </Button>
                              <Button size="sm" onClick={handleUpdate}>
                                <Save className="mr-1 h-3 w-3" />
                                Salvar
                              </Button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="py-3 px-4">{rate.activity_code}</td>
                          <td className="py-3 px-4">{rate.description}</td>
                          <td className="py-3 px-4 text-right">{rate.retention_rate.toFixed(2)}%</td>
                          <td className="py-3 px-4">
                            <div className="flex justify-center gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleEdit(rate)}
                                disabled={isAddingNew || editingId !== null}
                              >
                                <Pencil className="h-3 w-3" />
                                <span className="sr-only">Editar</span>
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDelete(rate.id)}
                                disabled={isAddingNew || editingId !== null}
                                className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                              >
                                <Trash2 className="h-3 w-3" />
                                <span className="sr-only">Excluir</span>
                              </Button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxRatesPage;
