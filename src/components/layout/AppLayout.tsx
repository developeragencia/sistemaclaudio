
import React, { useState } from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarTrigger,
  SidebarProvider,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { 
  ChevronDown,
  Home, 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  LogOut, 
  ChevronRight, 
  Building2, 
  FileBarChart,
  Calculator,
  UserCog,
  FileSearch,
  History,
  Shield,
  KeyRound,
  HardDrive,
  Network,
  Workflow,
  BookOpen,
  Globe,
  FileEdit,
  HeartHandshake,
  HelpCircle,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth, Client } from '@/contexts/AuthContext';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import { Link, useLocation } from 'react-router-dom';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user, logout, activeClient, clients, setActiveClient } = useAuth();
  const location = useLocation();
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleClientSelect = (client: Client) => {
    setActiveClient(client);
    setClientDropdownOpen(false);
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="bg-taxglider-blue-700">
          <SidebarHeader className="p-4">
            <div className="flex items-center justify-center">
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Tax<span className="text-taxglider-green-400">Glider</span>
              </h1>
            </div>
          </SidebarHeader>

          <SidebarContent>
            {/* Navegação para todos os usuários */}
            <SidebarGroup>
              <SidebarGroupLabel className="text-gray-400">Navegação</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className={isActiveRoute('/') ? 'menu-item-active' : ''}>
                      <Link to="/" className="flex items-center gap-2">
                        <Home size={18} />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className={isActiveRoute('/clients') ? 'menu-item-active' : ''}>
                      <Link to="/clients" className="flex items-center gap-2">
                        <Building2 size={18} />
                        <span>Clientes</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className={isActiveRoute('/proposals') ? 'menu-item-active' : ''}>
                      <Link to="/proposals" className="flex items-center gap-2">
                        <FileText size={18} />
                        <span>Propostas</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className={isActiveRoute('/credits') ? 'menu-item-active' : ''}>
                      <Link to="/credits" className="flex items-center gap-2">
                        <Calculator size={18} />
                        <span>Apuração de Créditos</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className={isActiveRoute('/reports') ? 'menu-item-active' : ''}>
                      <Link to="/reports" className="flex items-center gap-2">
                        <FileBarChart size={18} />
                        <span>Relatórios</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className={isActiveRoute('/audit') ? 'menu-item-active' : ''}>
                      <Link to="/audit" className="flex items-center gap-2">
                        <FileSearch size={18} />
                        <span>Auditoria</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Menu administrativo - mostrado apenas para usuários com papel admin */}
            {user?.role === 'admin' && (
              <>
                {/* Principal */}
                <SidebarGroup>
                  <SidebarGroupLabel className="text-gray-400">Principal</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild className={isActiveRoute('/admin-dashboard') ? 'menu-item-active' : ''}>
                          <Link to="/admin-dashboard" className="flex items-center gap-2">
                            <BarChart3 size={18} />
                            <span>Painel de Controle</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild className={isActiveRoute('/settings') ? 'menu-item-active' : ''}>
                          <Link to="/settings" className="flex items-center gap-2">
                            <Settings size={18} />
                            <span>Configurações</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                {/* Módulos Principais */}
                <SidebarGroup>
                  <SidebarGroupLabel className="text-gray-400">Módulos Principais</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild className={isActiveRoute('/users') ? 'menu-item-active' : ''}>
                          <Link to="/users" className="flex items-center gap-2">
                            <Users size={18} />
                            <span>Usuários</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild className={isActiveRoute('/workflows') ? 'menu-item-active' : ''}>
                          <Link to="/workflows" className="flex items-center gap-2">
                            <Workflow size={18} />
                            <span>Fluxos de Trabalho</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild className={isActiveRoute('/knowledge-base') ? 'menu-item-active' : ''}>
                          <Link to="/knowledge-base" className="flex items-center gap-2">
                            <BookOpen size={18} />
                            <span>Base de Conhecimento</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                {/* Segurança & Auditoria */}
                <SidebarGroup>
                  <SidebarGroupLabel className="text-gray-400">Segurança & Auditoria</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild className={isActiveRoute('/security') ? 'menu-item-active' : ''}>
                          <Link to="/security" className="flex items-center gap-2">
                            <Shield size={18} />
                            <span>Segurança</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild className={isActiveRoute('/access-control') ? 'menu-item-active' : ''}>
                          <Link to="/access-control" className="flex items-center gap-2">
                            <KeyRound size={18} />
                            <span>Controle de Acesso</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild className={isActiveRoute('/logs') ? 'menu-item-active' : ''}>
                          <Link to="/logs" className="flex items-center gap-2">
                            <History size={18} />
                            <span>Logs do Sistema</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                {/* Operacional */}
                <SidebarGroup>
                  <SidebarGroupLabel className="text-gray-400">Operacional</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild className={isActiveRoute('/backup') ? 'menu-item-active' : ''}>
                          <Link to="/backup" className="flex items-center gap-2">
                            <HardDrive size={18} />
                            <span>Backup & Restauração</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild className={isActiveRoute('/integrations') ? 'menu-item-active' : ''}>
                          <Link to="/integrations" className="flex items-center gap-2">
                            <Network size={18} />
                            <span>Integrações</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                {/* Site e Conteúdo */}
                <SidebarGroup>
                  <SidebarGroupLabel className="text-gray-400">Site e Conteúdo</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild className={isActiveRoute('/website') ? 'menu-item-active' : ''}>
                          <Link to="/website" className="flex items-center gap-2">
                            <Globe size={18} />
                            <span>Website</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild className={isActiveRoute('/content') ? 'menu-item-active' : ''}>
                          <Link to="/content" className="flex items-center gap-2">
                            <FileEdit size={18} />
                            <span>Gerenciar Conteúdo</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                {/* Suporte */}
                <SidebarGroup>
                  <SidebarGroupLabel className="text-gray-400">Suporte</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild className={isActiveRoute('/support-tickets') ? 'menu-item-active' : ''}>
                          <Link to="/support-tickets" className="flex items-center gap-2">
                            <HeartHandshake size={18} />
                            <span>Tickets de Suporte</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild className={isActiveRoute('/help') ? 'menu-item-active' : ''}>
                          <Link to="/help" className="flex items-center gap-2">
                            <HelpCircle size={18} />
                            <span>Ajuda</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild className={isActiveRoute('/contact') ? 'menu-item-active' : ''}>
                          <Link to="/contact" className="flex items-center gap-2">
                            <Phone size={18} />
                            <span>Contato</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </>
            )}
          </SidebarContent>

          <SidebarFooter className="p-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-white">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-taxglider-blue-300 text-white">
                    {user ? getInitials(user.name) : 'US'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{user?.name}</span>
                  <span className="text-xs text-gray-300">{user?.email}</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full justify-start text-white border-taxglider-blue-600 hover:bg-taxglider-blue-600"
                onClick={logout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="bg-white border-b p-2 flex items-center justify-between">
            <div className="flex items-center">
              <SidebarTrigger>
                <Button variant="ghost" size="icon">
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </SidebarTrigger>
              
              <DropdownMenu open={clientDropdownOpen} onOpenChange={setClientDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-4 flex items-center gap-2 border-dashed min-w-[280px] justify-between">
                    {activeClient ? (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-taxglider-blue-100 text-taxglider-blue-700 text-xs">
                            {getInitials(activeClient.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="truncate">{activeClient.name}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">Selecionar cliente ativo</span>
                    )}
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[280px]">
                  <DropdownMenuLabel>Clientes</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {clients.map((client) => (
                    <DropdownMenuItem
                      key={client.id}
                      onClick={() => handleClientSelect(client)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-taxglider-blue-100 text-taxglider-blue-700 text-xs">
                          {getInitials(client.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm">{client.name}</span>
                        <span className="text-xs text-muted-foreground">{client.cnpj}</span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar>
                      <AvatarFallback>{user ? getInitials(user.name) : 'U'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <UserCog className="mr-2 h-4 w-4" />
                    <span>Meu Perfil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configurações</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="flex-1 p-6 overflow-auto bg-gray-50">
            {!activeClient && user?.role !== 'client' && (
              <Card className="mb-6 p-4 border-orange-300 bg-orange-50 border-l-4">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-orange-800">Cliente Ativo não selecionado</h3>
                    <p className="text-sm text-orange-700 mt-1">
                      Selecione um cliente na barra superior para continuar suas operações.
                    </p>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-orange-300 text-orange-700 hover:bg-orange-100"
                    onClick={() => setClientDropdownOpen(true)}
                  >
                    Selecionar Cliente
                  </Button>
                </div>
              </Card>
            )}
            
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
