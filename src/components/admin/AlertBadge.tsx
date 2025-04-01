
import React from 'react';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface AlertBadgeProps extends BadgeProps {
  type: 'info' | 'success' | 'warning' | 'error';
  children: React.ReactNode;
}

const AlertBadge: React.FC<AlertBadgeProps> = ({ type, className, children, ...props }) => {
  const badgeClass = cn(
    className,
    {
      'bg-blue-100 text-blue-800 hover:bg-blue-100/80': type === 'info',
      'bg-green-100 text-green-800 hover:bg-green-100/80': type === 'success',
      'bg-amber-100 text-amber-800 hover:bg-amber-100/80': type === 'warning',
      'bg-red-100 text-red-800 hover:bg-red-100/80': type === 'error',
    }
  );

  return (
    <Badge className={badgeClass} {...props}>
      {children}
    </Badge>
  );
};

export default AlertBadge;
