import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import { addDays } from "date-fns";

const credits = [
  {
    id: 1,
    client: "Empresa ABC Ltda",
    type: "IRRF",
    value: "R$ 25.000,00",
    status: "Identificado",
    period: "2024-01",
    expirationDate: "2029-01",
  },
  {
    id: 2,
    client: "XYZ Comércio e Serviços",
    type: "PIS/COFINS",
    value: "R$ 35.000,00",
    status: "Em Análise",
    period: "2024-01",
    expirationDate: "2029-01",
  },
];

const statusColors = {
  "Identificado": "bg-green-100 text-green-800",
  "Em Análise": "bg-yellow-100 text-yellow-800",
  "Compensado": "bg-blue-100 text-blue-800",
  "Expirado": "bg-red-100 text-red-800",
};

export function TaxCreditsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 30),
  });

  const filteredCredits = credits.filter(
    (credit) =>
      credit.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      credit.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      credit.value.includes(searchTerm)
  );

  const totalCredits = credits.reduce(
    (acc, credit) => acc + parseFloat(credit.value.replace("R$ ", "").replace(".", "").replace(",", ".")),
    0
  );

  const pendingCredits = credits
    .filter((credit) => credit.status === "Em Análise")
    .reduce(
      (acc, credit) => acc + parseFloat(credit.value.replace("R$ ", "").replace(".", "").replace(",", ".")),
      0
    );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Créditos Tributários</h1>
          <p className="text-muted-foreground">
            Gerencie e acompanhe os créditos tributários identificados
          </p>
        </div>
        <Button>Novo Crédito</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Créditos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(totalCredits)}
            </div>
            <p className="text-xs text-muted-foreground">
              +20.1% em relação ao mês anterior
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
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(pendingCredits)}
            </div>
            <p className="text-xs text-muted-foreground">
              5 créditos em análise
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Taxa de Aprovação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">
              +2.5% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tempo Médio de Análise
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15 dias</div>
            <p className="text-xs text-muted-foreground">
              -2 dias em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Buscar por cliente, tipo ou valor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <DatePickerWithRange date={date} setDate={setDate} />
        <Button variant="outline">Exportar</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Período</TableHead>
            <TableHead>Vencimento</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCredits.map((credit) => (
            <TableRow key={credit.id}>
              <TableCell>{credit.client}</TableCell>
              <TableCell>{credit.type}</TableCell>
              <TableCell>{credit.value}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={statusColors[credit.status as keyof typeof statusColors]}
                >
                  {credit.status}
                </Badge>
              </TableCell>
              <TableCell>{credit.period}</TableCell>
              <TableCell>{credit.expirationDate}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    Visualizar
                  </Button>
                  <Button variant="ghost" size="sm">
                    Editar
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600">
                    Excluir
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 