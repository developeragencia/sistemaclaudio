
import React from 'react';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const DashboardHeader: React.FC = () => {
  const { user, activeClient } = useAuth();

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            {activeClient ? `Dashboard: ${activeClient.name}` : 'Dashboard'}
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            {activeClient 
              ? `Visão geral dos créditos tributários e processos para ${activeClient.name}`
              : 'Visão geral do sistema e acompanhamento de processos'}
          </p>
        </div>

        {user?.role === 'representative' && (
          <Button asChild className="self-start">
            <Link to="/proposals/new">
              <FileText className="mr-2 h-4 w-4" />
              Nova Proposta
            </Link>
          </Button>
        )}
      </div>
      <Separator />
    </>
  );
};

export default DashboardHeader;
