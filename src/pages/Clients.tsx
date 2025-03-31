
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ClientsHeader from '@/components/clients/ClientsHeader';
import ClientsFilter from '@/components/clients/ClientsFilter';
import ClientSearchInput from '@/components/clients/ClientSearchInput';
import ClientsTable from '@/components/clients/ClientsTable';
import { getInitials } from '@/utils/stringUtils';

const Clients = () => {
  const { clients } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.cnpj.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <ClientsHeader />

      <div className="flex flex-col md:flex-row gap-4">
        <ClientsFilter />

        <div className="flex-1 space-y-4">
          <div className="flex items-center">
            <ClientSearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>

          <ClientsTable filteredClients={filteredClients} getInitials={getInitials} />
        </div>
      </div>
    </div>
  );
};

export default Clients;
