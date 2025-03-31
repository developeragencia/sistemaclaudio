
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

const ProposalsHeader: React.FC = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Propostas Comerciais</h1>
          <p className="text-muted-foreground">
            Gerencie propostas comerciais e acompanhe seu andamento
          </p>
        </div>

        <Button asChild>
          <Link to="/proposals/new">
            <Plus className="mr-2 h-4 w-4" />
            Nova Proposta
          </Link>
        </Button>
      </div>

      <Separator />
    </>
  );
};

export default ProposalsHeader;
