import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import { addDays } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const recoveryRequests = [
  {
    id: 1,
    client: "Empresa ABC Ltda",
    value: "R$ 25.000,00",
    status: "Em Análise",
    submissionDate: "2024-02-15",
    period: "2023-12",
    type: "IRRF s/ Serviços",
  },
  {
    id: 2,
    client: "XYZ Comércio e Serviços",
    value: "R$ 35.000,00",
    status: "Aprovado",
    submissionDate: "2024-02-10",
    period: "2023-11",
    type: "IRRF s/ Aplicações",
  },
];

const statusColors = {
  "Em Análise": "bg-yellow-100 text-yellow-800",
  "Aprovado": "bg-green-100 text-green-800",
  "Rejeitado": "bg-red-100 text-red-800",
  "Pendente": "bg-blue-100 text-blue-800",
};

export function IRRFRecoveryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 30),
  });

  const filteredRequests = recoveryRequests.filter(
    (request) =>
      request.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.value.includes(searchTerm)
  );

  const totalRecoveryValue = recoveryRequests.reduce(
    (acc, request) => acc + parseFloat(request.value.replace("R$ ", "").replace(".", "").replace(",", ".")),
    0
  );

  const pendingRecoveryValue = recoveryRequests
    .filter((request) => request.status === "Em Análise")
    .reduce(
      (acc, request) => acc + parseFloat(request.value.replace("R$ ", "").replace(".", "").replace(",", ".")),
      0
    );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Recuperação IRRF/PJ</h1>
        <p className="text-muted-foreground">
          Gerencie e acompanhe os processos de recuperação de IRRF
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total em Recuperação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(totalRecoveryValue)}
            </div>
            <p className="text-xs text-muted-foreground">
              +15.3% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Em Análise
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(pendingRecoveryValue)}
            </div>
            <p className="text-xs text-muted-foreground">
              3 processos em análise
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
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">
              +1.2% em relação ao mês anterior
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
            <div className="text-2xl font-bold">45 dias</div>
            <p className="text-xs text-muted-foreground">
              -5 dias em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="requests" className="space-y-4">
        <TabsList>
          <TabsTrigger value="requests">Solicitações</TabsTrigger>
          <TabsTrigger value="analysis">Análise</TabsTrigger>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-4">
          <div className="flex gap-4 mb-4">
            <Input
              placeholder="Buscar por cliente, tipo ou valor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <DatePickerWithRange date={date} setDate={setDate} />
            <Button>Nova Solicitação</Button>
            <Button variant="outline">Exportar</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data de Submissão</TableHead>
                <TableHead>Período</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.client}</TableCell>
                  <TableCell>{request.type}</TableCell>
                  <TableCell>{request.value}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={statusColors[request.status as keyof typeof statusColors]}
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{request.submissionDate}</TableCell>
                  <TableCell>{request.period}</TableCell>
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
        </TabsContent>

        <TabsContent value="analysis">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Processos</CardTitle>
              <CardDescription>
                Acompanhe o status e evolução dos processos de recuperação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground">
                Conteúdo em desenvolvimento...
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documentos</CardTitle>
              <CardDescription>
                Gerencie os documentos necessários para os processos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground">
                Conteúdo em desenvolvimento...
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 