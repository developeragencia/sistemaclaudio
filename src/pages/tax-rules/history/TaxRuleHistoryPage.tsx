import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import { addDays } from "date-fns";

const ruleHistory = [
  {
    id: 1,
    ruleName: "IRRF - Serviços Profissionais",
    type: "IRRF",
    changeType: "update",
    field: "rate",
    oldValue: "1.0%",
    newValue: "1.5%",
    changedBy: "João Silva",
    changedAt: "2024-03-15T10:30:00",
    reason: "Atualização conforme nova legislação",
  },
  {
    id: 2,
    ruleName: "PIS/COFINS/CSLL - Serviços",
    type: "PIS/COFINS/CSLL",
    changeType: "create",
    field: null,
    oldValue: null,
    newValue: null,
    changedBy: "Maria Santos",
    changedAt: "2024-03-10T14:15:00",
    reason: "Criação de nova regra para retenção conjunta",
  },
  {
    id: 3,
    ruleName: "ISS - Serviços de TI",
    type: "ISS",
    changeType: "delete",
    field: null,
    oldValue: null,
    newValue: null,
    changedBy: "Pedro Costa",
    changedAt: "2024-02-28T16:45:00",
    reason: "Regra descontinuada",
  },
];

const changeTypeColors = {
  create: "bg-green-100 text-green-800",
  update: "bg-blue-100 text-blue-800",
  delete: "bg-red-100 text-red-800",
};

const changeTypeLabels = {
  create: "Criação",
  update: "Atualização",
  delete: "Exclusão",
};

export default function TaxRuleHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  const filteredHistory = ruleHistory.filter((item) => {
    const matchesSearch = 
      item.ruleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.changedBy.toLowerCase().includes(searchTerm.toLowerCase());

    const changeDate = new Date(item.changedAt);
    const matchesDate = 
      (!date.from || changeDate >= date.from) &&
      (!date.to || changeDate <= date.to);

    return matchesSearch && matchesDate;
  });

  const totalChanges = filteredHistory.length;
  const creations = filteredHistory.filter(item => item.changeType === "create").length;
  const updates = filteredHistory.filter(item => item.changeType === "update").length;
  const deletions = filteredHistory.filter(item => item.changeType === "delete").length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Alterações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalChanges}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Novas Regras</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{creations}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Atualizações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{updates}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exclusões</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deletions}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <Input
          placeholder="Buscar alterações..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <DatePickerWithRange
          date={date}
          onDateChange={setDate}
        />
        <Button variant="outline">Exportar Histórico</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Regra</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Alteração</TableHead>
              <TableHead>Campo</TableHead>
              <TableHead>Valor Anterior</TableHead>
              <TableHead>Novo Valor</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Motivo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredHistory.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.ruleName}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>
                  <Badge className={changeTypeColors[item.changeType as keyof typeof changeTypeColors]}>
                    {changeTypeLabels[item.changeType as keyof typeof changeTypeLabels]}
                  </Badge>
                </TableCell>
                <TableCell>{item.field || "-"}</TableCell>
                <TableCell>{item.oldValue || "-"}</TableCell>
                <TableCell>{item.newValue || "-"}</TableCell>
                <TableCell>{item.changedBy}</TableCell>
                <TableCell>
                  {new Date(item.changedAt).toLocaleString("pt-BR")}
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {item.reason}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 