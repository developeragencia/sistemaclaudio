
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ClientDashboard from '@/components/dashboard/ClientDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import { Activity } from '@/components/dashboard/RecentActivities';

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
  const { activeClient } = useAuth();

  return (
    <div className="space-y-4 md:space-y-6">
      <DashboardHeader />

      <Tabs defaultValue={activeClient ? "client" : "overview"} className="space-y-4 md:space-y-6">
        <TabsList className="w-full max-w-md flex">
          {activeClient && <TabsTrigger value="client" className="flex-1">Cliente Específico</TabsTrigger>}
          <TabsTrigger value="overview" className="flex-1">Visão Geral</TabsTrigger>
        </TabsList>

        {activeClient && (
          <TabsContent value="client" className="space-y-4 md:space-y-6">
            <ClientDashboard activities={MOCK_ACTIVITIES} />
          </TabsContent>
        )}

        <TabsContent value="overview" className="space-y-4 md:space-y-6">
          <AdminDashboard activities={MOCK_ACTIVITIES} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
