
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/Logo';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      
      if (success) {
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo ao Sistema Cláudio Figueiredo",
        });
        navigate('/');
      } else {
        toast({
          title: "Falha no login",
          description: "Email ou senha incorretos",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao fazer login",
        description: "Ocorreu um erro inesperado",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-br from-figueiredo-gray-900 to-figueiredo-gray-800 bg-geometric">
      <div className="grid-pattern"></div>
      
      <div className="w-full max-w-md animate-fade-in">
        <div className="mb-8 text-center">
          <Logo animated size="lg" className="mx-auto" />
          <p className="text-figueiredo-gray-300 mt-4 animate-fade-in animate-delay-2">
            Sistema para Recuperação de Créditos Tributários
          </p>
        </div>

        <Card className="w-full backdrop-blur-sm bg-white/90 animate-fade-in animate-delay-1 shadow-xl border-white/20">
          <CardHeader>
            <CardTitle className="text-center">Acesse sua conta</CardTitle>
            <CardDescription className="text-center">
              Entre com suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-figueiredo-gray-500"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <a href="#" className="text-sm text-primary hover:underline transition-colors">
                    Esqueceu a senha?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-figueiredo-gray-500"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-figueiredo-gray-800 to-figueiredo-gray-700 hover:from-figueiredo-gray-700 hover:to-figueiredo-gray-600 transition-all duration-300 transform hover:scale-[1.02]" 
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-6 text-center animate-fade-in animate-delay-3">
          <p className="text-sm text-figueiredo-gray-300">
            Para acesso de teste, use:
          </p>
          <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-figueiredo-gray-300">
            <div>
              <p>Admin: admin@example.com</p>
              <p>Escritório: office@example.com</p>
            </div>
            <div>
              <p>Cliente: client@example.com</p>
              <p>Representante: rep@example.com</p>
            </div>
          </div>
          <p className="text-xs mt-2 text-figueiredo-gray-300">Senha: password</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
