import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/contexts/AuthContext';
import {
  Building2,
  FileCheck,
  FileSearch,
  Percent,
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Shield,
  Bell,
  List,
  BarChart,
  Database,
  GitFork,
  Globe,
  FileEdit,
  BookOpen,
  LifeBuoy,
  MessageSquare,
  Calculator,
  FileSpreadsheet,
  FileClock,
  FileKey,
  FileImport,
  FileBarChart,
  FileStack,
  FilePieChart,
  FileSignature,
  FileTerminal,
  FileBox,
  FileArchive,
  FileSearch2,
} from 'lucide-react';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

interface Route {
  title: string;
  href?: string;
  icon?: any;
  items?: {
    title: string;
    href: string;
    icon?: any;
  }[];
}

const clientRoutes: Route[] = [
  {
    title: 'Principal',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Clientes',
    href: '/clients',
    icon: Users,
  },
  {
    title: 'Propostas',
    href: '/proposals',
    icon: FileText,
  },
  {
    title: 'Gestão',
    icon: Settings,
    items: [
      {
        title: 'Gestão de Clientes',
        href: '/client-management',
        icon: Users,
      },
      {
        title: 'Propostas Comerciais',
        href: '/commercial-proposals',
        icon: FileText,
      },
    ],
  },
  {
    title: 'Créditos Tributários',
    icon: Calculator,
    items: [
      {
        title: 'Cálculo Avançado',
        href: '/advanced-calculator',
        icon: Calculator,
      },
      {
        title: 'Cálculos IRRF',
        href: '/irrf-calculations',
        icon: FileSpreadsheet,
      },
      {
        title: 'Recuperação IRRF',
        href: '/irrf-recovery',
        icon: FileClock,
      },
      {
        title: 'Identificação de Créditos',
        href: '/credit-identification',
        icon: FileKey,
      },
    ],
  },
  {
    title: 'Importação e Relatórios',
    icon: FileImport,
    items: [
      {
        title: 'Importação de Dados',
        href: '/data-import',
        icon: FileImport,
      },
      {
        title: 'Relatórios Detalhados',
        href: '/detailed-reports',
        icon: FileBarChart,
      },
    ],
  },
  {
    title: 'Compensação',
    icon: FileStack,
    items: [
      {
        title: 'Compensação Tributária',
        href: '/tax-compensation',
        icon: FileStack,
      },
      {
        title: 'Dashboard Interativo',
        href: '/interactive-dashboard',
        icon: FilePieChart,
      },
    ],
  },
  {
    title: 'Documentação',
    icon: FileSignature,
    items: [
      {
        title: 'Comprovantes de Retenção',
        href: '/retention-receipts',
        icon: FileSignature,
      },
      {
        title: 'Relatórios Fiscais',
        href: '/fiscal-reports',
        icon: FileTerminal,
      },
    ],
  },
  {
    title: 'Processos',
    icon: FileBox,
    items: [
      {
        title: 'Correção Monetária',
        href: '/monetary-correction',
        icon: FileBox,
      },
      {
        title: 'Gestão de Auditoria',
        href: '/audit-management',
        icon: FileArchive,
      },
      {
        title: 'Dossiês Tributários',
        href: '/tax-dossiers',
        icon: FileSearch2,
      },
    ],
  },
];

const adminRoutes: Route[] = [
  {
    title: 'Administração',
    icon: Shield,
    items: [
      {
        title: 'Usuários',
        href: '/users',
        icon: Users,
      },
      {
        title: 'Segurança',
        href: '/security',
        icon: Shield,
      },
      {
        title: 'Controle de Acesso',
        href: '/access-control',
        icon: List,
      },
      {
        title: 'Autenticação 2FA',
        href: '/two-factor',
        icon: Shield,
      },
      {
        title: 'Alertas',
        href: '/alerts',
        icon: Bell,
      },
      {
        title: 'Logs',
        href: '/logs',
        icon: List,
      },
    ],
  },
  {
    title: 'Dashboard Admin',
    href: '/admin-dashboard',
    icon: BarChart,
  },
  {
    title: 'Configurações',
    icon: Settings,
    items: [
      {
        title: 'Configurações Gerais',
        href: '/settings',
        icon: Settings,
      },
      {
        title: 'Backup',
        href: '/backup',
        icon: Database,
      },
      {
        title: 'Workflows',
        href: '/workflows',
        icon: GitFork,
      },
    ],
  },
  {
    title: 'Auditoria e Retenções',
    icon: FileSearch,
    items: [
      {
        title: 'Auditoria de Pagamentos',
        href: '/audit',
        icon: FileCheck
      },
      {
        title: 'Alíquotas e Regras',
        href: '/tax-rates',
        icon: Percent
      },
      {
        title: 'Consulta CNPJ',
        href: '/cnpj-integration',
        icon: Building2
      }
    ]
  },
  {
    title: 'Website',
    icon: Globe,
    items: [
      {
        title: 'Gerenciar Website',
        href: '/website',
        icon: Globe,
      },
      {
        title: 'Conteúdo',
        href: '/content',
        icon: FileEdit,
      },
      {
        title: 'Base de Conhecimento',
        href: '/knowledge-base',
        icon: BookOpen,
      },
    ],
  },
  {
    title: 'Suporte',
    icon: LifeBuoy,
    items: [
      {
        title: 'Tickets',
        href: '/support-tickets',
        icon: MessageSquare,
      },
      {
        title: 'Ajuda',
        href: '/help',
        icon: LifeBuoy,
      },
      {
        title: 'Contato',
        href: '/contact',
        icon: MessageSquare,
      },
    ],
  },
];

export function Sidebar({ className }: SidebarProps) {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    if (user?.role === 'admin') {
      setRoutes([...clientRoutes, ...adminRoutes]);
    } else {
      setRoutes(clientRoutes);
    }
  }, [user]);

  return (
    <div className={cn('pb-12', className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Menu
          </h2>
          <ScrollArea className="h-[calc(100vh-10rem)]">
            <div className="space-y-1">
              {routes.map((route, i) => {
                if (!route.items) {
                  return (
                    <Button
                      key={i}
                      asChild
                      variant={pathname === route.href ? 'secondary' : 'ghost'}
                      className="w-full justify-start"
                    >
                      <Link to={route.href || '#'}>
                        {route.icon && (
                          <route.icon className="mr-2 h-4 w-4" />
                        )}
                        {route.title}
                      </Link>
                    </Button>
                  );
                }

                return (
                  <div key={i} className="space-y-1">
                    <h3 className="mb-2 px-4 text-sm font-semibold tracking-tight">
                      {route.title}
                    </h3>
                    {route.items.map((item, j) => (
                      <Button
                        key={j}
                        asChild
                        variant={pathname === item.href ? 'secondary' : 'ghost'}
                        className="w-full justify-start pl-8"
                      >
                        <Link to={item.href}>
                          {item.icon && (
                            <item.icon className="mr-2 h-4 w-4" />
                          )}
                          {item.title}
                        </Link>
                      </Button>
                    ))}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
} 