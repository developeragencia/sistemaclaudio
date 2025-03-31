
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface LogoProps {
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withSubtitle?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  animated = false, 
  size = 'md', 
  withSubtitle = true,
  className = '' 
}) => {
  const isMobile = useIsMobile();
  
  // Use specific animation classes based on device type
  const animationClasses = animated 
    ? isMobile ? 'animate-fade-in' : 'animate-float' 
    : '';

  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-24'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };

  const subtitleSizes = {
    sm: 'text-[8px]',
    md: 'text-xs',
    lg: 'text-sm',
    xl: 'text-base'
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`logo-container ${animationClasses}`}>
        <img 
          src="/lovable-uploads/b5ab68a5-181d-4e3b-b687-86db1d8e229c.png" 
          alt="Cláudio Figueiredo Logo" 
          className={`${sizeClasses[size]} ${animated && !isMobile ? 'animate-pulse' : ''}`}
        />
      </div>
      <div className="ml-3 flex flex-col">
        <h1 className={`logo-text ${textSizes[size]} ${animated ? 'animate-fade-in' : ''}`}>
          CLÁUDIO FIGUEIREDO
        </h1>
        {withSubtitle && (
          <span className={`logo-subtitle ${subtitleSizes[size]} ${animated ? 'animate-fade-in animate-delay-2' : ''}`}>
            ADVOGADOS ASSOCIADOS
          </span>
        )}
      </div>
    </div>
  );
};

export default Logo;
