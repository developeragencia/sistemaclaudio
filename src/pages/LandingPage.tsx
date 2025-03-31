
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import { ArrowRight, ChevronDown, Database, FileText, Shield } from 'lucide-react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800 relative overflow-x-hidden">
      {/* Gradient Background with Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-70 z-0 animate-spin-slow"></div>
      <div className="absolute top-20 left-10 w-64 h-64 bg-figueiredo-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-taxglider-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
      
      {/* Hero Section */}
      <div className="flex-grow flex flex-col items-center justify-center px-4 py-10 z-10">
        <div className={`mb-10 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <Logo animated size="xl" className="mx-auto hover:scale-105 transition-transform duration-300" />
        </div>
        
        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-center max-w-4xl mx-auto mb-6 text-gray-800 transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          Sistema de Recuperação de <span className="bg-gradient-to-r from-taxglider-blue-600 to-taxglider-blue-400 text-transparent bg-clip-text">Créditos Tributários</span>
        </h1>
        
        <p className={`text-xl text-center max-w-3xl mx-auto mb-10 text-gray-600 transition-all duration-1000 delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          Solução automatizada para apuração e recuperação de créditos tributários de IRRF/PJ,
          garantindo conformidade com a legislação vigente e otimizando processos de auditoria fiscal.
        </p>
        
        <div className={`mb-8 flex flex-col sm:flex-row gap-4 items-center justify-center transition-all duration-1000 delay-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <Link to="/login" className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-taxglider-blue-500 to-taxglider-blue-700 px-8 py-3 text-lg font-medium text-white transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl">
            <span className="relative flex items-center">
              Acessar Sistema
              <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={20} />
            </span>
          </Link>
          
          <button 
            onClick={scrollToFeatures}
            className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-gray-700 bg-white border-2 border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 group"
          >
            Saiba mais
            <ChevronDown className="ml-2 transition-transform duration-300 group-hover:translate-y-1" size={20} />
          </button>
        </div>
        
        {/* Animated Scroll Indicator */}
        <div className={`mt-12 animate-bounce transition-opacity duration-1000 delay-1000 ${isVisible ? 'opacity-70' : 'opacity-0'}`}>
          <ChevronDown size={36} className="text-gray-400" />
        </div>
      </div>
      
      {/* Features Section with Card Animation */}
      <div id="features" className="w-full py-20 bg-white z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Recursos <span className="bg-gradient-to-r from-taxglider-blue-600 to-taxglider-blue-400 text-transparent bg-clip-text">Poderosos</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
            {[
              {
                title: "Controle Inteligente",
                description: "Gestão completa de processos e clientes com interface intuitiva.",
                icon: <Database className="h-10 w-10 text-taxglider-blue-500 mb-4" />,
                delay: "0ms"
              },
              {
                title: "Automação Fiscal",
                description: "Identificação automática de créditos recuperáveis de IRRF/PJ.",
                icon: <FileText className="h-10 w-10 text-taxglider-blue-500 mb-4" />,
                delay: "200ms"
              },
              {
                title: "Relatórios Detalhados",
                description: "Geração de relatórios completos para compensação tributária.",
                icon: <Shield className="h-10 w-10 text-taxglider-blue-500 mb-4" />,
                delay: "400ms"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="p-8 bg-white rounded-xl shadow-lg border border-gray-100 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 module-card"
                style={{ animationDelay: feature.delay }}
              >
                <div className="flex flex-col items-center text-center">
                  {feature.icon}
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Testimonial Carousel */}
      <div className="w-full py-20 bg-gray-50 z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            O que nossos <span className="bg-gradient-to-r from-taxglider-blue-600 to-taxglider-blue-400 text-transparent bg-clip-text">clientes dizem</span>
          </h2>
          
          <div className="max-w-5xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent>
                {[
                  {
                    quote: "O sistema simplificou nosso processo de recuperação tributária, economizando tempo e recursos significativos para nossa empresa.",
                    author: "João Silva",
                    company: "Contabilidade Silva & Associados"
                  },
                  {
                    quote: "A automação do sistema permitiu identificar créditos que passariam despercebidos. O retorno sobre o investimento foi surpreendente.",
                    author: "Maria Oliveira",
                    company: "Grupo Empresarial XYZ"
                  },
                  {
                    quote: "Interface intuitiva e relatórios detalhados facilitaram nossa gestão fiscal. Recomendo fortemente.",
                    author: "Carlos Mendes",
                    company: "Indústrias Mendes"
                  }
                ].map((testimonial, index) => (
                  <CarouselItem key={index}>
                    <div className="p-8 bg-white rounded-xl shadow-md">
                      <div className="flex flex-col items-center text-center">
                        <p className="text-lg text-gray-600 italic mb-6">"{testimonial.quote}"</p>
                        <div>
                          <p className="font-semibold text-gray-800">{testimonial.author}</p>
                          <p className="text-sm text-gray-500">{testimonial.company}</p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious className="left-0" />
                <CarouselNext className="right-0" />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="w-full py-20 bg-gradient-to-r from-taxglider-blue-600 to-taxglider-blue-800 z-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para otimizar sua recuperação tributária?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Inicie agora e descubra como nossa solução pode transformar seus processos fiscais.
          </p>
          <Link to="/login" className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-taxglider-blue-700 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 group">
            Começar agora
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="w-full py-6 bg-white text-center text-gray-500 text-sm mt-auto z-10 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <p>
            Desenvolvido por <a href="https://alexdesenvolvedor.com.br" target="_blank" rel="noopener noreferrer" className="text-taxglider-blue-600 hover:text-taxglider-blue-800 transition-colors">Alex Developer</a>
          </p>
          <p className="mt-1">© {new Date().getFullYear()} Sistemas Cláudio Figueiredo. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
