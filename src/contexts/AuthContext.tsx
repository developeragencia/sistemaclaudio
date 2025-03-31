
import React, { createContext, useContext, useState, useEffect } from 'react';

// Definindo tipos para os usuários
export type UserRole = 'admin' | 'office' | 'client' | 'representative';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Client {
  id: string;
  name: string;
  cnpj: string;
  segment: string;
  logo?: string;
}

interface AuthContextType {
  user: User | null;
  activeClient: Client | null;
  clients: Client[];
  loading: boolean;
  setActiveClient: (client: Client | null) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
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
  },
  'office@example.com': {
    id: '2',
    name: 'Equipe do Escritório',
    email: 'office@example.com',
    role: 'office',
  },
  'client@example.com': {
    id: '3',
    name: 'Cliente',
    email: 'client@example.com',
    role: 'client',
  },
  'rep@example.com': {
    id: '4',
    name: 'Representante Comercial',
    email: 'rep@example.com',
    role: 'representative',
  },
};

const MOCK_CLIENTS: Client[] = [
  {
    id: '1',
    name: 'Prefeitura Municipal de São Paulo',
    cnpj: '12.345.678/0001-90',
    segment: 'Administração Pública',
  },
  {
    id: '2',
    name: 'Universidade Federal de Minas Gerais',
    cnpj: '98.765.432/0001-21',
    segment: 'Educação',
  },
  {
    id: '3',
    name: 'Hospital Municipal do Rio de Janeiro',
    cnpj: '45.678.901/0001-56',
    segment: 'Saúde',
  },
  {
    id: '4',
    name: 'Secretaria de Infraestrutura de Recife',
    cnpj: '34.567.890/0001-78',
    segment: 'Administração Pública',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
    
    // Updated the password check for the admin user
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
