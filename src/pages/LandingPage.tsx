
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import { ArrowRight, ChevronDown } from 'lucide-react';

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 px-6 
                         ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto">
          <Logo animated={!scrolled} size="sm" className="mx-auto sm:mx-0" interactive />
        </div>
      </header>
      
      <main className="flex-1 flex flex-col">
        <div className="hero-container relative">
          <div className="grid-pattern opacity-70"></div>
          
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white/80 z-0"></div>
          
          <div className="hero-content z-10 pt-24">
            <div className="mb-10 animate-fade-in">
              <Logo animated size="xl" className="mx-auto hover-lift" interactive />
            </div>
            
            <h1 className="hero-title animate-fade-in animate-delay-1 text-gradient">
              Sistema de Recuperação de Créditos Tributários
            </h1>
            
            <p className="hero-subtitle animate-fade-in animate-delay-2 max-w-3xl mx-auto">
              Solução automatizada para apuração e recuperação de créditos tributários de IRRF/PJ,
              garantindo conformidade com a legislação vigente e otimizando processos de auditoria fiscal.
            </p>
            
            <div className="hero-cta animate-fade-in animate-delay-3 mt-8">
              <Link to="/login" className="gradient-button group relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Acessar Sistema
                  <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Link>
            </div>
            
            <div className="mt-20 flex justify-center animate-fade-in animate-delay-4">
              <ChevronDown className="animate-float text-gray-400" size={32} />
            </div>
          </div>
        </div>
        
        <div className="bg-white py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16 text-gradient">
              Funcionalidades do Sistema
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl border border-gray-100 shadow-sm hover-lift card-shimmer bg-white">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Controle Inteligente</h3>
                <p className="text-gray-600 text-sm">Gestão completa de processos e clientes com interface intuitiva.</p>
              </div>
              
              <div className="p-6 rounded-xl border border-gray-100 shadow-sm hover-lift card-shimmer bg-white">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Automação Fiscal</h3>
                <p className="text-gray-600 text-sm">Identificação automática de créditos recuperáveis de IRRF/PJ.</p>
              </div>
              
              <div className="p-6 rounded-xl border border-gray-100 shadow-sm hover-lift card-shimmer bg-white">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Relatórios Detalhados</h3>
                <p className="text-gray-600 text-sm">Geração de relatórios completos para compensação tributária.</p>
              </div>
            </div>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover-lift border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Segurança e Auditoria</h3>
                <p className="text-gray-600">Implementação de Autenticação de Dois Fatores (2FA) para administradores, expiração automática de sessão e logout remoto para maior controle de acessos.</p>
              </div>
              
              <div className="p-8 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover-lift border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Geração de Relatórios Estratégicos</h3>
                <p className="text-gray-600">Simulação de compensação futura, incluindo correção monetária pela Selic, relatórios específicos para PER/DCOMP e decisões judiciais.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-6 bg-gradient-to-r from-gray-100 to-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Logo size="sm" animated={false} className="mx-auto mb-4" />
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Cláudio Figueiredo Advogados Associados. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
