import React from 'react';
import { BarChart3, Calculator, Users, FileText, ArrowUpRight } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import RecentActivities, { Activity } from '@/components/dashboard/RecentActivities';
import ClientsList from '@/components/dashboard/ClientsList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { 
  Shield, 
  KeyRound, 
  History, 
  HardDrive, 
  Network, 
  Globe, 
  FileEdit, 
  HeartHandshake, 
  HelpCircle,
  Phone,
  Workflow,
  BookOpen,
  BarChart 
} from 'lucide-react';

const MOCK_ACTIVITIES: Activity[] = [
  {
    id: '1',
    title: 'Proposta comercial aprovada',
    description: 'Prefeitura Municipal de São Paulo - Proposta #1234',
    time: 'há 2 horas',
    user: {
      name: 'João Silva',
      role: 'Representante Comercial',
    },
    type: 'success',
  },
  {
    id: '2',
    title: 'Nova análise de crédito iniciada',
    description: 'Hospital Municipal do Rio de Janeiro - Análise #5678',
    time: 'há 5 horas',
    user: {
      name: 'Maria Souza',
      role: 'Analista Fiscal',
    },
    type: 'info',
  },
  {
    id: '3',
    title: 'Alerta de prazo',
    description: 'UFMG - Prazo para compensação expira em 10 dias',
    time: 'há 1 dia',
    user: {
      name: 'Sistema',
      role: 'Automático',
    },
    type: 'warning',
  },
  {
    id: '4',
    title: 'Falha na importação de dados',
    description: 'Secretaria de Infraestrutura de Recife - Arquivo inválido',
    time: 'há 2 dias',
    user: {
      name: 'Carlos Mendes',
      role: 'Analista de Dados',
    },
    type: 'error',
  },
];

