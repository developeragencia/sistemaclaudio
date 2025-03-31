
import React from 'react';
import { 
  Calculator, 
  Users, 
  FileText, 
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
  Shield,
  Database,
  FileBarChart,
  TrendingUp,
  MonitorSmartphone,
  Search
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import ModuleCard from './ModuleCard';

const AdminModulesGrid: React.FC = () => {
  return (
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
            icon={<ClipboardCheck size={24} />}
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
            icon={<FileCheck size={24} />}
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
  );
};

export default AdminModulesGrid;
