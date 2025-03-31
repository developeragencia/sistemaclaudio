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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaymentAuditDialog } from "@/components/payment-audit/PaymentAuditDialog";
import { toast } from "sonner";

const auditedPayments = [
  {
    id: 1,
    supplier: "Fornecedor ABC",
    document: "NF-e 123456",
    value: "R$ 25.000,00",
    paymentDate: "2024-02-15",
    status: "Inconsistência",
    retentionValue: "R$ 2.500,00",
    retentionType: "IRRF",
    auditProgress: 100,
  },
  {
    id: 2,
    supplier: "Serviços XYZ",
    document: "NF-e 789012",
    value: "R$ 15.000,00",
    paymentDate: "2024-02-10",
    status: "Conforme",
    retentionValue: "R$ 1.500,00",
    retentionType: "ISS",
    auditProgress: 100,
  },
  {
    id: 3,
    supplier: "Consultoria DEF",
    document: "NF-e 345678",
    value: "R$ 30.000,00",
    paymentDate: "2024-02-20",
    status: "Em Análise",
    retentionValue: "R$ 3.000,00",
    retentionType: "IRRF",
    auditProgress: 45,
  },
];

const statusColors = {
  "Em Análise": "bg-yellow-100 text-yellow-800",
  "Conforme": "bg-green-100 text-green-800",
  "Inconsistência": "bg-red-100 text-red-800",
  "Pendente": "bg-blue-100 text-blue-800",
};

export function PaymentAuditPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 30),
  });
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

  const filteredPayments = auditedPayments.filter(
    (payment) =>
      (payment.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.document.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.value.includes(searchTerm)) &&
      (!selectedStatus || payment.status === selectedStatus)
  );

  const totalAudited = auditedPayments.reduce(
    (acc, payment) => acc + parseFloat(payment.value.replace("R$ ", "").replace(".", "").replace(",", ".")),
    0
  );

  const totalRetentions = auditedPayments.reduce(
    (acc, payment) => acc + parseFloat(payment.retentionValue.replace("R$ ", "").replace(".", "").replace(",", ".")),
    0
  );

  const inconsistencies = auditedPayments.filter(
    (payment) => payment.status === "Inconsistência"
  ).length;

  const handleSubmit = async (data: any) => {
    try {
      // TODO: Implementar integração com a API
      console.log("Dados do formulário:", data);
      toast.success(
        selectedPayment
          ? "Auditoria atualizada com sucesso!"
          : "Nova auditoria registrada com sucesso!"
      );
      setDialogOpen(false);
      setSelectedPayment(null);
    } catch (error) {
      console.error("Erro ao salvar auditoria:", error);
      toast.error("Erro ao salvar auditoria");
    }
  };

  const handleEdit = (payment: any) => {
    setSelectedPayment(payment);
    setDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      // TODO: Implementar integração com a API
      console.log("Excluindo auditoria:", id);
      toast.success("Auditoria excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir auditoria:", error);
      toast.error("Erro ao excluir auditoria");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Auditoria de Pagamentos</h1>
        <p className="text-muted-foreground">
          Audite e monitore os pagamentos e retenções tributárias
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Auditado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(totalAudited)}
            </div>
            <p className="text-xs text-muted-foreground">
              3 pagamentos auditados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Retenções
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(totalRetentions)}
            </div>
            <p className="text-xs text-muted-foreground">
              +12.5% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Inconsistências
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inconsistencies}</div>
            <p className="text-xs text-muted-foreground">
              {((inconsistencies / auditedPayments.length) * 100).toFixed(1)}% do total
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
            <div className="text-2xl font-bold">8 horas</div>
            <p className="text-xs text-muted-foreground">
              -1 hora em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="payments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="payments">Pagamentos</TabsTrigger>
          <TabsTrigger value="analysis">Análise</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="payments" className="space-y-4">
          <div className="flex gap-4 mb-4">
            <Input
              placeholder="Buscar por fornecedor, documento ou valor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <DatePickerWithRange date={date} setDate={setDate} />
            <Select
              value={selectedStatus}
              onValueChange={setSelectedStatus}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos</SelectItem>
                <SelectItem value="Em Análise">Em Análise</SelectItem>
                <SelectItem value="Conforme">Conforme</SelectItem>
                <SelectItem value="Inconsistência">Inconsistência</SelectItem>
                <SelectItem value="Pendente">Pendente</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => setDialogOpen(true)}>Nova Auditoria</Button>
            <Button variant="outline">Exportar</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fornecedor</TableHead>
                <TableHead>Documento</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Data do Pagamento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Valor Retido</TableHead>
                <TableHead>Tipo de Retenção</TableHead>
                <TableHead>Progresso</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.supplier}</TableCell>
                  <TableCell>{payment.document}</TableCell>
                  <TableCell>{payment.value}</TableCell>
                  <TableCell>{payment.paymentDate}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={statusColors[payment.status as keyof typeof statusColors]}
                    >
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{payment.retentionValue}</TableCell>
                  <TableCell>{payment.retentionType}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={payment.auditProgress} className="w-[60px]" />
                      <span className="text-sm">{payment.auditProgress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        Visualizar
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(payment)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600"
                        onClick={() => handleDelete(payment.id)}
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
              <CardTitle>Análise de Pagamentos</CardTitle>
              <CardDescription>
                Analise detalhada dos pagamentos e retenções
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground">
                Conteúdo em desenvolvimento...
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios</CardTitle>
              <CardDescription>
                Relatórios e estatísticas de auditoria
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

      <PaymentAuditDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        initialData={selectedPayment}
      />
    </div>
  );
} 