const Dashboard = () => {
  const { user, activeClient } = useAuth();

  const renderClientDashboard = () => (
    <div className="space-y-6">
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total de Créditos Recuperados"
          value="R$ 1.245.678,90"
          icon={<BarChart3 className="h-5 w-5" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Créditos em Análise"
          value="R$ 567.890,12"
          icon={<Calculator className="h-5 w-5" />}
          description="21 processos em andamento"
        />
        <StatCard
          title="Economia Fiscal"
          value="R$ 234.567,89"
          icon={<ArrowUpRight className="h-5 w-5" />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Processos Concluídos"
          value="18"
          icon={<FileText className="h-5 w-5" />}
          description="Últimos 12 meses"
        />
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Apuração de Créditos</CardTitle>
            <CardDescription>Últimos 30 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center border border-dashed rounded-md">
              <p className="text-sm text-muted-foreground">Gráfico de apuração de créditos</p>
            </div>
          </CardContent>
        </Card>

        <RecentActivities activities={MOCK_ACTIVITIES.slice(0, 3)} />
      </div>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="space-y-6">
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total de Clientes"
          value="42"
          icon={<Users className="h-5 w-5" />}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Propostas Pendentes"
          value="8"
          icon={<FileText className="h-5 w-5" />}
          description="Aguardando análise"
        />
        <StatCard
          title="Créditos Recuperados"
          value="R$ 4.567.890,12"
          icon={<Calculator className="h-5 w-5" />}
          trend={{ value: 15, isPositive: true }}
        />
        <StatCard
          title="Usuários Ativos"
          value="78"
          icon={<Users className="h-5 w-5" />}
          description="Último mês"
        />
      </div>

      {user?.role === 'admin' && (
        <Card className="p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle>Menu do Administrador</CardTitle>
            <CardDescription>Acesso rápido às funções administrativas</CardDescription>
          </CardHeader>
          <CardContent className="px-0 pt-2 pb-0">
            <NavigationMenu>
              <NavigationMenuList className="flex-wrap gap-1">
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Gestão do Sistema</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] grid-cols-2">
                      <ListItem href="/admin-dashboard" title="Painel de Controle" icon={<BarChart className="h-4 w-4 mr-2" />}>
                        Visão geral de métricas e indicadores
                      </ListItem>
                      <ListItem href="/settings" title="Configurações" icon={<FileEdit className="h-4 w-4 mr-2" />}>
                        Configurações gerais do sistema
                      </ListItem>
                      <ListItem href="/users" title="Usuários" icon={<Users className="h-4 w-4 mr-2" />}>
                        Gerenciamento de usuários e permissões
                      </ListItem>
                      <ListItem href="/workflows" title="Fluxos de Trabalho" icon={<Workflow className="h-4 w-4 mr-2" />}>
                        Configuração de processos automatizados
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Segurança</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] grid-cols-2">
                      <ListItem href="/security" title="Segurança" icon={<Shield className="h-4 w-4 mr-2" />}>
                        Políticas e configurações de segurança
                      </ListItem>
                      <ListItem href="/access-control" title="Controle de Acesso" icon={<KeyRound className="h-4 w-4 mr-2" />}>
                        Gerenciamento de permissões e níveis de acesso
                      </ListItem>
                      <ListItem href="/logs" title="Logs do Sistema" icon={<History className="h-4 w-4 mr-2" />}>
                        Histórico de atividades e auditoria
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Integrações</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] grid-cols-2">
                      <ListItem href="/backup" title="Backup & Restauração" icon={<HardDrive className="h-4 w-4 mr-2" />}>
                        Gerenciamento de backup e restauração de dados
                      </ListItem>
                      <ListItem href="/integrations" title="Integrações" icon={<Network className="h-4 w-4 mr-2" />}>
                        Conexões com serviços externos
                      </ListItem>
                      <ListItem href="/cnpj-integration" title="Integração CNPJ" icon={<FileText className="h-4 w-4 mr-2" />}>
                        Pesquisa e validação de CNPJ
                      </ListItem>
                      <ListItem href="/tax-rates" title="Alíquotas Fiscais" icon={<Calculator className="h-4 w-4 mr-2" />}>
                        Gerenciamento de alíquotas de impostos
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Conteúdo</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] grid-cols-2">
                      <ListItem href="/website" title="Website" icon={<Globe className="h-4 w-4 mr-2" />}>
                        Gestão de conteúdo do website
                      </ListItem>
                      <ListItem href="/content" title="Gerenciar Conteúdo" icon={<FileEdit className="h-4 w-4 mr-2" />}>
                        Criação e edição de conteúdo do portal
                      </ListItem>
                      <ListItem href="/knowledge-base" title="Base de Conhecimento" icon={<BookOpen className="h-4 w-4 mr-2" />}>
                        Documentação e base de conhecimento
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Suporte</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] grid-cols-2">
                      <ListItem href="/support-tickets" title="Tickets de Suporte" icon={<HeartHandshake className="h-4 w-4 mr-2" />}>
                        Gerenciamento de solicitações de suporte
                      </ListItem>
                      <ListItem href="/help" title="Ajuda" icon={<HelpCircle className="h-4 w-4 mr-2" />}>
                        Documentação e recursos de ajuda
                      </ListItem>
                      <ListItem href="/contact" title="Contato" icon={<Phone className="h-4 w-4 mr-2" />}>
                        Informações de contato e suporte
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3">
        <ClientsList className="md:col-span-1" />
        <RecentActivities activities={MOCK_ACTIVITIES} className="md:col-span-2" />
      </div>
    </div>
  );

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            {activeClient ? `Dashboard: ${activeClient.name}` : 'Dashboard'}
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            {activeClient 
              ? `Visão geral dos créditos tributários e processos para ${activeClient.name}`
              : 'Visão geral do sistema e acompanhamento de processos'}
          </p>
        </div>

        {user?.role === 'representative' && (
          <Button asChild className="self-start">
            <Link to="/proposals/new">
              <FileText className="mr-2 h-4 w-4" />
              Nova Proposta
            </Link>
          </Button>
        )}
      </div>

      <Separator />

      <Tabs defaultValue={activeClient ? "client" : "overview"} className="space-y-4 md:space-y-6">
        <TabsList className="w-full max-w-md flex">
          {activeClient && <TabsTrigger value="client" className="flex-1">Cliente Específico</TabsTrigger>}
          <TabsTrigger value="overview" className="flex-1">Visão Geral</TabsTrigger>
        </TabsList>

        {activeClient && (
          <TabsContent value="client" className="space-y-4 md:space-y-6">
            {renderClientDashboard()}
          </TabsContent>
        )}

        <TabsContent value="overview" className="space-y-4 md:space-y-6">
          {renderAdminDashboard()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { 
    title: string;
    icon?: React.ReactNode;
  }
>(({ className, title, icon, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center text-sm font-medium leading-none">
            {icon} {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Dashboard;
