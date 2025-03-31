import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Nav } from './nav';
import SidebarUserProfile from './SidebarUserProfile';
import SidebarContent from './SidebarContent';
import AppHeader from './AppHeader';
import ActiveClientNotification from './ActiveClientNotification';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);
  const isMobile = useIsMobile();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="h-screen flex w-full">
      <div className="w-64 border-r bg-background">
        <div className="flex flex-col h-full">
          <div className="p-4">
            <h1 className="text-xl font-bold">Sistema Claudio</h1>
          </div>
          
          <Nav className="px-4" />
          
          <div className="flex-1 overflow-y-auto">
            <SidebarContent />
          </div>
          
          <div className="p-4 border-t">
            <SidebarUserProfile getInitials={getInitials} />
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <AppHeader 
          clientDropdownOpen={clientDropdownOpen}
          setClientDropdownOpen={setClientDropdownOpen}
          getInitials={getInitials}
        />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-gray-50">
          <ActiveClientNotification setClientDropdownOpen={setClientDropdownOpen} />
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
