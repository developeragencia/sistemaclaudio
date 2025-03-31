import React, { useState } from 'react';
import { MOCK_PROPOSALS } from '@/data/mockProposals';
import { Proposal, ProposalStatus } from '@/types/proposal';
import ProposalsHeader from '@/components/proposals/ProposalsHeader';
import ProposalsSidebar from '@/components/proposals/ProposalsSidebar';
import ProposalsTable from '@/components/proposals/ProposalsTable';
import ProposalSearchInput from '@/components/proposals/ProposalSearchInput';

const Proposals = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);

  const filteredProposals = MOCK_PROPOSALS.filter((proposal) => {
    const matchesSearch = 
      proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus 
      ? proposal.status === selectedStatus 
      : true;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <ProposalsHeader />

      <div className="flex flex-col md:flex-row gap-4">
        <ProposalsSidebar 
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
        />

        <div className="flex-1 space-y-4">
          <div className="flex items-center">
            <ProposalSearchInput 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>

          <ProposalsTable proposals={filteredProposals} />
        </div>
      </div>
    </div>
  );
};

export default Proposals;
