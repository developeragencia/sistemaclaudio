
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Client, useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

interface ClientsListProps {
  className?: string;
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

const ClientsList: React.FC<ClientsListProps> = ({ className }) => {
  const { clients, setActiveClient, activeClient } = useAuth();

  return (
    <Card className={className}>
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle>Clientes</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link to="/clients">Ver todos</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {clients.slice(0, 5).map((client) => (
            <div key={client.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-taxglider-blue-100 text-taxglider-blue-700">
                    {getInitials(client.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{client.name}</p>
                  <p className="text-xs text-muted-foreground">{client.cnpj}</p>
                </div>
              </div>
              <Button
                variant={activeClient?.id === client.id ? "secondary" : "outline"}
                size="sm"
                onClick={() => setActiveClient(client)}
              >
                {activeClient?.id === client.id ? "Ativo" : "Selecionar"}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientsList;
