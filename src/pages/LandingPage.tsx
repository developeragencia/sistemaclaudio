
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import { ArrowRight } from 'lucide-react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';

const features = [
  {
    title: "Controle Inteligente",
    description: "Gestão completa de processos e clientes com interface intuitiva.",
    icon: "💼"
  },
  {
    title: "Automação Fiscal",
    description: "Identificação automática de créditos recuperáveis de IRRF/PJ.",
    icon: "🔍"
  },
  {
    title: "Relatórios Detalhados",
    description: "Geração de relatórios completos para compensação tributária.",
    icon: "📊"
  }
];

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <div className="flex-grow flex flex-col items-center justify-center px-4 py-10">
        <div className="mb-10 animate-fade-in">
          <Logo animated size="xl" className="mx-auto" />
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 text-gray-800 animate-fade-in animate-delay-1 max-w-4xl">
          Sistema de Recuperação de Créditos Tributários
        </h1>
        
        <p className="text-lg md:text-xl text-center text-gray-600 mb-10 max-w-3xl animate-fade-in animate-delay-2">
          Solução automatizada para apuração e recuperação de créditos tributários de IRRF/PJ,
          garantindo conformidade com a legislação vigente e otimizando processos de auditoria fiscal.
        </p>
        
        <div className="animate-fade-in animate-delay-3 mb-16">
          <Link to="/login" className="gradient-button group bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center">
            Acessar Sistema
            <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </Link>
        </div>
        
        <div className="w-full max-w-5xl px-4 mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10 text-gray-800 animate-fade-in">
            Nossos Recursos
          </h2>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {features.map((feature, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="bg-gradient-to-br from-white to-gray-50 border-gray-200 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className="text-4xl mb-4 bg-blue-50 p-4 rounded-full w-16 h-16 flex items-center justify-center animate-float">
                          {feature.icon}
                        </div>
                        <CardTitle className="text-lg font-semibold text-gray-800 mb-2">
                          {feature.title}
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                          {feature.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-4">
              <CarouselPrevious className="relative inset-auto left-0 right-0 mx-2 bg-white text-gray-800 border-gray-300 hover:bg-gray-100" />
              <CarouselNext className="relative inset-auto left-0 right-0 mx-2 bg-white text-gray-800 border-gray-300 hover:bg-gray-100" />
            </div>
          </Carousel>
        </div>
        
        <div className="w-full max-w-4xl px-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 shadow-sm text-center animate-float">
              <h3 className="text-xl font-semibold mb-4">+5000 processos</h3>
              <p className="text-gray-600">Gerenciados com sucesso através da nossa plataforma</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 shadow-sm text-center animate-float animation-delay-2">
              <h3 className="text-xl font-semibold mb-4">R$ 25M+</h3>
              <p className="text-gray-600">Em créditos tributários recuperados para nossos clientes</p>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="w-full py-6 bg-gray-50 border-t border-gray-200 text-center text-gray-500 text-sm">
        <div className="container mx-auto px-4">
          <p>
            Desenvolvido por <a href="https://alexdesenvolvedor.com.br" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-primary font-medium transition-colors">Alex Developer</a>
          </p>
          <p className="mt-2">© 2025 Sistemas Cláudio Figueiredo. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
