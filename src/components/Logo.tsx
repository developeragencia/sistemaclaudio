
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { GavelSquare, Scale } from 'lucide-react';

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

  const iconSizes = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24'
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`logo-container relative ${animationClasses}`}>
        <div className="relative">
          <Scale 
            className={`${iconSizes[size]} text-taxglider-blue-600 ${animated && !isMobile ? 'animate-float' : ''}`}
          />
          <GavelSquare 
            className={`absolute -bottom-1 -right-1 ${size === 'sm' ? 'h-4 w-4' : 'h-6 w-6'} text-taxglider-blue-800 ${animated ? 'animate-pulse' : ''}`}
          />
        </div>
      </div>
      <div className="ml-3 flex flex-col">
        <h1 className={`logo-text font-montserrat font-bold ${textSizes[size]} ${animated ? 'animate-fade-in' : ''} text-taxglider-blue-800`}>
          CLÁUDIO FIGUEIREDO
        </h1>
        {withSubtitle && (
          <span className={`logo-subtitle font-montserrat ${subtitleSizes[size]} ${animated ? 'animate-fade-in animate-delay-2' : ''} text-figueiredo-gray-600`}>
            ADVOGADOS ASSOCIADOS
          </span>
        )}
      </div>
    </div>
  );
};

export default Logo;
