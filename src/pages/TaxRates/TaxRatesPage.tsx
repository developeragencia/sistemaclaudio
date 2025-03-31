
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TaxRate {
  id: string;
  activity_code: string;
  retention_rate: number;
  description: string;
  created_at?: string;
}

const TaxRatesPage: React.FC = () => {
  const [taxRates, setTaxRates] = useState<TaxRate[]>([]);
  const [newTaxRate, setNewTaxRate] = useState<{
    activity_code: string;
    retention_rate: number | undefined;
    description: string;
  }>({
    activity_code: '',
    retention_rate: undefined,
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTaxRates();
  }, []);

  const fetchTaxRates = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('tax_rates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setTaxRates(data || []);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erro ao buscar taxas",
        description: error instanceof Error ? error.message : "Erro desconhecido",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTaxRate(prevState => ({
      ...prevState,
      [name]: name === 'retention_rate' ? Number(value) : value
    }));
  };

  // Fixed the TypeScript error for the tax rate insert by ensuring required fields
  const handleAddTaxRate = async () => {
    if (!newTaxRate.activity_code || typeof newTaxRate.retention_rate !== 'number') {
      toast({
        variant: "destructive",
        title: "Campos obrigatórios",
        description: "Preencha o código de atividade e a taxa de retenção",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Fix: Ensure all required fields are provided and properly typed
      const taxRateToSubmit = {
        activity_code: newTaxRate.activity_code,
        retention_rate: newTaxRate.retention_rate,
        description: newTaxRate.description || ""
      };

      const { error } = await supabase
        .from('tax_rates')
        .insert(taxRateToSubmit);

      if (error) {
        throw error;
      }

      toast({
        title: "Taxa adicionada",
        description: "A taxa de retenção foi adicionada com sucesso",
      });

      setNewTaxRate({
        activity_code: '',
        retention_rate: undefined,
        description: ''
      });
      fetchTaxRates();
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erro ao adicionar taxa",
        description: error instanceof Error ? error.message : "Erro desconhecido",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Taxas de Retenção</CardTitle>
          <CardDescription>Gerencie as taxas de retenção de impostos.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="activity_code">Código de Atividade</Label>
                <Input
                  type="text"
                  id="activity_code"
                  name="activity_code"
                  value={newTaxRate.activity_code}
                  onChange={handleInputChange}
                  placeholder="Ex: 4120-4/00"
                />
              </div>
              <div>
                <Label htmlFor="retention_rate">Taxa de Retenção (%)</Label>
                <Input
                  type="number"
                  id="retention_rate"
                  name="retention_rate"
                  value={newTaxRate.retention_rate || ''}
                  onChange={handleInputChange}
                  placeholder="Ex: 1.5"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Descrição</Label>
              <Input
                type="text"
                id="description"
                name="description"
                value={newTaxRate.description}
                onChange={handleInputChange}
                placeholder="Ex: Construção de edifícios"
              />
            </div>
            <Button onClick={handleAddTaxRate} disabled={isSubmitting}>
              {isSubmitting ? 'Adicionando...' : 'Adicionar Taxa'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Taxas Cadastradas</CardTitle>
          <CardDescription>Lista de taxas de retenção cadastradas no sistema.</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Código</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Taxa (%)</TableHead>
                  <TableHead className="text-right">Criado em</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">Carregando...</TableCell>
                  </TableRow>
                ) : taxRates.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">Nenhuma taxa cadastrada.</TableCell>
                  </TableRow>
                ) : (
                  taxRates.map((taxRate) => (
                    <TableRow key={taxRate.id}>
                      <TableCell className="font-medium">{taxRate.activity_code}</TableCell>
                      <TableCell>{taxRate.description}</TableCell>
                      <TableCell>{taxRate.retention_rate}</TableCell>
                      <TableCell className="text-right">{taxRate.created_at}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxRatesPage;
