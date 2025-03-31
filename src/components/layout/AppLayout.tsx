import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Nav } from './nav';
import SidebarUserProfile from './SidebarUserProfile';
import SidebarContent from './SidebarContent';
import AppHeader from './AppHeader';
import ActiveClientNotification from './ActiveClientNotification';
import { Sidebar } from '@/components/ui/sidebar';
import { Button } from "@/components/ui/button";
import { Menu, User } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user, signOut } = useAuth();
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleSignOut = () => {
    signOut();
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      <div
        className={cn(
          "flex flex-col gap-4 border-r bg-gray-50/40 p-6",
          isCollapsed ? "w-[80px]" : "w-[240px]"
        )}
      >
        <div className="flex h-14 items-center justify-between">
          {!isCollapsed && (
            <Link to="/app/home" className="flex items-center gap-2">
              <span className="font-bold">Sistema Tributário</span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
        <Nav isCollapsed={isCollapsed} />
      </div>
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-gray-50/40 px-6">
          <div className="ml-auto flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="text-sm">{user?.name}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              Sair
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
