
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HeartHandshake,
  HelpCircle,
  Phone
} from 'lucide-react';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";

const SidebarSupportSection: React.FC = () => {
  const location = useLocation();
  
  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };
  
  const supportItems = [
    { path: '/support-tickets', icon: HeartHandshake, label: 'Tickets de Suporte' },
    { path: '/help', icon: HelpCircle, label: 'Ajuda' },
    { path: '/contact', icon: Phone, label: 'Contato' }
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-sm font-medium text-gray-400">Suporte</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {supportItems.map((item) => (
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

export default SidebarSupportSection;
