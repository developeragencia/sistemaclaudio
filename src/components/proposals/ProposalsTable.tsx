
import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Proposal } from '@/types/proposal';
import { getInitials } from '@/utils/stringUtils';
import { getStatusBadge, formatCurrency, formatDate } from '@/utils/proposalUtils';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

interface ProposalsTableProps {
  proposals: Proposal[];
}

const ProposalsTable: React.FC<ProposalsTableProps> = ({ proposals }) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Proposta</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Valor Potencial</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proposals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-6">
                  Nenhuma proposta encontrada
                </TableCell>
              </TableRow>
            ) : (
              proposals.map((proposal) => {
                const statusBadge = getStatusBadge(proposal.status);
                
                return (
                  <TableRow key={proposal.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{proposal.title}</p>
                        <p className="text-sm text-muted-foreground truncate max-w-[300px]">
                          {proposal.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-taxglider-blue-100 text-taxglider-blue-700 text-xs">
                            {getInitials(proposal.clientName)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{proposal.clientName}</p>
                          <p className="text-xs text-muted-foreground">{proposal.clientCnpj}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(proposal.potentialValue)}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm">{formatDate(proposal.createdAt)}</span>
                        <span className="text-xs text-muted-foreground">
                          Atualizado: {formatDate(proposal.updatedAt)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={statusBadge.variant}
                        className={statusBadge.className}
                      >
                        <div className="flex items-center">
                          {statusBadge.icon}
                          {statusBadge.label}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem>Atualizar Status</DropdownMenuItem>
                          {proposal.status === 'approved' && (
                            <DropdownMenuItem>Converter em Contrato</DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ProposalsTable;
