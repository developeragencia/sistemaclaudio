
import React, { useState, useEffect } from 'react';

interface LogoProps {
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withSubtitle?: boolean;
  className?: string;
  interactive?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  animated = false, 
  size = 'md', 
  withSubtitle = true,
  className = '',
  interactive = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [animationTriggered, setAnimationTriggered] = useState(false);

  useEffect(() => {
    if (animated) {
      setAnimationTriggered(true);
      const timer = setTimeout(() => setAnimationTriggered(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [animated]);

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

  const animationClasses = animated ? 'animate-float' : '';
  const interactiveClasses = interactive ? 'cursor-pointer' : '';
  const hoverEffects = isHovered ? 'scale-105' : '';

  return (
    <div 
      className={`flex items-center ${className} ${interactiveClasses} transition-all duration-300 ${hoverEffects}`}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
    >
      <div className={`logo-container ${animationClasses} relative`}>
        <div className={`absolute inset-0 rounded-full bg-gray-100 ${animated || isHovered ? 'animate-pulse-soft' : ''}`} 
             style={{ filter: 'blur(8px)', opacity: 0.7, transform: 'scale(0.9)' }} />
        <img 
          src="/lovable-uploads/b5ab68a5-181d-4e3b-b687-86db1d8e229c.png" 
          alt="Cláudio Figueiredo Logo" 
          className={`${sizeClasses[size]} relative z-10 transition-all duration-500 
                     ${(animated || isHovered) ? 'animate-pulse-soft' : ''}
                     ${animationTriggered ? 'animate-spin-slow' : ''}`}
        />
      </div>
      <div className="ml-3 flex flex-col">
        <h1 className={`logo-text ${textSizes[size]} text-gradient transition-all duration-300
                       ${(animated || isHovered) ? 'animate-fade-in-right' : ''}
                       ${isHovered ? 'tracking-wider' : ''}`}>
          CLÁUDIO FIGUEIREDO
        </h1>
        {withSubtitle && (
          <span className={`logo-subtitle ${subtitleSizes[size]} transition-all duration-500
                           ${(animated || isHovered) ? 'animate-fade-in animate-delay-2' : ''}
                           ${isHovered ? 'text-figueiredo-gray-600' : ''}`}>
            ADVOGADOS ASSOCIADOS
          </span>
        )}
      </div>
    </div>
  );
};

export default Logo;
