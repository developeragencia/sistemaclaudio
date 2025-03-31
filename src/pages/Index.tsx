
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 relative">
      <div className="grid-pattern"></div>
      
      <div className="flex-grow flex flex-col items-center justify-center px-4 py-10 z-10">
        <div className="mb-10 animate-fade-in">
          <Logo animated size="xl" className="mx-auto" />
        </div>
        
        <h1 className="hero-title text-gray-800 animate-fade-in animate-delay-1">
          Sistema de Recuperação de Créditos Tributários
        </h1>
        
        <p className="hero-subtitle text-gray-600 max-w-3xl text-center animate-fade-in animate-delay-2">
          Solução automatizada para apuração e recuperação de créditos tributários de IRRF/PJ,
          garantindo conformidade com a legislação vigente e otimizando processos de auditoria fiscal.
        </p>
        
        <div className="mt-8 animate-fade-in animate-delay-3">
          <Button 
            onClick={handleNavigateToLogin}
            className="gradient-button text-lg px-8 py-6 group"
          >
            Acessar Sistema
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5 inline-block group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Button>
        </div>
      </div>
      
      <footer className="w-full py-4 text-center text-gray-500 text-xs mt-auto z-10">
        <div className="container mx-auto px-4">
          <p>© 2025 Sistemas Cláudio Figueiredo. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
