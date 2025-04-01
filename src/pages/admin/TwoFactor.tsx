
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
import { Smartphone, Mail, Key, MessageSquare } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const TwoFactorPage = () => {
  return (
    <AdminLayout 
      title="Autenticação de Dois Fatores" 
      description="Configure as opções de autenticação de dois fatores para o sistema"
    >
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
            <CardDescription>
              Status atual da autenticação de dois fatores no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Autenticação de dois fatores</h3>
                <p className="text-sm text-muted-foreground">
                  Quando habilitada, os usuários precisarão fornecer uma verificação adicional ao fazer login
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="2fa-status" />
                <label htmlFor="2fa-status" className="text-sm text-muted-foreground">
                  Desabilitado
                </label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="methods">
        <TabsList className="mb-4">
          <TabsTrigger value="methods">Métodos</TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="methods">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-start space-y-0">
                <div className="flex-1">
                  <div className="flex items-center">
                    <Smartphone className="mr-2 h-5 w-5" />
                    <CardTitle>Aplicativo Autenticador</CardTitle>
                  </div>
                  <CardDescription>
                    Google Authenticator, Microsoft Authenticator, etc.
                  </CardDescription>
                </div>
                <Badge variant="success">Recomendado</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm">
                    Permite que os usuários usem aplicativos de autenticação instalados em seus dispositivos móveis para gerar códigos de verificação temporários.
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Status</p>
                    <div className="flex items-center space-x-2">
                      <Switch id="app-auth" defaultChecked />
                      <label htmlFor="app-auth" className="text-sm text-muted-foreground">
                        Habilitado
                      </label>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">Configurar</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-start space-y-0">
                <div className="flex-1">
                  <div className="flex items-center">
                    <Mail className="mr-2 h-5 w-5" />
                    <CardTitle>Email</CardTitle>
                  </div>
                  <CardDescription>
                    Verificação por email
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm">
                    Envia um código de verificação temporário para o endereço de email registrado do usuário.
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Status</p>
                    <div className="flex items-center space-x-2">
                      <Switch id="email-auth" defaultChecked />
                      <label htmlFor="email-auth" className="text-sm text-muted-foreground">
                        Habilitado
                      </label>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">Configurar</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-start space-y-0">
                <div className="flex-1">
                  <div className="flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    <CardTitle>SMS</CardTitle>
                  </div>
                  <CardDescription>
                    Verificação por SMS
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm">
                    Envia um código de verificação temporário por SMS para o número de celular registrado do usuário.
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Status</p>
                    <div className="flex items-center space-x-2">
                      <Switch id="sms-auth" />
                      <label htmlFor="sms-auth" className="text-sm text-muted-foreground">
                        Desabilitado
                      </label>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">Configurar</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-start space-y-0">
                <div className="flex-1">
                  <div className="flex items-center">
                    <Key className="mr-2 h-5 w-5" />
                    <CardTitle>Chave de Segurança</CardTitle>
                  </div>
                  <CardDescription>
                    Verificação com dispositivo físico
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm">
                    Permite o uso de chaves de segurança físicas como YubiKey ou chaves FIDO2 para autenticação.
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Status</p>
                    <div className="flex items-center space-x-2">
                      <Switch id="key-auth" />
                      <label htmlFor="key-auth" className="text-sm text-muted-foreground">
                        Desabilitado
                      </label>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">Configurar</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Status por Usuário</CardTitle>
              <CardDescription>
                Visualize quais usuários têm 2FA configurado e por qual método
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2 text-left font-medium">Usuário</th>
                      <th className="p-2 text-left font-medium">Email</th>
                      <th className="p-2 text-left font-medium">Status 2FA</th>
                      <th className="p-2 text-left font-medium">Método</th>
                      <th className="p-2 text-left font-medium">Última verificação</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">João Silva</td>
                      <td className="p-2">joao.silva@empresa.com.br</td>
                      <td className="p-2"><Badge variant="success">Ativo</Badge></td>
                      <td className="p-2">Aplicativo</td>
                      <td className="p-2">Hoje, 08:15</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Maria Santos</td>
                      <td className="p-2">maria.santos@empresa.com.br</td>
                      <td className="p-2"><Badge variant="success">Ativo</Badge></td>
                      <td className="p-2">Email</td>
                      <td className="p-2">Ontem, 15:30</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Pedro Oliveira</td>
                      <td className="p-2">pedro.oliveira@empresa.com.br</td>
                      <td className="p-2"><Badge variant="destructive">Inativo</Badge></td>
                      <td className="p-2">-</td>
                      <td className="p-2">-</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Ana Costa</td>
                      <td className="p-2">ana.costa@empresa.com.br</td>
                      <td className="p-2"><Badge variant="success">Ativo</Badge></td>
                      <td className="p-2">Aplicativo, Email</td>
                      <td className="p-2">Hoje, 10:42</td>
                    </tr>
                    <tr>
                      <td className="p-2">Carlos Souza</td>
                      <td className="p-2">carlos.souza@empresa.com.br</td>
                      <td className="p-2"><Badge variant="success">Ativo</Badge></td>
                      <td className="p-2">Chave de Segurança</td>
                      <td className="p-2">Hoje, 09:17</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>Logs de Autenticação</CardTitle>
              <CardDescription>
                Histórico de autenticações de dois fatores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2 text-left font-medium">Data/Hora</th>
                      <th className="p-2 text-left font-medium">Usuário</th>
                      <th className="p-2 text-left font-medium">Método</th>
                      <th className="p-2 text-left font-medium">Status</th>
                      <th className="p-2 text-left font-medium">IP</th>
                      <th className="p-2 text-left font-medium">Dispositivo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(5)].map((_, i) => (
                      <tr key={i} className="border-b">
                        <td className="p-2">{`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`}</td>
                        <td className="p-2">{["João Silva", "Maria Santos", "Ana Costa", "Carlos Souza"][i % 4]}</td>
                        <td className="p-2">{["Aplicativo", "Email", "Aplicativo", "Chave de Segurança", "Email"][i]}</td>
                        <td className="p-2">
                          <Badge variant={i !== 2 ? "success" : "destructive"}>
                            {i !== 2 ? "Sucesso" : "Falha"}
                          </Badge>
                        </td>
                        <td className="p-2">{`192.168.1.${10 + i}`}</td>
                        <td className="p-2">{["Chrome / Windows", "Safari / Mac", "Firefox / Linux", "Edge / Windows", "Chrome / Android"][i]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default TwoFactorPage;
