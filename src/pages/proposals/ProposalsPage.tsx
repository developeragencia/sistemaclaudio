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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import { ProposalForm } from "@/components/proposals/ProposalForm";
import { Badge } from "@/components/ui/badge";

const proposals = [
  {
    id: 1,
    client: "Empresa ABC Ltda",
    value: "R$ 50.000,00",
    status: "Em Análise",
    createdAt: "2024-02-15",
    validUntil: "2024-03-15",
  },
  {
    id: 2,
    client: "XYZ Comércio e Serviços",
    value: "R$ 75.000,00",
    status: "Aprovada",
    createdAt: "2024-02-10",
    validUntil: "2024-03-10",
  },
];

const statusColors = {
  "Em Análise": "bg-yellow-100 text-yellow-800",
  "Aprovada": "bg-green-100 text-green-800",
  "Rejeitada": "bg-red-100 text-red-800",
  "Expirada": "bg-gray-100 text-gray-800",
};

export function ProposalsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredProposals = proposals.filter(
    (proposal) =>
      proposal.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.value.includes(searchTerm)
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Propostas Comerciais</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" />
              Nova Proposta
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Nova Proposta Comercial</DialogTitle>
            </DialogHeader>
            <ProposalForm onSubmit={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Buscar por cliente ou valor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button variant="outline">Exportar</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Data de Criação</TableHead>
            <TableHead>Validade</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProposals.map((proposal) => (
            <TableRow key={proposal.id}>
              <TableCell>{proposal.client}</TableCell>
              <TableCell>{proposal.value}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={statusColors[proposal.status as keyof typeof statusColors]}
                >
                  {proposal.status}
                </Badge>
              </TableCell>
              <TableCell>{proposal.createdAt}</TableCell>
              <TableCell>{proposal.validUntil}</TableCell>
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