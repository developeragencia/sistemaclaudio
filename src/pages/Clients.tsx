
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
import { 
  Building2, 
  Search, 
  Plus, 
  MoreHorizontal, 
  FileText, 
  ClipboardCheck,
  Users
} from 'lucide-react';
import { useAuth, Client } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Clients = () => {
  const { clients, setActiveClient, activeClient } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.cnpj.includes(searchTerm)
  );

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
          <p className="text-muted-foreground">
            Gerencie todos os clientes e suas informações
          </p>
        </div>

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Cliente
        </Button>
      </div>

      <Separator />

      <div className="flex flex-col md:flex-row gap-4">
        <Card className="md:w-64 flex-shrink-0">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Filtros</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Building2 className="mr-2 h-4 w-4" />
                    Todos os Clientes
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Com Propostas
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <ClipboardCheck className="mr-2 h-4 w-4" />
                    Ativos
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Segmentos</h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    Administração Pública
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    Saúde
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    Educação
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
                placeholder="Buscar por nome ou CNPJ..."
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
                    <TableHead>Nome</TableHead>
                    <TableHead>CNPJ</TableHead>
                    <TableHead>Segmento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Usuários</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground py-6">
                        Nenhum cliente encontrado
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredClients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-taxglider-blue-100 text-taxglider-blue-700 text-xs">
                                {getInitials(client.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{client.name}</p>
                              <p className="text-sm text-muted-foreground">ID: {client.id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{client.cnpj}</TableCell>
                        <TableCell>{client.segment}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                            Ativo
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>3</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant={activeClient?.id === client.id ? "secondary" : "outline"}
                              size="sm"
                              onClick={() => setActiveClient(client)}
                            >
                              {activeClient?.id === client.id ? "Ativo" : "Selecionar"}
                            </Button>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                                <DropdownMenuItem>Editar</DropdownMenuItem>
                                <DropdownMenuItem>Gerenciar Usuários</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
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

export default Clients;
