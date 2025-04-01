
import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const roles = [
  { id: 1, name: 'Administrador', description: 'Acesso completo ao sistema', usersCount: 5 },
  { id: 2, name: 'Gerente', description: 'Acesso à maioria das funções, sem permissões administrativas', usersCount: 8 },
  { id: 3, name: 'Analista', description: 'Acesso a funções de análise e auditoria', usersCount: 12 },
  { id: 4, name: 'Operador', description: 'Acesso básico para operações diárias', usersCount: 25 },
];

const permissions = [
  { id: 1, name: 'Visualizar Usuários', category: 'Usuários' },
  { id: 2, name: 'Criar Usuários', category: 'Usuários' },
  { id: 3, name: 'Editar Usuários', category: 'Usuários' },
  { id: 4, name: 'Excluir Usuários', category: 'Usuários' },
  { id: 5, name: 'Gerenciar Permissões', category: 'Administração' },
  { id: 6, name: 'Configurações do Sistema', category: 'Administração' },
  { id: 7, name: 'Visualizar Relatórios', category: 'Relatórios' },
  { id: 8, name: 'Exportar Relatórios', category: 'Relatórios' },
  { id: 9, name: 'Realizar Auditorias', category: 'Auditoria' },
  { id: 10, name: 'Visualizar Auditorias', category: 'Auditoria' },
];

const AccessControlPage = () => {
  return (
    <AdminLayout 
      title="Controle de Acesso" 
      description="Gerencie funções e permissões do sistema"
    >
      <Tabs defaultValue="roles">
        <TabsList className="mb-4">
          <TabsTrigger value="roles">Funções</TabsTrigger>
          <TabsTrigger value="permissions">Permissões</TabsTrigger>
        </TabsList>
        
        <TabsContent value="roles">
          <Card>
            <CardHeader>
              <CardTitle>Funções do Sistema</CardTitle>
              <CardDescription>
                Gerencie as funções disponíveis e seus níveis de acesso
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Função</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Usuários</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell className="font-medium">{role.name}</TableCell>
                      <TableCell>{role.description}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{role.usersCount}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="success">Ativo</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Switch id={`role-${role.id}`} defaultChecked={role.id !== 4} />
                          <label htmlFor={`role-${role.id}`} className="text-sm text-muted-foreground">
                            {role.id !== 4 ? 'Ativo' : 'Inativo'}
                          </label>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="permissions">
          <Card>
            <CardHeader>
              <CardTitle>Matriz de Permissões</CardTitle>
              <CardDescription>
                Configure as permissões para cada função do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Permissão</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Administrador</TableHead>
                      <TableHead>Gerente</TableHead>
                      <TableHead>Analista</TableHead>
                      <TableHead>Operador</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {permissions.map((permission) => (
                      <TableRow key={permission.id}>
                        <TableCell className="font-medium">{permission.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{permission.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Switch defaultChecked />
                        </TableCell>
                        <TableCell>
                          <Switch defaultChecked={
                            !['Excluir Usuários', 'Gerenciar Permissões', 'Configurações do Sistema'].includes(permission.name)
                          } />
                        </TableCell>
                        <TableCell>
                          <Switch defaultChecked={
                            ['Visualizar Usuários', 'Visualizar Relatórios', 'Visualizar Auditorias', 'Realizar Auditorias'].includes(permission.name)
                          } />
                        </TableCell>
                        <TableCell>
                          <Switch defaultChecked={
                            ['Visualizar Usuários', 'Visualizar Relatórios'].includes(permission.name)
                          } />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AccessControlPage;
