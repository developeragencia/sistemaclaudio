import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/ui/data-table";
import { useState } from "react";
import { Link } from "react-router-dom";

interface TaxRule {
  id: string;
  name: string;
  description: string;
  taxType: string;
  rate: number;
  startDate: string;
  endDate: string | null;
  status: "active" | "inactive" | "pending";
}

export function TaxRulesPage() {
  const [rules] = useState<TaxRule[]>([
    {
      id: "1",
      name: "ICMS Padrão",
      description: "Alíquota padrão de ICMS para operações internas",
      taxType: "ICMS",
      rate: 18,
      startDate: "2024-01-01",
      endDate: null,
      status: "active",
    },
    {
      id: "2",
      name: "PIS/COFINS Regime Não-Cumulativo",
      description: "Alíquotas para empresas no regime não-cumulativo",
      taxType: "PIS/COFINS",
      rate: 9.25,
      startDate: "2024-01-01",
      endDate: null,
      status: "active",
    },
    {
      id: "3",
      name: "IPI Tabela TIPI",
      description: "Alíquotas conforme Tabela TIPI 2024",
      taxType: "IPI",
      rate: 15,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      status: "pending",
    },
  ]);

  const columns = [
    {
      accessorKey: "name",
      header: "Nome",
    },
    {
      accessorKey: "description",
      header: "Descrição",
    },
    {
      accessorKey: "taxType",
      header: "Tipo",
    },
    {
      accessorKey: "rate",
      header: "Alíquota",
      cell: ({ row }: any) => {
        return `${row.original.rate}%`;
      },
    },
    {
      accessorKey: "startDate",
      header: "Início",
      cell: ({ row }: any) => {
        return new Date(row.original.startDate).toLocaleDateString('pt-BR');
      },
    },
    {
      accessorKey: "endDate",
      header: "Fim",
      cell: ({ row }: any) => {
        return row.original.endDate 
          ? new Date(row.original.endDate).toLocaleDateString('pt-BR')
          : "Indeterminado";
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: any) => {
        const status = row.original.status;
        const styles = {
          active: "bg-green-100 text-green-800",
          inactive: "bg-red-100 text-red-800",
          pending: "bg-yellow-100 text-yellow-800",
        };
        const labels = {
          active: "Ativa",
          inactive: "Inativa",
          pending: "Pendente",
        };
        return (
          <span className={`px-2 py-1 rounded-full text-sm ${styles[status]}`}>
            {labels[status]}
          </span>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }: any) => {
        return (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/app/tax-rules/history?rule=${row.original.id}`}>
                Histórico
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/app/tax-rules/settings?rule=${row.original.id}`}>
                Configurações
              </Link>
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Regras Tributárias</h2>
        <div className="flex items-center space-x-2">
          <Button>Nova Regra</Button>
          <Button variant="outline">Exportar Regras</Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="active">Ativas</TabsTrigger>
          <TabsTrigger value="pending">Pendentes</TabsTrigger>
          <TabsTrigger value="inactive">Inativas</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Todas as Regras</CardTitle>
              <CardDescription>
                Visualize todas as regras tributárias cadastradas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={rules} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Regras Ativas</CardTitle>
              <CardDescription>
                Regras tributárias atualmente em vigor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable 
                columns={columns} 
                data={rules.filter(rule => rule.status === 'active')} 
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Regras Pendentes</CardTitle>
              <CardDescription>
                Regras tributárias aguardando aprovação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable 
                columns={columns} 
                data={rules.filter(rule => rule.status === 'pending')} 
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inactive" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Regras Inativas</CardTitle>
              <CardDescription>
                Regras tributárias desativadas ou expiradas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable 
                columns={columns} 
                data={rules.filter(rule => rule.status === 'inactive')} 
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 