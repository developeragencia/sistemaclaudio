import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/ui/data-table";
import { useState } from "react";

// Tipos
interface Credit {
  id: string;
  type: string;
  description: string;
  value: number;
  status: "pending" | "approved" | "rejected";
  date: string;
}

export function TaxCreditsPage() {
  const [credits] = useState<Credit[]>([
    {
      id: "1",
      type: "ICMS",
      description: "Crédito de ICMS sobre insumos",
      value: 15000.00,
      status: "approved",
      date: "2024-03-15",
    },
    {
      id: "2",
      type: "PIS/COFINS",
      description: "Crédito de PIS/COFINS sobre despesas",
      value: 8500.00,
      status: "pending",
      date: "2024-03-14",
    },
    {
      id: "3",
      type: "IPI",
      description: "Crédito de IPI sobre matéria-prima",
      value: 12000.00,
      status: "approved",
      date: "2024-03-13",
    },
  ]);

  const columns = [
    {
      accessorKey: "type",
      header: "Tipo",
    },
    {
      accessorKey: "description",
      header: "Descrição",
    },
    {
      accessorKey: "value",
      header: "Valor",
      cell: ({ row }: any) => {
        return `R$ ${row.original.value.toFixed(2)}`;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: any) => {
        const status = row.original.status;
        const styles = {
          approved: "bg-green-100 text-green-800",
          pending: "bg-yellow-100 text-yellow-800",
          rejected: "bg-red-100 text-red-800",
        };
        const labels = {
          approved: "Aprovado",
          pending: "Pendente",
          rejected: "Rejeitado",
        };
        return (
          <span className={`px-2 py-1 rounded-full text-sm ${styles[status]}`}>
            {labels[status]}
          </span>
        );
      },
    },
    {
      accessorKey: "date",
      header: "Data",
      cell: ({ row }: any) => {
        return new Date(row.original.date).toLocaleDateString('pt-BR');
      },
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Créditos Tributários</h2>
        <div className="flex items-center space-x-2">
          <Button>Novo Crédito</Button>
          <Button variant="outline">Exportar Relatório</Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="pending">Pendentes</TabsTrigger>
          <TabsTrigger value="approved">Aprovados</TabsTrigger>
          <TabsTrigger value="rejected">Rejeitados</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Todos os Créditos</CardTitle>
              <CardDescription>
                Visualize todos os créditos tributários identificados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={credits} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Créditos Pendentes</CardTitle>
              <CardDescription>
                Créditos que aguardam análise ou aprovação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable 
                columns={columns} 
                data={credits.filter(credit => credit.status === 'pending')} 
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Créditos Aprovados</CardTitle>
              <CardDescription>
                Créditos aprovados e disponíveis para utilização
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable 
                columns={columns} 
                data={credits.filter(credit => credit.status === 'approved')} 
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Créditos Rejeitados</CardTitle>
              <CardDescription>
                Créditos que não foram aprovados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable 
                columns={columns} 
                data={credits.filter(credit => credit.status === 'rejected')} 
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 