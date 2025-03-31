
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth, Client } from '@/contexts/AuthContext';

interface ClientSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  getInitials: (name: string) => string;
}

const ClientSelector: React.FC<ClientSelectorProps> = ({ 
  open, 
  onOpenChange,
  getInitials 
}) => {
  const { activeClient, clients, setActiveClient } = useAuth();

  const handleClientSelect = (client: Client) => {
    setActiveClient(client);
    onOpenChange(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-2 flex items-center gap-2 border-dashed max-w-[280px] justify-between truncate md:ml-4">
          {activeClient ? (
            <div className="flex items-center gap-2 truncate">
              <Avatar className="h-6 w-6 flex-shrink-0">
                <AvatarFallback className="bg-taxglider-blue-100 text-taxglider-blue-700 text-xs">
                  {getInitials(activeClient.name)}
                </AvatarFallback>
              </Avatar>
              <span className="truncate">{activeClient.name}</span>
            </div>
          ) : (
            <span className="text-muted-foreground truncate">Selecionar cliente ativo</span>
          )}
          <ChevronDown className="h-4 w-4 opacity-50 flex-shrink-0 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[280px]">
        <DropdownMenuLabel>Clientes</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {clients.map((client) => (
          <DropdownMenuItem
            key={client.id}
            onClick={() => handleClientSelect(client)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Avatar className="h-6 w-6">
              <AvatarFallback className="bg-taxglider-blue-100 text-taxglider-blue-700 text-xs">
                {getInitials(client.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm truncate">{client.name}</span>
              <span className="text-xs text-muted-foreground truncate">{client.cnpj}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ClientSelector;
