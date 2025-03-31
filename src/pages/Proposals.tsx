
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  FileText,
  Filter,
  Clock,
  CheckCircle2,
  XCircle,
  FileCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Proposal, ProposalStatus } from '@/types/proposal';

// Dados simulados para desenvolvimento
const MOCK_PROPOSALS: Proposal[] = [
  {
    id: '1',
    clientId: '1',
    clientName: 'Prefeitura Municipal de São Paulo',
    clientCnpj: '12.345.678/0001-90',
    representativeId: '4',
    representativeName: 'João Silva',
    title: 'Recuperação de créditos de IRRF 2019-2023',
    description: 'Análise e recuperação de créditos de IRRF sobre pagamentos a fornecedores no período de 2019 a 2023',
    potentialValue: 1250000,
    status: 'analysis',
    createdAt: '2023-10-15T14:30:00Z',
    updatedAt: '2023-10-18T09:15:00Z',
  },
  {
    id: '2',
    clientId: '2',
    clientName: 'Universidade Federal de Minas Gerais',
    clientCnpj: '98.765.432/0001-21',
    representativeId: '4',
    representativeName: 'João Silva',
    title: 'Revisão fiscal exercícios 2020-2022',
    description: 'Revisão completa dos tributos retidos nos exercícios de 2020 a 2022',
    potentialValue: 780000,
    status: 'solicitation',
    createdAt: '2023-10-14T10:00:00Z',
    updatedAt: '2023-10-14T10:00:00Z',
  },
  {
    id: '3',
    clientId: '3',
    clientName: 'Hospital Municipal do Rio de Janeiro',
    clientCnpj: '45.678.901/0001-56',
    representativeId: '4',
    representativeName: 'Maria Souza',
    title: 'Créditos tributários sobre folha de pagamento',
    description: 'Análise e recuperação de créditos tributários relacionados à folha de pagamento',
    potentialValue: 450000,
    status: 'approved',
    createdAt: '2023-10-10T09:45:00Z',
    updatedAt: '2023-10-17T16:20:00Z',
  },
  {
    id: '4',
    clientId: '4',
    clientName: 'Secretaria de Infraestrutura de Recife',
    clientCnpj: '34.567.890/0001-78',
    representativeId: '4',
    representativeName: 'Maria Souza',
    title: 'Recuperação de IRRF sobre serviços de engenharia',
    description: 'Análise e recuperação de IRRF sobre pagamentos a empresas de engenharia e construção',
    potentialValue: 320000,
    status: 'rejected',
    createdAt: '2023-10-05T14:20:00Z',
    updatedAt: '2023-10-12T11:30:00Z',
    notes: 'Proposta rejeitada por documentação incompleta',
  },
  {
    id: '5',
    clientId: '1',
    clientName: 'Prefeitura Municipal de São Paulo',
    clientCnpj: '12.345.678/0001-90',
    representativeId: '4',
    representativeName: 'Carlos Mendes',
    title: 'Restituição de IRRF sobre despesas médicas',
    description: 'Análise e restituição de IRRF sobre pagamentos a prestadores de serviços médicos',
    potentialValue: 680000,
    status: 'contracted',
    createdAt: '2023-09-20T10:15:00Z',
    updatedAt: '2023-10-01T09:45:00Z',
  },
];

const getStatusBadge = (status: ProposalStatus) => {
  switch (status) {
    case 'solicitation':
      return {
        variant: 'outline' as const,
        label: 'Solicitação',
        className: 'bg-blue-50 text-blue-700 hover:bg-blue-50',
        icon: <Clock className="h-3.5 w-3.5 mr-1" />,
      };
    case 'analysis':
      return {
        variant: 'outline' as const,
        label: 'Em Análise',
        className: 'bg-yellow-50 text-yellow-700 hover:bg-yellow-50',
        icon: <Filter className="h-3.5 w-3.5 mr-1" />,
      };
    case 'approved':
      return {
        variant: 'outline' as const,
        label: 'Aprovada',
        className: 'bg-green-50 text-green-700 hover:bg-green-50',
        icon: <CheckCircle2 className="h-3.5 w-3.5 mr-1" />,
      };
    case 'rejected':
      return {
        variant: 'outline' as const,
        label: 'Rejeitada',
        className: 'bg-red-50 text-red-700 hover:bg-red-50',
        icon: <XCircle className="h-3.5 w-3.5 mr-1" />,
      };
    case 'contracted':
      return {
        variant: 'outline' as const,
        label: 'Contratada',
        className: 'bg-purple-50 text-purple-700 hover:bg-purple-50',
        icon: <FileCheck className="h-3.5 w-3.5 mr-1" />,
      };
  }
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

const Proposals = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProposals = MOCK_PROPOSALS.filter(
    (proposal) =>
      proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Propostas Comerciais</h1>
          <p className="text-muted-foreground">
            Gerencie propostas comerciais e acompanhe seu andamento
          </p>
        </div>

        <Button asChild>
          <Link to="/proposals/new">
            <Plus className="mr-2 h-4 w-4" />
            Nova Proposta
          </Link>
        </Button>
      </div>

      <Separator />

      <div className="flex flex-col md:flex-row gap-4">
        <Card className="md:w-64 flex-shrink-0">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Status</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Todas
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <Clock className="mr-2 h-4 w-4 text-blue-600" />
                    Solicitação
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <Filter className="mr-2 h-4 w-4 text-yellow-600" />
                    Em Análise
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                    Aprovadas
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <XCircle className="mr-2 h-4 w-4 text-red-600" />
                    Rejeitadas
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <FileCheck className="mr-2 h-4 w-4 text-purple-600" />
                    Contratadas
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Período</h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    Último mês
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    Últimos 3 meses
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    Este ano
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex-1 space-y-4">
          <div className="flex items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar por título, cliente ou descrição..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Proposta</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Valor Potencial</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProposals.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground py-6">
                        Nenhuma proposta encontrada
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredProposals.map((proposal) => {
                      const statusBadge = getStatusBadge(proposal.status);
                      
                      return (
                        <TableRow key={proposal.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{proposal.title}</p>
                              <p className="text-sm text-muted-foreground truncate max-w-[300px]">
                                {proposal.description}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="bg-taxglider-blue-100 text-taxglider-blue-700 text-xs">
                                  {getInitials(proposal.clientName)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{proposal.clientName}</p>
                                <p className="text-xs text-muted-foreground">{proposal.clientCnpj}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{formatCurrency(proposal.potentialValue)}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="text-sm">{formatDate(proposal.createdAt)}</span>
                              <span className="text-xs text-muted-foreground">
                                Atualizado: {formatDate(proposal.updatedAt)}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={statusBadge.variant}
                              className={statusBadge.className}
                            >
                              <div className="flex items-center">
                                {statusBadge.icon}
                                {statusBadge.label}
                              </div>
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                                <DropdownMenuItem>Editar</DropdownMenuItem>
                                <DropdownMenuItem>Atualizar Status</DropdownMenuItem>
                                {proposal.status === 'approved' && (
                                  <DropdownMenuItem>Converter em Contrato</DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Proposals;
