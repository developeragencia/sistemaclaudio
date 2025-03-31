
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";

interface ModuleCardProps { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  href: string;
  color?: string;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ 
  title, 
  description, 
  icon, 
  href, 
  color = "bg-gradient-to-br from-blue-500 to-blue-700" 
}) => {
  return (
    <Link
      to={href}
      className={cn(
        color,
        "relative overflow-hidden rounded-lg p-6 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 flex flex-col h-48"
      )}
    >
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-0 transition-opacity duration-300 hover:opacity-10 z-0" />
      
      <div className="mb-4 p-2 bg-white bg-opacity-20 rounded-full w-fit">
        {icon}
      </div>
      
      <h3 className="text-lg font-bold mb-2 z-10">{title}</h3>
      <p className="text-sm text-white/90 z-10 line-clamp-3">{description}</p>
      
      <div className="mt-auto flex justify-end">
        <span className="text-xs font-bold uppercase tracking-wider bg-white bg-opacity-20 px-2 py-1 rounded-md">
          Acessar
        </span>
      </div>
    </Link>
  );
};

export default ModuleCard;
