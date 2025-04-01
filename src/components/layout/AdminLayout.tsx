
import React from 'react';
import { Card } from '@/components/ui/card';
import { Helmet } from 'react-helmet';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  title,
  description,
}) => {
  return (
    <>
      <Helmet>
        <title>{title} | Painel Administrativo</title>
      </Helmet>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        <Card className="p-6">
          {children}
        </Card>
      </div>
    </>
  );
};

export default AdminLayout;
