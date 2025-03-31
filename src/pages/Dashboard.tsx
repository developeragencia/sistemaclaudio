import React from 'react';
import { 
  BarChart, 
  Calculator, 
  Users, 
  FileText, 
  ArrowUpRight, 
  ListChecks, 
  ArrowLeftRight, 
  LayoutDashboard, 
  ClipboardCheck, 
  FileEdit, 
  Scan,
  Eye,
  Receipt,
  ArrowUp,
  FileCheck,
  Building2,
  UserCog,
  Lock,
  Shield,
  AlertTriangle,
  Database,
  FileBarChart,
  TrendingUp,
  Zap,
  MonitorSmartphone,
  Search
} from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import RecentActivities from '@/components/dashboard/RecentActivities';
import ClientsList from '@/components/dashboard/ClientsList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";

const MOCK_ACTIVITIES = [
  {
    id: '1',
    title: 'Proposta comercial aprovada',
    description: 'Prefeitura Municipal de São Paulo - Proposta #1234',
    time: 'há 2 horas',
    user: {
      name: 'João Silva',
      role: 'Representante Comercial',
    },
    type: 'success' as const,
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
    type: 'info' as const,
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
    type: 'warning' as const,
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
    type: 'error' as const,
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
          icon={<BarChart className="h-5 w-5" />}
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
            <CardTitle className="text-2xl">Módulos Principais</CardTitle>
            <CardDescription>Acesso rápido às funcionalidades do sistema</CardDescription>
          </CardHeader>
          <CardContent className="px-0 pt-2 pb-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <ModuleCard 
                title="Controle de Clientes"
                description="Gestão completa de clientes e usuários ativos por CNPJ"
                icon={<Building2 size={24} />}
                href="/client-management"
                color="bg-gradient-to-br from-blue-500 to-blue-700"
              />

              <ModuleCard 
                title="Propostas Comerciais" 
                description="Gerenciamento de propostas e contratos"
                icon={<FileText size={24} />}
                href="/commercial-proposals"
                color="bg-gradient-to-br from-indigo-500 to-indigo-700"
              />

              <ModuleCard 
                title="Identificação de Créditos"
                description="Análise automática de créditos tributários"
                icon={<Search size={24} />}
                href="/credit-identification"
                color="bg-gradient-to-br from-emerald-500 to-emerald-700"
              />

              <ModuleCard 
                title="Importação de Dados"
                description="Processamento inteligente de dados"
                icon={<Database size={24} />}
                href="/data-import"
                color="bg-gradient-to-br from-amber-500 to-amber-700"
              />

              <ModuleCard 
                title="Calculadora Avançada"
                description="Cálculos precisos de impostos e retenções"
                icon={<Calculator size={24} />}
                href="/advanced-calculator"
                color="bg-gradient-to-br from-purple-500 to-purple-700"
              />

              <ModuleCard 
                title="Cálculos IRRF"
                description="Automação de cálculos de retenção"
                icon={<Receipt size={24} />}
                href="/irrf-calculations"
                color="bg-gradient-to-br from-cyan-500 to-cyan-700"
              />

              <ModuleCard 
                title="Recuperação IRRF/PJ"
                description="Gestão de recuperação de impostos retidos"
                icon={<ArrowUp size={24} />}
                href="/irrf-recovery"
                color="bg-gradient-to-br from-pink-500 to-pink-700"
              />

              <ModuleCard 
                title="Auditoria de Retenções"
                description="Verificação detalhada das retenções"
                icon={<Scan size={24} />}
                href="/audit-management"
                color="bg-gradient-to-br from-red-500 to-red-700"
              />

              <ModuleCard 
                title="Correção Monetária"
                description="Atualização automática pela taxa Selic"
                icon={<TrendingUp size={24} />}
                href="/monetary-correction"
                color="bg-gradient-to-br from-orange-500 to-orange-700"
              />

              <ModuleCard 
                title="Relatórios Detalhados"
                description="Geração de relatórios e dossiês tributários"
                icon={<ListChecks size={24} />}
                href="/detailed-reports"
                color="bg-gradient-to-br from-green-500 to-green-700"
              />

              <ModuleCard 
                title="Compensação Tributária"
                description="Simulação e execução de compensações"
                icon={<ArrowLeftRight size={24} />}
                href="/tax-compensation"
                color="bg-gradient-to-br from-teal-500 to-teal-700"
              />

              <ModuleCard 
                title="Dashboard Interativo"
                description="Visualização analítica de dados"
                icon={<LayoutDashboard size={24} />}
                href="/interactive-dashboard"
                color="bg-gradient-to-br from-violet-500 to-violet-700"
              />

              <ModuleCard 
                title="Segurança e Auditoria"
                description="Controle de acessos e trilhas de auditoria"
                icon={<Shield size={24} />}
                href="/security"
                color="bg-gradient-to-br from-rose-500 to-rose-700"
              />

              <ModuleCard 
                title="Comprovantes de Retenção"
                description="Emissão e controle de comprovantes"
                icon={<ClipboardCheck size={24} />}
                href="/retention-receipts"
                color="bg-gradient-to-br from-sky-500 to-sky-700"
              />

              <ModuleCard 
                title="Relatórios Fiscais"
                description="Relatórios estratégicos para compensação"
                icon={<FileBarChart size={24} />}
                href="/fiscal-reports"
                color="bg-gradient-to-br from-lime-500 to-lime-700"
              />

              <ModuleCard 
                title="Dossiês Tributários"
                description="Documentação tributária completa"
                icon={<FileEdit size={24} />}
                href="/tax-dossiers"
                color="bg-gradient-to-br from-fuchsia-500 to-fuchsia-700"
              />
            </div>
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

const ModuleCard = ({ 
  title, 
  description, 
  icon, 
  href, 
  color = "bg-gradient-to-br from-blue-500 to-blue-700" 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  href: string;
  color?: string;
}) => {
  return (
    <Link
      to={href}
      className={cn(
        color,
        "relative overflow-hidden rounded-lg p-6 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 flex flex-col h-48"
      )}
    >
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-0 transition-opacity duration-300 hover:opacity-10 z-0" />
      
      <div className="mb-4 p-2 bg-white bg-opacity-20 rounded-full w-fit">
        {icon}
      </div>
      
      <h3 className="text-lg font-bold mb-2 z-10">{title}</h3>
      <p className="text-sm text-white/90 z-10 line-clamp-3">{description}</p>
      
      <div className="mt-auto flex justify-end">
        <span className="text-xs font-bold uppercase tracking-wider bg-white bg-opacity-20 px-2 py-1 rounded-md">
          Acessar
        </span>
      </div>
    </Link>
  );
};

export default Dashboard;
