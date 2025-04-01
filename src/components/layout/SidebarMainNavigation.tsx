
import React from 'react';
import { Home, Building2, FileText } from 'lucide-react';
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
    return location.pathname === path;
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-sm font-medium text-gray-400">Principal</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className={isActiveRoute('/dashboard') ? 'menu-item-active' : ''}>
              <Link to="/dashboard" className="flex items-center gap-2">
                <Home size={18} />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild className={isActiveRoute('/clients') ? 'menu-item-active' : ''}>
              <Link to="/clients" className="flex items-center gap-2">
                <Building2 size={18} />
                <span>Clientes</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild className={isActiveRoute('/proposals') ? 'menu-item-active' : ''}>
              <Link to="/proposals" className="flex items-center gap-2">
                <FileText size={18} />
                <span>Propostas</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SidebarMainNavigation;
