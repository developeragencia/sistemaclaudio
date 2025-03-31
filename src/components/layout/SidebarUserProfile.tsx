
import React from 'react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarUserProfileProps {
  getInitials: (name: string) => string;
}

const SidebarUserProfile: React.FC<SidebarUserProfileProps> = ({ getInitials }) => {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-sm">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user?.avatar} />
          <AvatarFallback className="bg-taxglider-blue-300 text-white">
            {user ? getInitials(user.name) : 'US'}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium truncate max-w-[120px]">{user?.name}</span>
          <span className="text-xs text-gray-400 truncate max-w-[120px]">{user?.email}</span>
        </div>
      </div>
      
      <Button 
        variant="outline" 
        size="sm"
        className="w-full justify-start text-gray-600 hover:bg-gray-100"
        onClick={logout}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Sair
      </Button>
    </div>
  );
};

export default SidebarUserProfile;
