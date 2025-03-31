
import React from 'react';
import { FileText, Clock, Filter, CheckCircle2, XCircle, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface ProposalsSidebarProps {
  selectedStatus: string | null;
  setSelectedStatus: (status: string | null) => void;
  selectedPeriod: string | null;
  setSelectedPeriod: (period: string | null) => void;
}

const ProposalsSidebar: React.FC<ProposalsSidebarProps> = ({
  selectedStatus,
  setSelectedStatus,
  selectedPeriod,
  setSelectedPeriod
}) => {
  return (
    <Card className="md:w-64 flex-shrink-0">
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Status</h3>
            <div className="space-y-2">
              <Button 
                variant={selectedStatus === null ? "outline" : "ghost"} 
                className="w-full justify-start" 
                size="sm"
                onClick={() => setSelectedStatus(null)}
              >
                <FileText className="mr-2 h-4 w-4" />
                Todas
              </Button>
              <Button 
                variant={selectedStatus === 'solicitation' ? "outline" : "ghost"} 
                className="w-full justify-start" 
                size="sm"
                onClick={() => setSelectedStatus('solicitation')}
              >
                <Clock className="mr-2 h-4 w-4 text-blue-600" />
                Solicitação
              </Button>
              <Button 
                variant={selectedStatus === 'analysis' ? "outline" : "ghost"} 
                className="w-full justify-start" 
                size="sm"
                onClick={() => setSelectedStatus('analysis')}
              >
                <Filter className="mr-2 h-4 w-4 text-yellow-600" />
                Em Análise
              </Button>
              <Button 
                variant={selectedStatus === 'approved' ? "outline" : "ghost"} 
                className="w-full justify-start" 
                size="sm"
                onClick={() => setSelectedStatus('approved')}
              >
                <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                Aprovadas
              </Button>
              <Button 
                variant={selectedStatus === 'rejected' ? "outline" : "ghost"}
                className="w-full justify-start" 
                size="sm"
                onClick={() => setSelectedStatus('rejected')}
              >
                <XCircle className="mr-2 h-4 w-4 text-red-600" />
                Rejeitadas
              </Button>
              <Button 
                variant={selectedStatus === 'contracted' ? "outline" : "ghost"} 
                className="w-full justify-start" 
                size="sm"
                onClick={() => setSelectedStatus('contracted')}
              >
                <FileCheck className="mr-2 h-4 w-4 text-purple-600" />
                Contratadas
              </Button>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Período</h3>
            <div className="space-y-2">
              <Button 
                variant={selectedPeriod === 'month' ? "outline" : "ghost"} 
                className="w-full justify-start" 
                size="sm"
                onClick={() => setSelectedPeriod('month')}
              >
                Último mês
              </Button>
              <Button 
                variant={selectedPeriod === 'quarter' ? "outline" : "ghost"} 
                className="w-full justify-start" 
                size="sm"
                onClick={() => setSelectedPeriod('quarter')}
              >
                Últimos 3 meses
              </Button>
              <Button 
                variant={selectedPeriod === 'year' ? "outline" : "ghost"} 
                className="w-full justify-start" 
                size="sm"
                onClick={() => setSelectedPeriod('year')}
              >
                Este ano
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProposalsSidebar;
