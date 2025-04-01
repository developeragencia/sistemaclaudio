
import React, { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Search, PlusCircle, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Proposal, ProposalStatus } from '@/types/proposal';

// Mock data for proposals
const MOCK_PROPOSALS: Proposal[] = [
  {
    id: '1',
    clientId: '1',
    clientName: 'Prefeitura Municipal de São Paulo',
    clientCnpj: '12.345.678/0001-90',
    representativeId: '4',
    representativeName: 'João Silva',
    title: 'Recuperação de tributos municipais',
    description: 'Proposta para análise e recuperação de tributos municipais recolhidos indevidamente',
    potentialValue: 50000,
    status: 'solicitation',
    createdAt: '2023-05-10T14:30:00Z',
    updatedAt: '2023-05-10T14:30:00Z',
  },
  {
    id: '2',
    clientId: '2',
    clientName: 'Universidade Federal de Minas Gerais',
    clientCnpj: '98.765.432/0001-21',
    representativeId: '4',
    representativeName: 'João Silva',
    title: 'Recuperação de IRRF em contratações',
    description: 'Análise de retenções de IRRF em contratos de prestação de serviços',
    potentialValue: 75000,
    status: 'analysis',
    createdAt: '2023-05-15T10:15:00Z',
    updatedAt: '2023-05-18T16:45:00Z',
  },
  {
    id: '3',
    clientId: '3',
    clientName: 'Hospital Municipal do Rio de Janeiro',
    clientCnpj: '45.678.901/0001-56',
    representativeId: '4',
    representativeName: 'Maria Oliveira',
    title: 'Consultoria fiscal para hospitais',
    description: 'Proposta para análise e otimização da estrutura fiscal do hospital',
    potentialValue: 120000,
    status: 'approved',
    createdAt: '2023-04-20T09:00:00Z',
    updatedAt: '2023-05-01T11:30:00Z',
  },
  {
    id: '4',
    clientId: '4',
    clientName: 'Secretaria de Infraestrutura de Recife',
    clientCnpj: '34.567.890/0001-78',
    representativeId: '4',
    representativeName: 'Carlos Mendes',
    title: 'Recuperação de créditos tributários',
    description: 'Análise e recuperação de créditos tributários de IRPJ e CSLL',
    potentialValue: 90000,
    status: 'rejected',
    createdAt: '2023-05-05T13:45:00Z',
    updatedAt: '2023-05-12T10:20:00Z',
    notes: 'Cliente não possui volume suficiente para viabilizar o projeto',
  },
  {
    id: '5',
    clientId: '2',
    clientName: 'Universidade Federal de Minas Gerais',
    clientCnpj: '98.765.432/0001-21',
    representativeId: '4',
    representativeName: 'Ana Santos',
    title: 'Auditoria de recolhimentos PIS/COFINS',
    description: 'Auditoria completa dos recolhimentos de PIS/COFINS nos últimos 5 anos',
    potentialValue: 200000,
    status: 'contracted',
    createdAt: '2023-03-10T11:00:00Z',
    updatedAt: '2023-04-01T15:30:00Z',
  },
];

const CommercialProposals = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProposalStatus | 'all'>('all');
  const navigate = useNavigate();

  const getStatusLabel = (status: ProposalStatus) => {
    switch (status) {
      case 'solicitation':
        return 'Solicitação';
      case 'analysis':
        return 'Em Análise';
      case 'approved':
        return 'Aprovada';
      case 'rejected':
        return 'Rejeitada';
      case 'contracted':
        return 'Contratada';
      default:
        return status;
    }
  };

  const getStatusVariant = (status: ProposalStatus) => {
    switch (status) {
      case 'solicitation':
        return 'secondary';
      case 'analysis':
        return 'warning';
      case 'approved':
        return 'success';
      case 'rejected':
        return 'destructive';
      case 'contracted':
        return 'default';
      default:
        return 'outline';
    }
  };

  const filteredProposals = MOCK_PROPOSALS.filter((proposal) => {
    const matchesSearch = 
      proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' ? true : proposal.status === statusFilter;
    
    if (activeTab === 'proposals') {
      return matchesSearch && matchesStatus && 
        (proposal.status === 'solicitation' || proposal.status === 'analysis' || 
        proposal.status === 'approved' || proposal.status === 'rejected');
    } else if (activeTab === 'execution') {
      return matchesSearch && matchesStatus && proposal.status === 'contracted';
    } else {
      return matchesSearch && matchesStatus;
    }
  });

  const handleViewProposal = (proposalId: string) => {
    navigate(`/proposal-detail/${proposalId}`);
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <AdminLayout
      title="Propostas Comerciais"
      description="Gerenciamento de propostas comerciais e execução de contratos"
    >
      <Tabs defaultValue="all" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="proposals">Propostas</TabsTrigger>
          <TabsTrigger value="execution">Em Execução</TabsTrigger>
        </TabsList>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar propostas..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Status: {statusFilter === 'all' ? 'Todos' : getStatusLabel(statusFilter)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                  Todos
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('solicitation')}>
                  Solicitação
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('analysis')}>
                  Em Análise
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('approved')}>
                  Aprovada
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('rejected')}>
                  Rejeitada
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('contracted')}>
                  Contratada
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button className="w-full sm:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nova Proposta
          </Button>
        </div>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Representante</TableHead>
                    <TableHead>Valor Potencial</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProposals.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        Nenhuma proposta encontrada.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredProposals.map((proposal) => (
                      <TableRow key={proposal.id}>
                        <TableCell className="font-medium">{proposal.title}</TableCell>
                        <TableCell>{proposal.clientName}</TableCell>
                        <TableCell>{proposal.representativeName}</TableCell>
                        <TableCell>{formatCurrency(proposal.potentialValue)}</TableCell>
                        <TableCell>{formatDate(proposal.createdAt)}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(proposal.status)}>
                            {getStatusLabel(proposal.status)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewProposal(proposal.id)}
                          >
                            Ver Detalhes
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="proposals" className="space-y-4">
          {/* Conteúdo idêntico, filtrado pelo activeTab */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Representante</TableHead>
                    <TableHead>Valor Potencial</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProposals.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        Nenhuma proposta encontrada.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredProposals.map((proposal) => (
                      <TableRow key={proposal.id}>
                        <TableCell className="font-medium">{proposal.title}</TableCell>
                        <TableCell>{proposal.clientName}</TableCell>
                        <TableCell>{proposal.representativeName}</TableCell>
                        <TableCell>{formatCurrency(proposal.potentialValue)}</TableCell>
                        <TableCell>{formatDate(proposal.createdAt)}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(proposal.status)}>
                            {getStatusLabel(proposal.status)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewProposal(proposal.id)}
                          >
                            Ver Detalhes
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="execution" className="space-y-4">
          {/* Conteúdo idêntico, filtrado pelo activeTab */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Representante</TableHead>
                    <TableHead>Valor Contratado</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProposals.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        Nenhum contrato em execução encontrado.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredProposals.map((proposal) => (
                      <TableRow key={proposal.id}>
                        <TableCell className="font-medium">{proposal.title}</TableCell>
                        <TableCell>{proposal.clientName}</TableCell>
                        <TableCell>{proposal.representativeName}</TableCell>
                        <TableCell>{formatCurrency(proposal.potentialValue)}</TableCell>
                        <TableCell>{formatDate(proposal.createdAt)}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(proposal.status)}>
                            {getStatusLabel(proposal.status)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewProposal(proposal.id)}
                          >
                            Ver Detalhes
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default CommercialProposals;
