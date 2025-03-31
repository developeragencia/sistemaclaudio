import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import { ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="hero-container bg-white text-gray-800">
      <div className="grid-pattern"></div>
      
      <div className="hero-content">
        <div className="mb-10 animate-fade-in">
          <Logo animated size="xl" className="mx-auto" />
        </div>
        
        <h1 className="hero-title text-gray-800 animate-fade-in animate-delay-1">
          Sistema de Recuperação de Créditos Tributários
        </h1>
        
        <p className="hero-subtitle text-gray-600 animate-fade-in animate-delay-2">
          Solução automatizada para apuração e recuperação de créditos tributários de IRRF/PJ,
          garantindo conformidade com a legislação vigente e otimizando processos de auditoria fiscal.
        </p>
        
        <div className="hero-cta animate-fade-in animate-delay-3">
          <Link to="/login" className="gradient-button group">
            Acessar Sistema
            <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </Link>
        </div>
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in animate-delay-4">
          <div className="p-6 bg-gray-50 backdrop-blur rounded-lg border border-gray-200 transition-all hover:bg-gray-100 hover:scale-105">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Controle Inteligente</h3>
            <p className="text-gray-600 text-sm">Gestão completa de processos e clientes com interface intuitiva.</p>
          </div>
          
          <div className="p-6 bg-gray-50 backdrop-blur rounded-lg border border-gray-200 transition-all hover:bg-gray-100 hover:scale-105">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Automação Fiscal</h3>
            <p className="text-gray-600 text-sm">Identificação automática de créditos recuperáveis de IRRF/PJ.</p>
          </div>
          
          <div className="p-6 bg-gray-50 backdrop-blur rounded-lg border border-gray-200 transition-all hover:bg-gray-100 hover:scale-105">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Relatórios Detalhados</h3>
            <p className="text-gray-600 text-sm">Geração de relatórios completos para compensação tributária.</p>
          </div>
        </div>
        
        <div className="mt-16 pt-10 border-t border-gray-200 text-center animate-fade-in animate-delay-4">
          <p className="text-gray-500 text-sm">© 2025 Sistemas Cláudio Figueiredo. Todos os direitos reservados.</p>
          <p className="mt-1 text-gray-500 text-sm">
            Desenvolvido por <a href="https://alexdesenvolvedor.com.br" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-700 transition-colors">Alex Developer</a>
          </p>
        </div>
      </div>
      
      <footer className="absolute bottom-0 w-full py-4 text-center text-gray-500 text-xs">
        <div>© 2025 Sistemas Cláudio Figueiredo. Todos os direitos reservados.</div>
        <div className="mt-1">
          Desenvolvido por <a href="https://alexdesenvolvedor.com.br" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-700 transition-colors">Alex Developer</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
