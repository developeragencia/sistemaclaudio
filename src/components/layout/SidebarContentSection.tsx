
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Globe,
  FileEdit,
  BookOpen
} from 'lucide-react';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";

const SidebarContentSection: React.FC = () => {
  const location = useLocation();
  
  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };
  
  const contentItems = [
    { path: '/website', icon: Globe, label: 'Website' },
    { path: '/content', icon: FileEdit, label: 'Gerenciar Conteúdo' },
    { path: '/knowledge-base', icon: BookOpen, label: 'Base de Conhecimento' }
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-sm font-medium text-gray-400">Site e Conteúdo</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {contentItems.map((item) => (
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

export default SidebarContentSection;
