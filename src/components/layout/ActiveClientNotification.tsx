
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface ActiveClientNotificationProps {
  setClientDropdownOpen: (open: boolean) => void;
}

const ActiveClientNotification: React.FC<ActiveClientNotificationProps> = ({ 
  setClientDropdownOpen 
}) => {
  const { user, activeClient } = useAuth();

  if (activeClient || user?.role === 'client') {
    return null;
  }

  return (
    <Card className="mb-4 p-4 border-orange-300 bg-orange-50 border-l-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div className="flex-1">
          <h3 className="font-medium text-orange-800">Cliente Ativo não selecionado</h3>
          <p className="text-sm text-orange-700 mt-1">
            Selecione um cliente na barra superior para continuar suas operações.
          </p>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          className="border-orange-300 text-orange-700 hover:bg-orange-100 self-start md:self-center mt-2 md:mt-0"
          onClick={() => setClientDropdownOpen(true)}
        >
          Selecionar Cliente
        </Button>
      </div>
    </Card>
  );
};

export default ActiveClientNotification;
