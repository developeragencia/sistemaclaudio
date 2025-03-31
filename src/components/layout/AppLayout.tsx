
import React, { useState } from 'react';
import { 
  Sidebar, 
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/Logo';
import { useIsMobile } from '@/hooks/use-mobile';
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
    <SidebarProvider>
      <div className="h-screen flex w-full">
        <Sidebar variant="sidebar" collapsible="icon" className="border-r">
          <SidebarHeader className="p-4">
            <div className="flex items-center justify-center">
              <Logo size={isMobile ? "sm" : "md"} withSubtitle={!isMobile} textOnly={true} />
            </div>
          </SidebarHeader>

          <SidebarContent />

          <SidebarFooter className="p-4 border-t">
            <SidebarUserProfile getInitials={getInitials} />
          </SidebarFooter>
        </Sidebar>

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
    </SidebarProvider>
  );
};

export default AppLayout;
