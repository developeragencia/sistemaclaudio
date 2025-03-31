
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

// Dados simulados para desenvolvimento
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
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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

      <div className="grid gap-6 md:grid-cols-2">
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
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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

      <div className="grid gap-6 md:grid-cols-3">
        <ClientsList className="md:col-span-1" />
        <RecentActivities activities={MOCK_ACTIVITIES} className="md:col-span-2" />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {activeClient ? `Dashboard: ${activeClient.name}` : 'Dashboard'}
          </h1>
          <p className="text-muted-foreground">
            {activeClient 
              ? `Visão geral dos créditos tributários e processos para ${activeClient.name}`
              : 'Visão geral do sistema e acompanhamento de processos'}
          </p>
        </div>

        {user?.role === 'representative' && (
          <Button asChild>
            <Link to="/proposals/new">
              <FileText className="mr-2 h-4 w-4" />
              Nova Proposta
            </Link>
          </Button>
        )}
      </div>

      <Separator />

      <Tabs defaultValue={activeClient ? "client" : "overview"} className="space-y-6">
        <TabsList>
          {activeClient && <TabsTrigger value="client">Cliente Específico</TabsTrigger>}
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
        </TabsList>

        {activeClient && (
          <TabsContent value="client" className="space-y-6">
            {renderClientDashboard()}
          </TabsContent>
        )}

        <TabsContent value="overview" className="space-y-6">
          {renderAdminDashboard()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
