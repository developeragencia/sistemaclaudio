
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FileText, 
  FileCheck, 
  Calculator, 
  Receipt, 
  ArrowUp, 
  Eye, 
  Database, 
  ListChecks, 
  ArrowLeftRight, 
  LayoutDashboard,
  ClipboardCheck, 
  FileBarChart, 
  TrendingUp, 
  Scan, 
  FileEdit
} from 'lucide-react';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";

const SidebarMainModules: React.FC = () => {
  const location = useLocation();
  
  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };
  
  const modules = [
    { path: '/commercial-proposals', icon: FileText, label: 'Propostas Comerciais' },
    { path: '/tax-credits', icon: FileCheck, label: 'Créditos Tributários' },
    { path: '/advanced-calculator', icon: Calculator, label: 'Calculadora Avançada' },
    { path: '/irrf-calculations', icon: Receipt, label: 'Cálculos IRRF' },
    { path: '/irrf-recovery', icon: ArrowUp, label: 'Recuperação IRRF/PJ' },
    { path: '/credit-identification', icon: Eye, label: 'Identificação de Créditos' },
    { path: '/data-import', icon: Database, label: 'Importação de Dados' },
    { path: '/detailed-reports', icon: ListChecks, label: 'Relatórios Detalhados' },
    { path: '/tax-compensation', icon: ArrowLeftRight, label: 'Compensação Tributária' },
    { path: '/interactive-dashboard', icon: LayoutDashboard, label: 'Dashboard Interativo' },
    { path: '/retention-receipts', icon: ClipboardCheck, label: 'Comprovantes de Retenção' },
    { path: '/fiscal-reports', icon: FileBarChart, label: 'Relatórios Fiscais' },
    { path: '/monetary-correction', icon: TrendingUp, label: 'Correção Monetária' },
    { path: '/audit-management', icon: Scan, label: 'Gestão de Auditorias' },
    { path: '/tax-dossiers', icon: FileEdit, label: 'Dossiês Tributários' }
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-sm font-medium text-gray-400">Módulos Principais</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {modules.map((module) => (
            <SidebarMenuItem key={module.path}>
              <SidebarMenuButton asChild className={isActiveRoute(module.path) ? 'menu-item-active' : ''}>
                <Link to={module.path} className="flex items-center gap-2">
                  <module.icon size={18} />
                  <span>{module.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SidebarMainModules;
