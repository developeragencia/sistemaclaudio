
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from "@/components/ui/sidebar";
import ClientSelector from './ClientSelector';
import HeaderUserActions from './HeaderUserActions';

interface AppHeaderProps {
  clientDropdownOpen: boolean;
  setClientDropdownOpen: (open: boolean) => void;
  getInitials: (name: string) => string;
}

const AppHeader: React.FC<AppHeaderProps> = ({ 
  clientDropdownOpen, 
  setClientDropdownOpen, 
  getInitials 
}) => {
  return (
    <header className="bg-white border-b py-2 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <SidebarTrigger>
          <Button variant="ghost" size="icon">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </SidebarTrigger>
        
        <ClientSelector 
          open={clientDropdownOpen} 
          onOpenChange={setClientDropdownOpen} 
          getInitials={getInitials}
        />
      </div>

      <HeaderUserActions getInitials={getInitials} />
    </header>
  );
};

export default AppHeader;
