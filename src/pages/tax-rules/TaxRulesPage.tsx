import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TaxRuleDialog } from "@/components/tax-rules/TaxRuleDialog";
import { toast } from "sonner";

const taxRules = [
  {
    id: 1,
    name: "IRRF - Serviços Profissionais",
    type: "IRRF",
    rate: "1.5%",
    baseValue: "R$ 666,00",
    status: "active",
    lastUpdate: "2024-03-15",
    description: "Retenção de IRRF para serviços profissionais prestados por pessoa jurídica",
  },
  {
    id: 2,
    name: "PIS/COFINS/CSLL - Serviços",
    type: "PIS/COFINS/CSLL",
    rate: "4.65%",
    baseValue: "R$ 5.000,00",
    status: "active",
    lastUpdate: "2024-03-10",
    description: "Retenção conjunta de PIS, COFINS e CSLL para serviços prestados por pessoa jurídica",
  },
  {
    id: 3,
    name: "ISS - Serviços de TI",
    type: "ISS",
    rate: "2%",
    baseValue: "R$ 0,00",
    status: "inactive",
    lastUpdate: "2024-02-28",
    description: "Retenção de ISS para serviços de tecnologia da informação",
  },
];

const statusColors = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-gray-100 text-gray-800",
};

export default function TaxRulesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState<any>(null);

  const filteredRules = taxRules.filter((rule) => {
    const matchesSearch = rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || rule.type === selectedType;
    return matchesSearch && matchesType;
  });

  const activeRules = taxRules.filter(rule => rule.status === "active").length;
  const inactiveRules = taxRules.filter(rule => rule.status === "inactive").length;

  const handleSubmit = async (data: any) => {
    try {
      // Aqui você implementaria a lógica para salvar no backend
      console.log("Dados da regra tributária:", data);
      toast.success(selectedRule ? "Regra atualizada com sucesso!" : "Regra criada com sucesso!");
      setDialogOpen(false);
      setSelectedRule(null);
    } catch (error) {
      console.error("Erro ao salvar regra:", error);
      toast.error("Erro ao salvar regra tributária");
    }
  };

  const handleEdit = (rule: any) => {
    setSelectedRule(rule);
    setDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      // Aqui você implementaria a lógica para deletar no backend
      console.log("Deletando regra:", id);
      toast.success("Regra excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir regra:", error);
      toast.error("Erro ao excluir regra tributária");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={() => {
          setSelectedRule(null);
          setDialogOpen(true);
        }}>
          Nova Regra
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Regras</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taxRules.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Regras Ativas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeRules}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Regras Inativas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inactiveRules}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Última Atualização</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Date(Math.max(...taxRules.map(r => new Date(r.lastUpdate).getTime())))
                .toLocaleDateString("pt-BR")}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <Input
          placeholder="Buscar regras..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos os tipos</SelectItem>
            <SelectItem value="IRRF">IRRF</SelectItem>
            <SelectItem value="ISS">ISS</SelectItem>
            <SelectItem value="PIS">PIS</SelectItem>
            <SelectItem value="COFINS">COFINS</SelectItem>
            <SelectItem value="CSLL">CSLL</SelectItem>
            <SelectItem value="PIS/COFINS/CSLL">PIS/COFINS/CSLL</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Alíquota</TableHead>
              <TableHead>Valor Base</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Última Atualização</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRules.map((rule) => (
              <TableRow key={rule.id}>
                <TableCell className="font-medium">{rule.name}</TableCell>
                <TableCell>{rule.type}</TableCell>
                <TableCell>{rule.rate}</TableCell>
                <TableCell>{rule.baseValue}</TableCell>
                <TableCell>
                  <Badge className={statusColors[rule.status as keyof typeof statusColors]}>
                    {rule.status === "active" ? "Ativo" : "Inativo"}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(rule.lastUpdate).toLocaleDateString("pt-BR")}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={() => handleEdit(rule)}
                  >
                    ✏️
                  </Button>
                  <Button
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={() => handleDelete(rule.id)}
                  >
                    🗑️
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <TaxRuleDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        initialData={selectedRule}
      />
    </div>
  );
} 