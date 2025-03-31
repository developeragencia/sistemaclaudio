
import React from 'react';
import { Users, FileText, Calculator } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import RecentActivities from '@/components/dashboard/RecentActivities';
import ClientsList from '@/components/dashboard/ClientsList';
import AdminModulesGrid from './AdminModulesGrid';
import { Activity } from '@/components/dashboard/RecentActivities';
import { useAuth } from '@/contexts/AuthContext';

interface AdminDashboardProps {
  activities: Activity[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ activities }) => {
  const { user } = useAuth();
  
  return (
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

      {user?.role === 'admin' && <AdminModulesGrid />}

      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3">
        <ClientsList className="md:col-span-1" />
        <RecentActivities activities={activities} className="md:col-span-2" />
      </div>
    </div>
  );
};

export default AdminDashboard;
