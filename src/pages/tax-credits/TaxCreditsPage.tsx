import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/ui/data-table";
import { useState } from "react";

// Tipos
interface TaxCredit {
  id: string;
  description: string;
  taxType: string;
  value: number;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
}

export function TaxCreditsPage() {
  const [credits] = useState<TaxCredit[]>([
    {
      id: "1",
      description: "Crédito de ICMS - Compra de Insumos",
      taxType: "ICMS",
      value: 25000.0,
      status: "approved",
      createdAt: "2024-03-01T10:00:00",
      updatedAt: "2024-03-05T14:30:00",
      expiresAt: "2025-03-01T10:00:00",
    },
    {
      id: "2",
      description: "Crédito de IPI - Exportação",
      taxType: "IPI",
      value: 15000.0,
      status: "pending",
      createdAt: "2024-03-10T09:15:00",
      updatedAt: "2024-03-10T09:15:00",
      expiresAt: "2025-03-10T09:15:00",
    },
    {
      id: "3",
      description: "Crédito de PIS/COFINS - Serviços",
      taxType: "PIS/COFINS",
      value: 7500.0,
      status: "rejected",
      createdAt: "2024-02-15T16:45:00",
      updatedAt: "2024-02-20T11:30:00",
      expiresAt: "2025-02-15T16:45:00",
    },
  ]);

  const columns = [
    {
      accessorKey: "description",
      header: "Descrição",
    },
    {
      accessorKey: "taxType",
      header: "Tipo de Imposto",
    },
    {
      accessorKey: "value",
      header: "Valor",
      cell: ({ row }: any) => {
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(row.original.value);
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
      accessorKey: "createdAt",
      header: "Data de Criação",
      cell: ({ row }: any) => {
        return new Date(row.original.createdAt).toLocaleString('pt-BR');
      },
    },
    {
      accessorKey: "expiresAt",
      header: "Data de Expiração",
      cell: ({ row }: any) => {
        return new Date(row.original.expiresAt).toLocaleString('pt-BR');
      },
    },
  ];

  const totalCredits = credits.reduce((acc, credit) => acc + credit.value, 0);
  const approvedCredits = credits
    .filter(credit => credit.status === "approved")
    .reduce((acc, credit) => acc + credit.value, 0);
  const pendingCredits = credits
    .filter(credit => credit.status === "pending")
    .reduce((acc, credit) => acc + credit.value, 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Créditos Tributários</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Exportar</Button>
          <Button>Novo Crédito</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Créditos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalCredits)}</div>
            <p className="text-xs text-muted-foreground">
              Todos os créditos
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Créditos Aprovados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(approvedCredits)}
            </div>
            <p className="text-xs text-muted-foreground">
              Disponíveis para uso
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Créditos Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {formatCurrency(pendingCredits)}
            </div>
            <p className="text-xs text-muted-foreground">
              Em análise
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todos os Créditos</CardTitle>
          <CardDescription>
            Lista de todos os créditos tributários registrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={credits} />
        </CardContent>
      </Card>
    </div>
  );
} 