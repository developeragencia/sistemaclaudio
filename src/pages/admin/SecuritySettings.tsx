
import React, { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Shield, 
  LogOut, 
  UserX, 
  Bell, 
  Clock, 
  Key, 
  Lock, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  User, 
  RefreshCw 
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

// Mock data para logs de auditoria
const MOCK_AUDIT_LOGS = [
  {
    id: '1',
    user: 'Admin Master',
    action: 'Login',
    resource: 'Sistema',
    details: 'Login bem-sucedido',
    ip: '192.168.1.1',
    date: '2023-06-10T14:30:00Z',
    status: 'success',
  },
  {
    id: '2',
    user: 'Maria Santos',
    action: 'Edição',
    resource: 'Cliente',
    details: 'Atualização de dados do cliente ID 3',
    ip: '192.168.1.45',
    date: '2023-06-10T13:15:00Z',
    status: 'success',
  },
  {
    id: '3',
    user: 'João Silva',
    action: 'Tentativa de Login',
    resource: 'Sistema',
    details: 'Senha incorreta (3ª tentativa)',
    ip: '200.158.10.32',
    date: '2023-06-10T12:45:00Z',
    status: 'failed',
  },
  {
    id: '4',
    user: 'Pedro Oliveira',
    action: 'Exportação',
    resource: 'Relatórios',
    details: 'Exportação de relatório fiscal',
    ip: '192.168.2.15',
    date: '2023-06-10T11:20:00Z',
    status: 'success',
  },
  {
    id: '5',
    user: 'Ana Costa',
    action: 'Acesso não autorizado',
    resource: 'Módulo Administrativo',
    details: 'Tentativa de acesso a área restrita',
    ip: '192.168.1.87',
    date: '2023-06-10T10:05:00Z',
    status: 'warning',
  },
];

// Mock data para sessões ativas
const MOCK_ACTIVE_SESSIONS = [
  {
    id: '1',
    user: 'Admin Master',
    device: 'Windows / Chrome',
    ip: '192.168.1.1',
    startTime: '2023-06-10T14:30:00Z',
    lastActivity: '2023-06-10T15:45:00Z',
    status: 'active',
  },
  {
    id: '2',
    user: 'Maria Santos',
    device: 'macOS / Safari',
    ip: '192.168.1.45',
    startTime: '2023-06-10T13:15:00Z',
    lastActivity: '2023-06-10T15:40:00Z',
    status: 'active',
  },
  {
    id: '3',
    user: 'Pedro Oliveira',
    device: 'Android / Chrome Mobile',
    ip: '192.168.2.15',
    startTime: '2023-06-10T11:20:00Z',
    lastActivity: '2023-06-10T15:30:00Z',
    status: 'idle',
  },
];

// Mock data para alertas de segurança
const MOCK_SECURITY_ALERTS = [
  {
    id: '1',
    type: 'login_attempt',
    user: 'João Silva',
    details: 'Múltiplas tentativas de login malsucedidas',
    date: '2023-06-10T12:45:00Z',
    status: 'high',
  },
  {
    id: '2',
    type: 'unusual_location',
    user: 'Maria Santos',
    details: 'Login de localização incomum (São Paulo - SP)',
    date: '2023-06-09T18:30:00Z',
    status: 'medium',
  },
  {
    id: '3',
    type: 'access_denied',
    user: 'Ana Costa',
    details: 'Tentativa de acesso a área administrativa restrita',
    date: '2023-06-10T10:05:00Z',
    status: 'low',
  },
];

const SecuritySettings = () => {
  const { user } = useAuth();
  
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [passwordPolicy, setPasswordPolicy] = useState({
    minLength: true,
    requireNumbers: true,
    requireSpecialChars: true,
    requireUppercase: true,
    preventReuse: true,
    expirationDays: '90',
  });
  const [loginAttempts, setLoginAttempts] = useState('5');
  const [ipRestrictions, setIpRestrictions] = useState('');
  const [alertSettings, setAlertSettings] = useState({
    failedLogins: true,
    unusualLocations: true,
    adminActions: true,
    userCreation: true,
  });
  
  const handleSaveSettings = () => {
    toast({
      title: 'Configurações salvas',
      description: 'As configurações de segurança foram atualizadas com sucesso.',
    });
  };
  
  const handleLogoutSession = (sessionId: string) => {
    toast({
      title: 'Sessão encerrada',
      description: `A sessão ID ${sessionId} foi encerrada com sucesso.`,
    });
  };
  
  const handleLogoutAllSessions = () => {
    toast({
      title: 'Todas as sessões foram encerradas',
      description: 'Todas as sessões, exceto a atual, foram encerradas.',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge variant="success">Sucesso</Badge>;
      case 'failed':
        return <Badge variant="destructive">Falha</Badge>;
      case 'warning':
        return <Badge variant="warning">Alerta</Badge>;
      case 'active':
        return <Badge variant="success">Ativa</Badge>;
      case 'idle':
        return <Badge variant="secondary">Inativa</Badge>;
      case 'high':
        return <Badge variant="destructive">Alto</Badge>;
      case 'medium':
        return <Badge variant="warning">Médio</Badge>;
      case 'low':
        return <Badge variant="outline">Baixo</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR');
  };

  return (
    <AdminLayout
      title="Segurança e Auditoria"
      description="Configure as políticas de segurança e visualize os logs de auditoria"
    >
      <Tabs defaultValue="settings" className="space-y-6">
        <TabsList className="grid grid-cols-4 md:w-[600px]">
          <TabsTrigger value="settings">Configurações</TabsTrigger>
          <TabsTrigger value="sessions">Sessões Ativas</TabsTrigger>
          <TabsTrigger value="alerts">Alertas</TabsTrigger>
          <TabsTrigger value="audit">Auditoria</TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" /> Autenticação em Duas Etapas (2FA)
              </CardTitle>
              <CardDescription>
                Adicione uma camada extra de segurança exigindo verificação adicional durante o login
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="two-factor" className="flex flex-col space-y-1">
                  <span>Ativar 2FA para todos os administradores</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Exige autenticação de dois fatores para todas as contas administrativas
                  </span>
                </Label>
                <Switch
                  id="two-factor"
                  checked={twoFactorEnabled}
                  onCheckedChange={setTwoFactorEnabled}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Tempo máximo de sessão (em minutos)</Label>
                <Input
                  id="session-timeout"
                  type="number"
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(e.target.value)}
                  min="5"
                  max="240"
                />
                <p className="text-xs text-muted-foreground">
                  Após este período de inatividade, o usuário será desconectado automaticamente
                </p>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <Label>Política de Senhas</Label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="min-length"
                        checked={passwordPolicy.minLength}
                        onCheckedChange={(checked) => 
                          setPasswordPolicy({...passwordPolicy, minLength: checked})
                        }
                      />
                      <Label htmlFor="min-length">Mínimo de 8 caracteres</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="require-numbers"
                        checked={passwordPolicy.requireNumbers}
                        onCheckedChange={(checked) => 
                          setPasswordPolicy({...passwordPolicy, requireNumbers: checked})
                        }
                      />
                      <Label htmlFor="require-numbers">Exigir números</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="require-special"
                        checked={passwordPolicy.requireSpecialChars}
                        onCheckedChange={(checked) => 
                          setPasswordPolicy({...passwordPolicy, requireSpecialChars: checked})
                        }
                      />
                      <Label htmlFor="require-special">Exigir caracteres especiais</Label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="require-uppercase"
                        checked={passwordPolicy.requireUppercase}
                        onCheckedChange={(checked) => 
                          setPasswordPolicy({...passwordPolicy, requireUppercase: checked})
                        }
                      />
                      <Label htmlFor="require-uppercase">Exigir letras maiúsculas</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="prevent-reuse"
                        checked={passwordPolicy.preventReuse}
                        onCheckedChange={(checked) => 
                          setPasswordPolicy({...passwordPolicy, preventReuse: checked})
                        }
                      />
                      <Label htmlFor="prevent-reuse">Impedir reutilização das 5 últimas senhas</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="expiration-days" className="min-w-[180px]">Expiração da senha (dias)</Label>
                      <Input
                        id="expiration-days"
                        type="number"
                        value={passwordPolicy.expirationDays}
                        onChange={(e) => 
                          setPasswordPolicy({...passwordPolicy, expirationDays: e.target.value})
                        }
                        min="0"
                        max="365"
                        className="max-w-[100px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="login-attempts">Tentativas de login antes do bloqueio</Label>
                <Input
                  id="login-attempts"
                  type="number"
                  value={loginAttempts}
                  onChange={(e) => setLoginAttempts(e.target.value)}
                  min="1"
                  max="10"
                />
                <p className="text-xs text-muted-foreground">
                  A conta será bloqueada após este número de tentativas de login malsucedidas
                </p>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="ip-restrictions">Restrições de IP (opcional)</Label>
                <Input
                  id="ip-restrictions"
                  placeholder="192.168.1.0/24, 10.0.0.0/8"
                  value={ipRestrictions}
                  onChange={(e) => setIpRestrictions(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Limite o acesso a intervalos de IP específicos (separados por vírgula, formato CIDR)
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>Salvar Configurações</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" /> Configurações de Alertas
              </CardTitle>
              <CardDescription>
                Configure notificações automáticas para eventos de segurança importantes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="alert-logins" className="flex flex-col space-y-1">
                  <span>Alertar sobre tentativas de login malsucedidas</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Notificar administradores sobre tentativas de login suspeitas
                  </span>
                </Label>
                <Switch
                  id="alert-logins"
                  checked={alertSettings.failedLogins}
                  onCheckedChange={(checked) => 
                    setAlertSettings({...alertSettings, failedLogins: checked})
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="alert-locations" className="flex flex-col space-y-1">
                  <span>Alertar sobre logins de localizações incomuns</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Notificar quando um usuário fizer login de um local ou dispositivo não reconhecido
                  </span>
                </Label>
                <Switch
                  id="alert-locations"
                  checked={alertSettings.unusualLocations}
                  onCheckedChange={(checked) => 
                    setAlertSettings({...alertSettings, unusualLocations: checked})
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="alert-admin" className="flex flex-col space-y-1">
                  <span>Alertar sobre ações administrativas críticas</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Notificar sobre alterações em configurações de segurança ou permissões
                  </span>
                </Label>
                <Switch
                  id="alert-admin"
                  checked={alertSettings.adminActions}
                  onCheckedChange={(checked) => 
                    setAlertSettings({...alertSettings, adminActions: checked})
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="alert-users" className="flex flex-col space-y-1">
                  <span>Alertar sobre criação/modificação de usuários</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Notificar quando novos usuários forem criados ou modificados
                  </span>
                </Label>
                <Switch
                  id="alert-users"
                  checked={alertSettings.userCreation}
                  onCheckedChange={(checked) => 
                    setAlertSettings({...alertSettings, userCreation: checked})
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>Salvar Configurações</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="sessions" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Sessões Ativas</CardTitle>
                <CardDescription>
                  Gerencie as sessões ativas em todos os dispositivos
                </CardDescription>
              </div>
              <Button variant="destructive" onClick={handleLogoutAllSessions}>
                <LogOut className="h-4 w-4 mr-2" />
                Encerrar Todas
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Dispositivo</TableHead>
                    <TableHead>Endereço IP</TableHead>
                    <TableHead>Início</TableHead>
                    <TableHead>Última Atividade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_ACTIVE_SESSIONS.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell>{session.user}</TableCell>
                      <TableCell>{session.device}</TableCell>
                      <TableCell>{session.ip}</TableCell>
                      <TableCell>{formatDate(session.startTime)}</TableCell>
                      <TableCell>{formatDate(session.lastActivity)}</TableCell>
                      <TableCell>{getStatusBadge(session.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleLogoutSession(session.id)}
                        >
                          <UserX className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Sessão</CardTitle>
              <CardDescription>
                Configure o comportamento das sessões de usuário
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="session-timeout-config">Tempo máximo de sessão (em minutos)</Label>
                <div className="flex gap-2">
                  <Input
                    id="session-timeout-config"
                    type="number"
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(e.target.value)}
                    min="5"
                    max="240"
                  />
                  <Button onClick={handleSaveSettings}>Salvar</Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Após este período de inatividade, o usuário será desconectado automaticamente
                </p>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="single-session" className="flex flex-col space-y-1">
                  <span>Permitir apenas uma sessão ativa por usuário</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Ao habilitar, um novo login encerrará qualquer sessão existente do mesmo usuário
                  </span>
                </Label>
                <Switch id="single-session" />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="remember-devices" className="flex flex-col space-y-1">
                  <span>Lembrar dispositivos confiáveis</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Permite que usuários marquem dispositivos como confiáveis para facilitar futuros logins
                  </span>
                </Label>
                <Switch id="remember-devices" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Alertas de Segurança</CardTitle>
                <CardDescription>
                  Alertas recentes relacionados à segurança do sistema
                </CardDescription>
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="high">Alta Prioridade</SelectItem>
                  <SelectItem value="medium">Média Prioridade</SelectItem>
                  <SelectItem value="low">Baixa Prioridade</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Detalhes</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Prioridade</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_SECURITY_ALERTS.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell>
                        {alert.type === 'login_attempt' && <Key className="h-4 w-4 inline mr-1" />}
                        {alert.type === 'unusual_location' && <Globe className="h-4 w-4 inline mr-1" />}
                        {alert.type === 'access_denied' && <Lock className="h-4 w-4 inline mr-1" />}
                        {
                          alert.type === 'login_attempt' ? 'Tentativa de Login' :
                          alert.type === 'unusual_location' ? 'Localização Incomum' :
                          alert.type === 'access_denied' ? 'Acesso Negado' : 
                          alert.type
                        }
                      </TableCell>
                      <TableCell>{alert.user}</TableCell>
                      <TableCell>{alert.details}</TableCell>
                      <TableCell>{formatDate(alert.date)}</TableCell>
                      <TableCell>{getStatusBadge(alert.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Alertas</CardTitle>
              <CardDescription>
                Configure as notificações de segurança
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipos de Alertas</Label>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="alert-logins-config"
                      checked={alertSettings.failedLogins}
                      onCheckedChange={(checked) => 
                        setAlertSettings({...alertSettings, failedLogins: checked})
                      }
                    />
                    <Label htmlFor="alert-logins-config">Tentativas de login malsucedidas</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="alert-locations-config"
                      checked={alertSettings.unusualLocations}
                      onCheckedChange={(checked) => 
                        setAlertSettings({...alertSettings, unusualLocations: checked})
                      }
                    />
                    <Label htmlFor="alert-locations-config">Logins de localizações incomuns</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="alert-admin-config"
                      checked={alertSettings.adminActions}
                      onCheckedChange={(checked) => 
                        setAlertSettings({...alertSettings, adminActions: checked})
                      }
                    />
                    <Label htmlFor="alert-admin-config">Ações administrativas críticas</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="alert-users-config"
                      checked={alertSettings.userCreation}
                      onCheckedChange={(checked) => 
                        setAlertSettings({...alertSettings, userCreation: checked})
                      }
                    />
                    <Label htmlFor="alert-users-config">Criação/modificação de usuários</Label>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Canais de Notificação</Label>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="notify-email" defaultChecked />
                    <Label htmlFor="notify-email">Email</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="notify-sms" />
                    <Label htmlFor="notify-sms">SMS</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="notify-dashboard" defaultChecked />
                    <Label htmlFor="notify-dashboard">Painel do Sistema</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="notify-webhook" />
                    <Label htmlFor="notify-webhook">Webhook</Label>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="email-recipients">Destinatários de Email</Label>
                <Input
                  id="email-recipients"
                  placeholder="admin@exemplo.com, seguranca@exemplo.com"
                />
                <p className="text-xs text-muted-foreground">
                  Informe os emails que receberão notificações de segurança (separados por vírgula)
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>Salvar Configurações</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Logs de Auditoria</CardTitle>
                <CardDescription>
                  Registros detalhados de ações realizadas no sistema
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrar por ação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as Ações</SelectItem>
                    <SelectItem value="login">Login</SelectItem>
                    <SelectItem value="edit">Edição</SelectItem>
                    <SelectItem value="delete">Exclusão</SelectItem>
                    <SelectItem value="export">Exportação</SelectItem>
                    <SelectItem value="access">Acesso</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <FileDown className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Ação</TableHead>
                    <TableHead>Recurso</TableHead>
                    <TableHead>Detalhes</TableHead>
                    <TableHead>IP</TableHead>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_AUDIT_LOGS.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{log.resource}</TableCell>
                      <TableCell>{log.details}</TableCell>
                      <TableCell>{log.ip}</TableCell>
                      <TableCell>{formatDate(log.date)}</TableCell>
                      <TableCell>{getStatusBadge(log.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Auditoria</CardTitle>
              <CardDescription>
                Configure a trilha de auditoria do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Eventos a Registrar</Label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="audit-login" defaultChecked />
                      <Label htmlFor="audit-login">Login e autenticação</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="audit-data" defaultChecked />
                      <Label htmlFor="audit-data">Modificações de dados</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="audit-export" defaultChecked />
                      <Label htmlFor="audit-export">Exportação de dados</Label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="audit-settings" defaultChecked />
                      <Label htmlFor="audit-settings">Alterações de configurações</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="audit-access" defaultChecked />
                      <Label htmlFor="audit-access">Acessos a recursos protegidos</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="audit-user-mgmt" defaultChecked />
                      <Label htmlFor="audit-user-mgmt">Gestão de usuários</Label>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="retention-period">Período de Retenção dos Logs (dias)</Label>
                <Input
                  id="retention-period"
                  type="number"
                  defaultValue="365"
                  min="30"
                  max="3650"
                />
                <p className="text-xs text-muted-foreground">
                  Período em que os logs de auditoria serão armazenados antes da exclusão automática
                </p>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="tamper-protection" className="flex flex-col space-y-1">
                  <span>Proteção contra adulteração</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Protege os logs de auditoria contra exclusão ou modificação não autorizada
                  </span>
                </Label>
                <Switch id="tamper-protection" defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="admin-auditing" className="flex flex-col space-y-1">
                  <span>Auditoria forçada para administradores</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Garante que todas as ações de administradores sejam sempre registradas
                  </span>
                </Label>
                <Switch id="admin-auditing" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>Salvar Configurações</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

// Para renderizar o componente Globe no escopo correto
const Globe = (props: any) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
};

export default SecuritySettings;
