
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import { ArrowRight, CheckCircle } from 'lucide-react';
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 text-gray-800">
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
          <Link to="/login" className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg group flex items-center shadow-lg hover:shadow-xl transition-all duration-300">
            <span className="relative z-10">Acessar Sistema</span>
            <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>
        
        {/* Features Section with New Design */}
        <div className="w-full max-w-6xl px-4 mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10 text-gray-800 animate-fade-in relative">
            Nossos Recursos
            <span className="block h-1 w-20 bg-blue-500 mx-auto mt-4"></span>
          </h2>
          
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-5 bg-blue-50 text-4xl p-5 rounded-full w-20 h-20 flex items-center justify-center animate-float shadow-md">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                  <div className="w-12 h-1 bg-blue-500 mb-4 rounded-full"></div>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile Carousel */}
          <div className="md:hidden w-full">
            <Carousel
              opts={{
                align: "center",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {features.map((feature, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4">
                    <Card className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                      <CardContent className="p-8 flex flex-col items-center text-center">
                        <div className="text-4xl mb-5 bg-blue-50 p-5 rounded-full w-20 h-20 flex items-center justify-center animate-float shadow-md">
                          {feature.icon}
                        </div>
                        <CardTitle className="text-xl font-bold mb-3 text-gray-800">
                          {feature.title}
                        </CardTitle>
                        <div className="w-12 h-1 bg-blue-500 mb-4 rounded-full"></div>
                        <CardDescription className="text-gray-600">
                          {feature.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-2 mt-6">
                <CarouselPrevious className="relative inset-auto left-0 right-0 mx-2 bg-white text-gray-800 border-gray-300 hover:bg-gray-100" />
                <CarouselNext className="relative inset-auto left-0 right-0 mx-2 bg-white text-gray-800 border-gray-300 hover:bg-gray-100" />
              </div>
            </Carousel>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="w-full max-w-5xl px-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-lg text-center animate-float transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex flex-col items-center">
                <span className="text-blue-600 text-4xl font-bold mb-2">+5000</span>
                <h3 className="text-xl font-semibold mb-3">Processos</h3>
                <p className="text-gray-600">Gerenciados com sucesso através da nossa plataforma</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-lg text-center animate-float animation-delay-2 transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex flex-col items-center">
                <span className="text-blue-600 text-4xl font-bold mb-2">R$ 25M+</span>
                <h3 className="text-xl font-semibold mb-3">Créditos Recuperados</h3>
                <p className="text-gray-600">Em créditos tributários recuperados para nossos clientes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="w-full py-8 bg-gray-800 text-white text-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Logo size="sm" withSubtitle={false} className="mx-auto md:mx-0" />
            </div>
            <div className="mb-4 md:mb-0">
              <p className="text-gray-300">
                Desenvolvido por <a href="https://alexdesenvolvedor.com.br" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 font-medium transition-colors">Alex Developer</a>
              </p>
            </div>
            <div>
              <p className="text-gray-400">© 2025 Sistemas Cláudio Figueiredo. Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
