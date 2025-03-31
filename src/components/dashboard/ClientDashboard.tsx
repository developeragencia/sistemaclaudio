
import React from 'react';
import { BarChart, Calculator, ArrowUpRight, FileText } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import RecentActivities from '@/components/dashboard/RecentActivities';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Activity } from '@/components/dashboard/RecentActivities';

interface ClientDashboardProps {
  activities: Activity[];
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({ activities }) => {
  return (
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

        <RecentActivities activities={activities.slice(0, 3)} />
      </div>
    </div>
  );
};

export default ClientDashboard;
