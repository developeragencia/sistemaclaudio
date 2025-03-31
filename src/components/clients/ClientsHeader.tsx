
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';

interface ClientsHeaderProps {
  title?: string;
  description?: string;
}

const ClientsHeader: React.FC<ClientsHeaderProps> = ({
  title = "Clientes",
  description = "Gerencie todos os clientes e suas informações"
}) => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Cliente
        </Button>
      </div>

      <Separator />
    </>
  );
};

export default ClientsHeader;
