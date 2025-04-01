
import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Download, Search, Filter } from 'lucide-react';

const mockLogs = [
  { id: 1, timestamp: '2023-07-18 08:15:32', user: 'joao.silva@empresa.com.br', action: 'LOGIN', description: 'Login bem-sucedido', ip: '192.168.1.10', level: 'info' },
  { id: 2, timestamp: '2023-07-18 09:23:45', user: 'maria.santos@empresa.com.br', action: 'CREATE', description: 'Criação de novo cliente', ip: '192.168.1.15', level: 'info' },
  { id: 3, timestamp: '2023-07-18 10:45:12', user: 'pedro.oliveira@empresa.com.br', action: 'UPDATE', description: 'Atualização de perfil de usuário', ip: '192.168.1.20', level: 'info' },
  { id: 4, timestamp: '2023-07-18 11:12:33', user: 'sistema', action: 'ERROR', description: 'Falha na conexão com a API externa', ip: '192.168.1.1', level: 'error' },
  { id: 5, timestamp: '2023-07-18 12:30:18', user: 'ana.costa@empresa.com.br', action: 'DELETE', description: 'Exclusão de registro', ip: '192.168.1.25', level: 'warning' },
  { id: 6, timestamp: '2023-07-18 13:45:56', user: 'carlos.souza@empresa.com.br', action: 'EXPORT', description: 'Exportação de relatório', ip: '192.168.1.30', level: 'info' },
  { id: 7, timestamp: '2023-07-18 14:20:07', user: 'sistema', action: 'WARNING', description: 'Tentativa de acesso a recurso restrito', ip: '192.168.1.100', level: 'warning' },
  { id: 8, timestamp: '2023-07-18 15:05:41', user: 'joao.silva@empresa.com.br', action: 'LOGOUT', description: 'Logout do sistema', ip: '192.168.1.10', level: 'info' },
];

const getLevelColor = (level: string) => {
  switch (level) {
    case 'error':
      return 'destructive';
    case 'warning':
      return 'warning';
    case 'info':
    default:
      return 'secondary';
  }
};

const LogsPage = () => {
  return (
    <AdminLayout 
      title="Logs do Sistema" 
      description="Monitore todas as atividades e eventos do sistema"
    >
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>
            Refine os logs exibidos por período, tipo e usuário
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium block mb-1">Período</label>
              <Select defaultValue="today">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Hoje</SelectItem>
                  <SelectItem value="yesterday">Ontem</SelectItem>
                  <SelectItem value="week">Últimos 7 dias</SelectItem>
                  <SelectItem value="month">Último mês</SelectItem>
                  <SelectItem value="custom">Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Nível</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o nível" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="info">Informação</SelectItem>
                  <SelectItem value="warning">Alerta</SelectItem>
                  <SelectItem value="error">Erro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Ação</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a ação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="login">Login</SelectItem>
                  <SelectItem value="logout">Logout</SelectItem>
                  <SelectItem value="create">Criação</SelectItem>
                  <SelectItem value="update">Atualização</SelectItem>
                  <SelectItem value="delete">Exclusão</SelectItem>
                  <SelectItem value="export">Exportação</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Buscar</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar nos logs..."
                  className="pl-8"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Aplicar Filtros
            </Button>
            <Button variant="secondary">
              <Download className="mr-2 h-4 w-4" />
              Exportar Logs
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Logs de Atividade</CardTitle>
          <CardDescription>
            Histórico completo de eventos do sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-2 text-left font-medium">Data/Hora</th>
                  <th className="p-2 text-left font-medium">Usuário</th>
                  <th className="p-2 text-left font-medium">Ação</th>
                  <th className="p-2 text-left font-medium">Descrição</th>
                  <th className="p-2 text-left font-medium">IP</th>
                  <th className="p-2 text-left font-medium">Nível</th>
                </tr>
              </thead>
              <tbody>
                {mockLogs.map((log) => (
                  <tr key={log.id} className="border-b">
                    <td className="p-2 text-sm">{log.timestamp}</td>
                    <td className="p-2 text-sm">{log.user}</td>
                    <td className="p-2 text-sm">{log.action}</td>
                    <td className="p-2 text-sm">{log.description}</td>
                    <td className="p-2 text-sm">{log.ip}</td>
                    <td className="p-2 text-sm">
                      <Badge variant={getLevelColor(log.level)}>
                        {log.level.charAt(0).toUpperCase() + log.level.slice(1)}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Exibindo 8 de 428 logs
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">Anterior</Button>
              <Button variant="outline" size="sm">Próximo</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default LogsPage;
