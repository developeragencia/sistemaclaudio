
export type ProposalStatus = 
  | 'solicitation' 
  | 'analysis' 
  | 'approved' 
  | 'rejected' 
  | 'contracted';

export interface Proposal {
  id: string;
  clientId: string;
  clientName: string;
  clientCnpj: string;
  representativeId: string;
  representativeName: string;
  title: string;
  description: string;
  potentialValue: number;
  status: ProposalStatus;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'info' | 'success' | 'warning' | 'error';
  user: {
    id: string;
    name: string;
  };
}
