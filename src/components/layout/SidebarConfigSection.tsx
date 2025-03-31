
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Settings, 
  HardDrive, 
  Workflow, 
  Calculator,
  Scan
} from 'lucide-react';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";

const SidebarConfigSection: React.FC = () => {
  const location = useLocation();
  
  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };
  
  const configItems = [
    { path: '/settings', icon: Settings, label: 'Configurações Gerais' },
    { path: '/backup', icon: HardDrive, label: 'Backup & Restauração' },
    { path: '/workflows', icon: Workflow, label: 'Fluxos de Trabalho' },
    { path: '/tax-rates', icon: Calculator, label: 'Alíquotas Fiscais' }
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-sm font-medium text-gray-400">Configurações</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {configItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton asChild className={isActiveRoute(item.path) ? 'menu-item-active' : ''}>
                <Link to={item.path} className="flex items-center gap-2">
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SidebarConfigSection;
