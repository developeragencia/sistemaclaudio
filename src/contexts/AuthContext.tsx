
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Definindo tipos para os usuários
export type UserRole = 'admin' | 'office' | 'client' | 'representative';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  isActive?: boolean;
  lastAccess?: string;
  canAccessAllClients?: boolean;
}

export interface Client {
  id: string;
  name: string;
  cnpj: string;
  segment: string;
  logo?: string;
  status: 'active' | 'inactive' | 'pending';
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: {
    street: string;
    number: string;
    complement?: string;
    district: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface AuthState {
  user: User | null;
  activeClient: Client | null;
  clients: Client[];
  loading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  setActiveClient: (client: Client | null) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const defaultContext: AuthContextType = {
  user: null,
  activeClient: null,
  clients: [],
  loading: true,
  setActiveClient: () => {},
  login: async () => false,
  logout: () => {},
  isAuthenticated: false,
  updateUser: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultContext);

export const useAuth = () => useContext(AuthContext);

// Mock data para desenvolvimento
const MOCK_USERS: Record<string, User> = {
  'admin@sistemaclaudiofigueiredo.com': {
    id: '1',
    name: 'Admin Master',
    email: 'admin@sistemaclaudiofigueiredo.com',
    role: 'admin',
    isActive: true,
    lastAccess: new Date().toISOString(),
    canAccessAllClients: true,
  },
  'office@example.com': {
    id: '2',
    name: 'Equipe do Escritório',
    email: 'office@example.com',
    role: 'office',
    isActive: true,
    lastAccess: new Date().toISOString(),
    canAccessAllClients: true,
  },
  'office2@example.com': {
    id: '5',
    name: 'Analista Terceirizado',
    email: 'office2@example.com',
    role: 'office',
    isActive: true,
    lastAccess: new Date().toISOString(),
    canAccessAllClients: false,
  },
  'client@example.com': {
    id: '3',
    name: 'Cliente',
    email: 'client@example.com',
    role: 'client',
    isActive: true,
    lastAccess: new Date().toISOString(),
    canAccessAllClients: false,
  },
  'rep@example.com': {
    id: '4',
    name: 'Representante Comercial',
    email: 'rep@example.com',
    role: 'representative',
    isActive: true,
    lastAccess: new Date().toISOString(),
    canAccessAllClients: false,
  },
};

const MOCK_CLIENTS: Client[] = [
  {
    id: '1',
    name: 'Prefeitura Municipal de São Paulo',
    cnpj: '12.345.678/0001-90',
    segment: 'Administração Pública',
    status: 'active',
    contactName: 'João Silva',
    contactEmail: 'joao.silva@prefeiturasp.gov.br',
    contactPhone: '(11) 98765-4321',
    address: {
      street: 'Viaduto do Chá',
      number: '15',
      district: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01002-020',
    },
  },
  {
    id: '2',
    name: 'Universidade Federal de Minas Gerais',
    cnpj: '98.765.432/0001-21',
    segment: 'Educação',
    status: 'active',
    contactName: 'Maria Souza',
    contactEmail: 'maria.souza@ufmg.br',
    contactPhone: '(31) 97654-3210',
    address: {
      street: 'Av. Antônio Carlos',
      number: '6627',
      district: 'Pampulha',
      city: 'Belo Horizonte',
      state: 'MG',
      zipCode: '31270-901',
    },
  },
  {
    id: '3',
    name: 'Hospital Municipal do Rio de Janeiro',
    cnpj: '45.678.901/0001-56',
    segment: 'Saúde',
    status: 'active',
    contactName: 'Carlos Mendes',
    contactEmail: 'carlos.mendes@hospitalrj.gov.br',
    contactPhone: '(21) 98765-4321',
    address: {
      street: 'Rua da Saúde',
      number: '123',
      district: 'Centro',
      city: 'Rio de Janeiro',
      state: 'RJ',
      zipCode: '20040-006',
    },
  },
  {
    id: '4',
    name: 'Secretaria de Infraestrutura de Recife',
    cnpj: '34.567.890/0001-78',
    segment: 'Administração Pública',
    status: 'inactive',
    contactName: 'Ana Costa',
    contactEmail: 'ana.costa@recife.pe.gov.br',
    contactPhone: '(81) 98765-4321',
    address: {
      street: 'Av. Cais do Apolo',
      number: '925',
      district: 'Recife',
      city: 'Recife',
      state: 'PE',
      zipCode: '50030-903',
    },
  },
  {
    id: '5',
    name: 'Instituto Federal de Educação de Santa Catarina',
    cnpj: '23.456.789/0001-12',
    segment: 'Educação',
    status: 'pending',
    contactName: 'Pedro Oliveira',
    contactEmail: 'pedro.oliveira@ifsc.edu.br',
    contactPhone: '(48) 98765-4321',
    address: {
      street: 'Av. Mauro Ramos',
      number: '950',
      district: 'Centro',
      city: 'Florianópolis',
      state: 'SC',
      zipCode: '88020-300',
    },
  },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [activeClient, setActiveClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [clients] = useState<Client[]>(MOCK_CLIENTS);

  useEffect(() => {
    // Simula a verificação de um usuário já logado
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    const storedClient = localStorage.getItem('activeClient');
    if (storedClient) {
      setActiveClient(JSON.parse(storedClient));
    }
    
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulação de login para desenvolvimento
    const mockUser = MOCK_USERS[email];
    
    if (mockUser) {
      if (email === 'admin@sistemaclaudiofigueiredo.com' && password === 'admin123') {
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return true;
      } else if (email !== 'admin@sistemaclaudiofigueiredo.com' && password === 'password') {
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return true;
      }
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    setActiveClient(null);
    localStorage.removeItem('user');
    localStorage.removeItem('activeClient');
  };

  const handleSetActiveClient = (client: Client | null) => {
    setActiveClient(client);
    if (client) {
      localStorage.setItem('activeClient', JSON.stringify(client));
    } else {
      localStorage.removeItem('activeClient');
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        activeClient,
        clients,
        loading,
        setActiveClient: handleSetActiveClient,
        login,
        logout,
        isAuthenticated: !!user,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
