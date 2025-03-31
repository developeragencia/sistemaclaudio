
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
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-white bg-geometric">
      <div className="grid-pattern"></div>
      
      <div className="w-full max-w-md animate-fade-in">
        <div className="mb-8 text-center">
          <Logo animated size="lg" className="mx-auto" />
          <p className="text-gray-600 mt-4 animate-fade-in animate-delay-2">
            Sistema para Recuperação de Créditos Tributários
          </p>
        </div>

        <Card className="w-full backdrop-blur-sm bg-white/95 animate-fade-in animate-delay-1 shadow-xl border-gray-200">
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
                  className="transition-all duration-300 focus:ring-2 focus:ring-gray-400"
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
                  className="transition-all duration-300 focus:ring-2 focus:ring-gray-400"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 transition-all duration-300 transform hover:scale-[1.02]" 
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-6 text-center animate-fade-in animate-delay-3">
          <p className="text-sm text-gray-600">
            Para acesso de teste, use:
          </p>
          <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-gray-600">
            <div>
              <p>Admin: admin@example.com</p>
              <p>Escritório: office@example.com</p>
            </div>
            <div>
              <p>Cliente: client@example.com</p>
              <p>Representante: rep@example.com</p>
            </div>
          </div>
          <p className="text-xs mt-2 text-gray-600">Senha: password</p>
        </div>
        
        <footer className="absolute bottom-0 w-full py-4 text-center text-gray-500 text-xs">
          <div>© 2025 Sistemas Cláudio Figueiredo. Todos os direitos reservados.</div>
          <div className="mt-1">
            Desenvolvido por <a href="https://alexdesenvolvedor.com.br" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-700 transition-colors">Alex Developer</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Login;
