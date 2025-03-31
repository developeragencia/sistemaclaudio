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
import { Progress } from "@/components/ui/progress";
import { CreditIdentificationDialog } from "@/components/credit-identification/CreditIdentificationDialog";
import { toast } from "sonner";

const identifiedCredits = [
  {
    id: 1,
    client: "Empresa ABC Ltda",
    type: "IRRF",
    potentialValue: "R$ 50.000,00",
    status: "Em Análise",
    identificationDate: "2024-02-15",
    probability: 85,
    source: "Notas Fiscais",
  },
  {
    id: 2,
    client: "XYZ Comércio e Serviços",
    type: "PIS/COFINS",
    potentialValue: "R$ 75.000,00",
    status: "Confirmado",
    identificationDate: "2024-02-10",
    probability: 95,
    source: "Declarações",
  },
];

const statusColors = {
  "Em Análise": "bg-yellow-100 text-yellow-800",
  "Confirmado": "bg-green-100 text-green-800",
  "Descartado": "bg-red-100 text-red-800",
  "Pendente": "bg-blue-100 text-blue-800",
};

export function CreditIdentificationPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 30),
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCredit, setSelectedCredit] = useState<any>(null);

  const filteredCredits = identifiedCredits.filter(
    (credit) =>
      credit.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      credit.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      credit.potentialValue.includes(searchTerm)
  );

  const totalPotentialValue = identifiedCredits.reduce(
    (acc, credit) => acc + parseFloat(credit.potentialValue.replace("R$ ", "").replace(".", "").replace(",", ".")),
    0
  );

  const confirmedValue = identifiedCredits
    .filter((credit) => credit.status === "Confirmado")
    .reduce(
      (acc, credit) => acc + parseFloat(credit.potentialValue.replace("R$ ", "").replace(".", "").replace(",", ".")),
      0
    );

  const handleSubmit = async (data: any) => {
    try {
      // TODO: Implementar integração com a API
      console.log("Dados do formulário:", data);
      toast.success(
        selectedCredit
          ? "Identificação de crédito atualizada com sucesso!"
          : "Nova identificação de crédito registrada com sucesso!"
      );
      setDialogOpen(false);
      setSelectedCredit(null);
    } catch (error) {
      console.error("Erro ao salvar identificação:", error);
      toast.error("Erro ao salvar identificação de crédito");
    }
  };

  const handleEdit = (credit: any) => {
    setSelectedCredit(credit);
    setDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      // TODO: Implementar integração com a API
      console.log("Excluindo crédito:", id);
      toast.success("Identificação de crédito excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir identificação:", error);
      toast.error("Erro ao excluir identificação de crédito");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Identificação de Créditos</h1>
        <p className="text-muted-foreground">
          Identifique e analise oportunidades de créditos tributários
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Créditos Potenciais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(totalPotentialValue)}
            </div>
            <p className="text-xs text-muted-foreground">
              +25.2% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Créditos Confirmados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(confirmedValue)}
            </div>
            <p className="text-xs text-muted-foreground">
              2 créditos confirmados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Taxa de Confirmação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">
              +5.4% em relação ao mês anterior
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
            <div className="text-2xl font-bold">12 dias</div>
            <p className="text-xs text-muted-foreground">
              -2 dias em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="identified" className="space-y-4">
        <TabsList>
          <TabsTrigger value="identified">Créditos Identificados</TabsTrigger>
          <TabsTrigger value="analysis">Análise</TabsTrigger>
          <TabsTrigger value="sources">Fontes de Dados</TabsTrigger>
        </TabsList>

        <TabsContent value="identified" className="space-y-4">
          <div className="flex gap-4 mb-4">
            <Input
              placeholder="Buscar por cliente, tipo ou valor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <DatePickerWithRange date={date} setDate={setDate} />
            <Button onClick={() => setDialogOpen(true)}>Nova Identificação</Button>
            <Button variant="outline">Exportar</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Valor Potencial</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data de Identificação</TableHead>
                <TableHead>Probabilidade</TableHead>
                <TableHead>Fonte</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCredits.map((credit) => (
                <TableRow key={credit.id}>
                  <TableCell>{credit.client}</TableCell>
                  <TableCell>{credit.type}</TableCell>
                  <TableCell>{credit.potentialValue}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={statusColors[credit.status as keyof typeof statusColors]}
                    >
                      {credit.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{credit.identificationDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={credit.probability} className="w-[60px]" />
                      <span className="text-sm">{credit.probability}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{credit.source}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        Visualizar
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(credit)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600"
                        onClick={() => handleDelete(credit.id)}
                      >
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
              <CardTitle>Análise de Créditos</CardTitle>
              <CardDescription>
                Analise detalhadamente os créditos identificados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground">
                Conteúdo em desenvolvimento...
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources">
          <Card>
            <CardHeader>
              <CardTitle>Fontes de Dados</CardTitle>
              <CardDescription>
                Gerencie as fontes de dados para identificação de créditos
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

      <CreditIdentificationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        initialData={selectedCredit}
      />
    </div>
  );
} 