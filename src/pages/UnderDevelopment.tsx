
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface UnderDevelopmentProps {
  pageName?: string;
}

const UnderDevelopment: React.FC<UnderDevelopmentProps> = ({ pageName }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 animate-fadeIn min-h-[60vh]">
      <h1 className="text-2xl font-bold mb-4">
        {pageName ? `${pageName} - Em Desenvolvimento` : 'Página em Desenvolvimento'}
      </h1>
      <p className="text-muted-foreground mb-6 text-center max-w-lg">
        Esta funcionalidade está sendo implementada e estará disponível em breve.
        Estamos trabalhando para oferecer a melhor experiência possível.
      </p>
      <img 
        src="/placeholder.svg" 
        alt="Em desenvolvimento" 
        className="w-64 h-64 opacity-50 mb-8" 
        loading="lazy" 
      />
      <Button asChild variant="outline" className="gap-2">
        <Link to="/dashboard">
          <ArrowLeft size={16} />
          Voltar para o Dashboard
        </Link>
      </Button>
    </div>
  );
};

export default UnderDevelopment;
