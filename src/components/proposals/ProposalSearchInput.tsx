
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ProposalSearchInputProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const ProposalSearchInput: React.FC<ProposalSearchInputProps> = ({ 
  searchTerm, 
  setSearchTerm 
}) => {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Buscar por título, cliente ou descrição..."
        className="pl-8"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default ProposalSearchInput;
