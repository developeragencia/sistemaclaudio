import React from 'react';
import { Home, Calculator, Receipt, FileSearch, Coins, FileCheck, Scale } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";

const SidebarMainNavigation: React.FC = () => {
  const location = useLocation();
  
  const isActiveRoute = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const routes = [
    { path: '/', icon: <Home size={18} />, label: 'Home' },
    { path: '/tax-credits', icon: <Coins size={18} />, label: 'Créditos Tributários' },
    { path: '/calculator', icon: <Calculator size={18} />, label: 'Calculadora Avançada' },
    { path: '/irrf-calculator', icon: <Receipt size={18} />, label: 'Cálculos IRRF' },
    { path: '/irrf-recovery', icon: <FileSearch size={18} />, label: 'Recuperação IRRF/PJ' },
    { path: '/credit-identification', icon: <FileCheck size={18} />, label: 'Identificação de Créditos' },
    { path: '/tax-rules', icon: <Scale size={18} />, label: 'Regras Tributárias' },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-sm font-medium text-gray-400">Principal</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {routes.map((route) => (
            <SidebarMenuItem key={route.path}>
              <SidebarMenuButton asChild className={isActiveRoute(route.path) ? 'menu-item-active' : ''}>
                <Link to={route.path} className="flex items-center gap-2">
                  {route.icon}
                  <span>{route.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SidebarMainNavigation;
