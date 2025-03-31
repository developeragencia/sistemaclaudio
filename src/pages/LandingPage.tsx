
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import { ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-70 z-0"></div>
      
      <div className="flex-grow flex flex-col items-center justify-center px-4 py-10 z-10">
        <div className="mb-10 animate-fade-in">
          <Logo animated size="xl" className="mx-auto" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-center max-w-4xl mx-auto mb-6 text-gray-800 animate-fade-in animate-delay-1">
          Sistema de Recuperação de Créditos Tributários
        </h1>
        
        <p className="text-xl text-center max-w-3xl mx-auto mb-10 text-gray-600 animate-fade-in animate-delay-2">
          Solução automatizada para apuração e recuperação de créditos tributários de IRRF/PJ,
          garantindo conformidade com a legislação vigente e otimizando processos de auditoria fiscal.
        </p>
        
        <div className="mb-12 animate-fade-in animate-delay-3">
          <Link to="/login" className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg shadow-lg hover:from-gray-800 hover:to-black transition-all duration-300 group">
            Acessar Sistema
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl animate-fade-in animate-delay-4">
          <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100 transition-all hover:shadow-lg hover:translate-y-[-5px]">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Controle Inteligente</h3>
            <p className="text-gray-600">Gestão completa de processos e clientes com interface intuitiva.</p>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100 transition-all hover:shadow-lg hover:translate-y-[-5px]">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Automação Fiscal</h3>
            <p className="text-gray-600">Identificação automática de créditos recuperáveis de IRRF/PJ.</p>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100 transition-all hover:shadow-lg hover:translate-y-[-5px]">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Relatórios Detalhados</h3>
            <p className="text-gray-600">Geração de relatórios completos para compensação tributária.</p>
          </div>
        </div>
      </div>
      
      <footer className="w-full py-4 text-center text-gray-500 text-sm mt-auto z-10">
        <div className="container mx-auto px-4">
          <p>
            Desenvolvido por <a href="https://alexdesenvolvedor.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Alex Developer</a>
          </p>
          <p className="mt-1">© 2025 Sistemas Cláudio Figueiredo. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
