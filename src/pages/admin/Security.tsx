
import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Shield, Lock, Eye, Bell, RefreshCw } from 'lucide-react';

const SecurityPage = () => {
  return (
    <AdminLayout 
      title="Segurança" 
      description="Configure as políticas de segurança do sistema"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle className="flex items-center">
                <Lock className="mr-2 h-5 w-5" />
                Política de Senhas
              </CardTitle>
              <CardDescription>
                Configure os requisitos para senhas de usuários
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Tamanho mínimo (8 caracteres)</p>
                  <p className="text-sm text-muted-foreground">Exige pelo menos 8 caracteres</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Caracteres especiais</p>
                  <p className="text-sm text-muted-foreground">Exige pelo menos 1 caractere especial</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Maiúsculas e minúsculas</p>
                  <p className="text-sm text-muted-foreground">Exige ambos os tipos de letras</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Números</p>
                  <p className="text-sm text-muted-foreground">Exige pelo menos 1 número</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Expiração de senha (90 dias)</p>
                  <p className="text-sm text-muted-foreground">Força a troca após 90 dias</p>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Autenticação
              </CardTitle>
              <CardDescription>
                Configure as opções de autenticação do sistema
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Bloqueio após tentativas</p>
                  <p className="text-sm text-muted-foreground">Bloqueia após 5 tentativas falhas</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Autenticação de dois fatores</p>
                  <p className="text-sm text-muted-foreground">Habilita 2FA para todos os usuários</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Sessão persistente</p>
                  <p className="text-sm text-muted-foreground">Mantém sessão em dispositivos confiáveis</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Tempo de inatividade (30 min)</p>
                  <p className="text-sm text-muted-foreground">Desconecta após 30 min sem atividade</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle className="flex items-center">
                <Eye className="mr-2 h-5 w-5" />
                Auditoria
              </CardTitle>
              <CardDescription>
                Configure o sistema de logs e auditoria
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Log de login</p>
                  <p className="text-sm text-muted-foreground">Registra todas as tentativas de login</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auditoria de dados</p>
                  <p className="text-sm text-muted-foreground">Registra todas as alterações de dados</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Atividades administrativas</p>
                  <p className="text-sm text-muted-foreground">Registra ações de administradores</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button variant="outline" className="w-full mt-2">
                <RefreshCw className="mr-2 h-4 w-4" />
                Exportar Logs
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Alertas de Segurança
              </CardTitle>
              <CardDescription>
                Configure alertas para eventos de segurança
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Tentativas de login suspeitas</p>
                  <p className="text-sm text-muted-foreground">Alerta sobre múltiplos logins falhos</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Alterações importantes</p>
                  <p className="text-sm text-muted-foreground">Alerta sobre mudanças críticas no sistema</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Novos dispositivos</p>
                  <p className="text-sm text-muted-foreground">Alerta sobre logins em novos dispositivos</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email de notificação</p>
                  <p className="text-sm text-muted-foreground">Envia alertas por email</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default SecurityPage;
