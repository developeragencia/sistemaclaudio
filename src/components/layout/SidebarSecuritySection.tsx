
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Users, 
  Shield, 
  KeyRound, 
  Lock, 
  AlertTriangle, 
  History
} from 'lucide-react';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";

const SidebarSecuritySection: React.FC = () => {
  const location = useLocation();
  
  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };
  
  const securityItems = [
    { path: '/users', icon: Users, label: 'Gestão de Usuários' },
    { path: '/security', icon: Shield, label: 'Segurança' },
    { path: '/access-control', icon: KeyRound, label: 'Controle de Acesso' },
    { path: '/two-factor', icon: Lock, label: 'Autenticação 2FA' },
    { path: '/alerts', icon: AlertTriangle, label: 'Alertas de Segurança' },
    { path: '/logs', icon: History, label: 'Logs do Sistema' }
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-sm font-medium text-gray-400">Segurança & Auditoria</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {securityItems.map((item) => (
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

export default SidebarSecuritySection;
