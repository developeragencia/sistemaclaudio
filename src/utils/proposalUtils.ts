
import React from 'react';
import { Clock, Filter, CheckCircle2, XCircle, FileCheck } from 'lucide-react';
import { ProposalStatus } from '@/types/proposal';

export const getStatusBadge = (status: ProposalStatus) => {
  switch (status) {
    case 'solicitation':
      return {
        variant: 'outline' as const,
        label: 'Solicitação',
        className: 'bg-blue-50 text-blue-700 hover:bg-blue-50',
        icon: React.createElement(Clock, { className: "h-3.5 w-3.5 mr-1" }),
      };
    case 'analysis':
      return {
        variant: 'outline' as const,
        label: 'Em Análise',
        className: 'bg-yellow-50 text-yellow-700 hover:bg-yellow-50',
        icon: React.createElement(Filter, { className: "h-3.5 w-3.5 mr-1" }),
      };
    case 'approved':
      return {
        variant: 'outline' as const,
        label: 'Aprovada',
        className: 'bg-green-50 text-green-700 hover:bg-green-50',
        icon: React.createElement(CheckCircle2, { className: "h-3.5 w-3.5 mr-1" }),
      };
    case 'rejected':
      return {
        variant: 'outline' as const,
        label: 'Rejeitada',
        className: 'bg-red-50 text-red-700 hover:bg-red-50',
        icon: React.createElement(XCircle, { className: "h-3.5 w-3.5 mr-1" }),
      };
    case 'contracted':
      return {
        variant: 'outline' as const,
        label: 'Contratada',
        className: 'bg-purple-50 text-purple-700 hover:bg-purple-50',
        icon: React.createElement(FileCheck, { className: "h-3.5 w-3.5 mr-1" }),
      };
  }
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};
