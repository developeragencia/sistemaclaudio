
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { SidebarContent as SidebarContentContainer } from "@/components/ui/sidebar";
import SidebarMainNavigation from './SidebarMainNavigation';
import SidebarMainModules from './SidebarMainModules';
import SidebarSecuritySection from './SidebarSecuritySection';
import SidebarConfigSection from './SidebarConfigSection';
import SidebarContentSection from './SidebarContentSection';
import SidebarSupportSection from './SidebarSupportSection';

const SidebarContent: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <SidebarContentContainer className="overflow-y-auto">
      <SidebarMainNavigation />
      <SidebarMainModules />
      
      {isAdmin && (
        <>
          <SidebarSecuritySection />
          <SidebarConfigSection />
          <SidebarContentSection />
          <SidebarSupportSection />
        </>
      )}
    </SidebarContentContainer>
  );
};

export default SidebarContent;
