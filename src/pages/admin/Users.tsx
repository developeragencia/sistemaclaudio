
import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Search } from 'lucide-react';

const mockUsers = [
  { id: 1, name: 'João Silva', email: 'joao.silva@empresa.com.br', role: 'admin', status: 'active' },
  { id: 2, name: 'Maria Santos', email: 'maria.santos@empresa.com.br', role: 'user', status: 'active' },
  { id: 3, name: 'Pedro Oliveira', email: 'pedro.oliveira@empresa.com.br', role: 'user', status: 'inactive' },
  { id: 4, name: 'Ana Costa', email: 'ana.costa@empresa.com.br', role: 'user', status: 'active' },
  { id: 5, name: 'Carlos Souza', email: 'carlos.souza@empresa.com.br', role: 'admin', status: 'active' },
];

const UsersPage = () => {
  return (
    <AdminLayout 
      title="Usuários" 
      description="Gerencie os usuários do sistema e suas permissões"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar usuários..."
              className="w-[300px] pl-8"
            />
          </div>
          <Button variant="outline">Filtrar</Button>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Novo Usuário
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Função</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.role === 'admin' ? 'default' : 'outline'}>
                    {user.role === 'admin' ? 'Administrador' : 'Usuário'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.status === 'active' ? 'success' : 'secondary'}>
                    {user.status === 'active' ? 'Ativo' : 'Inativo'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">Editar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default UsersPage;
