import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

interface TaxRuleHistory {
  id: string;
  ruleId: string;
  changeType: "creation" | "update" | "deletion";
  field: string;
  oldValue: string;
  newValue: string;
  changedBy: string;
  changeDate: string;
}

export function TaxRuleHistoryPage() {
  const [searchParams] = useSearchParams();
  const ruleId = searchParams.get("rule");

  const [history] = useState<TaxRuleHistory[]>([
    {
      id: "1",
      ruleId: "1",
      changeType: "creation",
      field: "all",
      oldValue: "",
      newValue: "Criação inicial da regra",
      changedBy: "João Silva",
      changeDate: "2024-01-01T10:00:00",
    },
    {
      id: "2",
      ruleId: "1",
      changeType: "update",
      field: "rate",
      oldValue: "17%",
      newValue: "18%",
      changedBy: "Maria Santos",
      changeDate: "2024-02-15T14:30:00",
    },
    {
      id: "3",
      ruleId: "1",
      changeType: "update",
      field: "description",
      oldValue: "Alíquota básica",
      newValue: "Alíquota padrão de ICMS para operações internas",
      changedBy: "Pedro Costa",
      changeDate: "2024-03-01T09:15:00",
    },
  ].filter(item => !ruleId || item.ruleId === ruleId));

  const columns = [
    {
      accessorKey: "changeType",
      header: "Tipo de Alteração",
      cell: ({ row }: any) => {
        const type = row.original.changeType;
        const styles = {
          creation: "bg-green-100 text-green-800",
          update: "bg-blue-100 text-blue-800",
          deletion: "bg-red-100 text-red-800",
        };
        const labels = {
          creation: "Criação",
          update: "Atualização",
          deletion: "Exclusão",
        };
        return (
          <span className={`px-2 py-1 rounded-full text-sm ${styles[type]}`}>
            {labels[type]}
          </span>
        );
      },
    },
    {
      accessorKey: "field",
      header: "Campo",
      cell: ({ row }: any) => {
        const field = row.original.field;
        if (field === "all") return "Todos os campos";
        return field.charAt(0).toUpperCase() + field.slice(1);
      },
    },
    {
      accessorKey: "oldValue",
      header: "Valor Anterior",
    },
    {
      accessorKey: "newValue",
      header: "Novo Valor",
    },
    {
      accessorKey: "changedBy",
      header: "Alterado Por",
    },
    {
      accessorKey: "changeDate",
      header: "Data da Alteração",
      cell: ({ row }: any) => {
        return new Date(row.original.changeDate).toLocaleString('pt-BR');
      },
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Histórico de Alterações</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Exportar Histórico</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Alterações</CardTitle>
          <CardDescription>
            Registro de todas as alterações realizadas {ruleId ? "nesta regra" : "nas regras"} tributárias
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={history} />
        </CardContent>
      </Card>
    </div>
  );
} 