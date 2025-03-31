
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, FileText, ClipboardCheck } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const ClientsFilter: React.FC = () => {
  return (
    <Card className="md:w-64 flex-shrink-0">
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Filtros</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Building2 className="mr-2 h-4 w-4" />
                Todos os Clientes
              </Button>
              <Button variant="ghost" className="w-full justify-start" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                Com Propostas
              </Button>
              <Button variant="ghost" className="w-full justify-start" size="sm">
                <ClipboardCheck className="mr-2 h-4 w-4" />
                Ativos
              </Button>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Segmentos</h3>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start" size="sm">
                Administração Pública
              </Button>
              <Button variant="ghost" className="w-full justify-start" size="sm">
                Saúde
              </Button>
              <Button variant="ghost" className="w-full justify-start" size="sm">
                Educação
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientsFilter;
