
import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Bell, 
  Check, 
  Eye, 
  XCircle, 
  Shield, 
  AlertTriangle, 
  Info,
  Clock,
  RefreshCw
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockAlerts = [
  { 
    id: 1, 
    title: 'Tentativas repetidas de login', 
    description: 'Múltiplas tentativas de login para a conta joao.silva@empresa.com.br a partir de um IP desconhecido.',
    timestamp: '2023-07-18 08:15:32',
    type: 'security',
    priority: 'high',
    status: 'new'
  },
  { 
    id: 2, 
    title: 'Novo dispositivo detectado', 
    description: 'Um novo dispositivo foi usado para acessar a conta maria.santos@empresa.com.br.',
    timestamp: '2023-07-18 09:23:45',
    type: 'security',
    priority: 'medium',
    status: 'new'
  },
  { 
    id: 3, 
    title: 'Atualização disponível', 
    description: 'Uma nova atualização do sistema está disponível (v2.5.0).',
    timestamp: '2023-07-18 10:45:12',
    type: 'system',
    priority: 'low',
    status: 'read'
  },
  { 
    id: 4, 
    title: 'Erro de conexão com API externa', 
    description: 'A conexão com o serviço externo de verificação de CNPJ falhou repetidamente.',
    timestamp: '2023-07-18 11:12:33',
    type: 'system',
    priority: 'high',
    status: 'read'
  },
  { 
    id: 5, 
    title: 'Backup automático falhou', 
    description: 'O backup automático agendado para 03:00 falhou. Verifique as configurações de armazenamento.',
    timestamp: '2023-07-18 12:30:18',
    type: 'system',
    priority: 'high',
    status: 'resolved'
  },
];

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'high':
      return <Badge variant="destructive">Alta</Badge>;
    case 'medium':
      return <Badge variant="warning">Média</Badge>;
    case 'low':
      return <Badge variant="secondary">Baixa</Badge>;
    default:
      return <Badge variant="secondary">Baixa</Badge>;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'new':
      return <Badge variant="default">Novo</Badge>;
    case 'read':
      return <Badge variant="secondary">Visto</Badge>;
    case 'resolved':
      return <Badge variant="success">Resolvido</Badge>;
    default:
      return <Badge variant="secondary">Visto</Badge>;
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'security':
      return <Shield className="h-5 w-5 text-red-500" />;
    case 'system':
      return <AlertTriangle className="h-5 w-5 text-amber-500" />;
    default:
      return <Info className="h-5 w-5 text-blue-500" />;
  }
};

const AlertsPage = () => {
  return (
    <AdminLayout 
      title="Alertas do Sistema" 
      description="Monitore e gerencie alertas de segurança e do sistema"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button variant="default">
            <Bell className="mr-2 h-4 w-4" />
            Todos os Alertas
            <Badge variant="secondary" className="ml-2">5</Badge>
          </Button>
          <Button variant="outline">
            <Shield className="mr-2 h-4 w-4" />
            Segurança
            <Badge variant="secondary" className="ml-2">2</Badge>
          </Button>
          <Button variant="outline">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Sistema
            <Badge variant="secondary" className="ml-2">3</Badge>
          </Button>
        </div>
        <Button variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Atualizar
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="unread">Não lidos</TabsTrigger>
          <TabsTrigger value="resolved">Resolvidos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="space-y-4">
            {mockAlerts.map((alert) => (
              <Card key={alert.id} className={alert.status === 'new' ? 'border-l-4 border-l-primary' : ''}>
                <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
                  <div className="mt-1">
                    {getTypeIcon(alert.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{alert.title}</CardTitle>
                      <div className="flex gap-2">
                        {getPriorityBadge(alert.priority)}
                        {getStatusBadge(alert.status)}
                      </div>
                    </div>
                    <CardDescription className="mt-1">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{alert.timestamp}</span>
                      </div>
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{alert.description}</p>
                </CardContent>
                <CardFooter className="flex justify-end gap-2 pt-0">
                  <Button variant="ghost" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    Detalhes
                  </Button>
                  {alert.status !== 'resolved' && (
                    <Button variant="ghost" size="sm">
                      <Check className="mr-2 h-4 w-4" />
                      Marcar como resolvido
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <XCircle className="mr-2 h-4 w-4" />
                    Dispensar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="unread">
          <div className="space-y-4">
            {mockAlerts.filter(a => a.status === 'new').map((alert) => (
              <Card key={alert.id} className="border-l-4 border-l-primary">
                <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
                  <div className="mt-1">
                    {getTypeIcon(alert.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{alert.title}</CardTitle>
                      <div className="flex gap-2">
                        {getPriorityBadge(alert.priority)}
                        {getStatusBadge(alert.status)}
                      </div>
                    </div>
                    <CardDescription className="mt-1">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{alert.timestamp}</span>
                      </div>
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{alert.description}</p>
                </CardContent>
                <CardFooter className="flex justify-end gap-2 pt-0">
                  <Button variant="ghost" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    Detalhes
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Check className="mr-2 h-4 w-4" />
                    Marcar como resolvido
                  </Button>
                  <Button variant="ghost" size="sm">
                    <XCircle className="mr-2 h-4 w-4" />
                    Dispensar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resolved">
          <div className="space-y-4">
            {mockAlerts.filter(a => a.status === 'resolved').map((alert) => (
              <Card key={alert.id}>
                <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
                  <div className="mt-1">
                    {getTypeIcon(alert.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{alert.title}</CardTitle>
                      <div className="flex gap-2">
                        {getPriorityBadge(alert.priority)}
                        {getStatusBadge(alert.status)}
                      </div>
                    </div>
                    <CardDescription className="mt-1">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{alert.timestamp}</span>
                      </div>
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{alert.description}</p>
                </CardContent>
                <CardFooter className="flex justify-end gap-2 pt-0">
                  <Button variant="ghost" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    Detalhes
                  </Button>
                  <Button variant="ghost" size="sm">
                    <XCircle className="mr-2 h-4 w-4" />
                    Dispensar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AlertsPage;
