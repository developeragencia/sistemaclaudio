
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/Logo';
import { ArrowLeft, Lock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shimmering, setShimmering] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setShimmering(true);
      setTimeout(() => setShimmering(false), 3000);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

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
        navigate('/dashboard');
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
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-white relative overflow-hidden">
      <div className="grid-pattern opacity-50"></div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white pointer-events-none"></div>
      
      <Link to="/" className="absolute top-6 left-6 flex items-center text-gray-600 hover:text-gray-900 transition-colors group">
        <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={18} />
        Voltar para a página inicial
      </Link>
      
      <div className="w-full max-w-md animate-fade-in relative z-10">
        <div className="mb-8 text-center">
          <Logo animated size="lg" className={`mx-auto ${shimmering ? 'animate-pulse-soft' : ''}`} interactive />
          <p className="text-gray-500 mt-4 animate-fade-in animate-delay-2">
            Sistema para Recuperação de Créditos Tributários
          </p>
        </div>

        <Card className="w-full bg-white/90 backdrop-blur-sm animate-fade-in animate-delay-1 shadow-lg hover:shadow-xl transition-all duration-300 border-gray-100 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-r from-gray-50 via-white to-gray-50 ${shimmering ? 'animate-shimmer' : 'opacity-0'}`} style={{backgroundSize: '200% 100%'}}></div>
          
          <CardHeader className="relative z-10">
            <CardTitle className="text-center text-gradient">Acesse sua conta</CardTitle>
            <CardDescription className="text-center">
              Entre com suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 relative z-10">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-gray-300 border-gray-200"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-gray-700">Senha</Label>
                  <a href="#" className="text-sm text-gray-600 hover:text-gray-900 hover:underline transition-colors">
                    Esqueceu a senha?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-gray-300 border-gray-200"
                  />
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="relative z-10">
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 transition-all duration-300 transform hover:scale-[1.02] group" 
                disabled={isLoading}
              >
                <span className="relative z-10 flex items-center">
                  {isLoading ? "Entrando..." : "Entrar"}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600 opacity-0 group-hover:opacity-100 transition-opacity rounded-md"></span>
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-6 text-center animate-fade-in animate-delay-3">
          <p className="text-sm text-gray-500">
            Para acesso de teste, use:
          </p>
          <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-gray-500">
            <div>
              <p>Admin: <span className="font-medium">admin@example.com</span></p>
              <p>Escritório: <span className="font-medium">office@example.com</span></p>
            </div>
            <div>
              <p>Cliente: <span className="font-medium">client@example.com</span></p>
              <p>Representante: <span className="font-medium">rep@example.com</span></p>
            </div>
          </div>
          <p className="text-xs mt-2 text-gray-500">Senha: <span className="font-medium">password</span></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
