import { createContext, useContext, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("@Auth:user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const signIn = async (email: string, password: string) => {
    // Simulação de autenticação
    if (email === "admin@example.com" && password === "admin") {
      const user = {
        id: "1",
        name: "Administrador",
        email: "admin@example.com",
      };
      
      setUser(user);
      localStorage.setItem("@Auth:user", JSON.stringify(user));
    } else {
      throw new Error("Credenciais inválidas");
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("@Auth:user");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
} 