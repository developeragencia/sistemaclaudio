
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import AppLayout from "./components/layout/AppLayout";
import LoadingSpinner from "./components/ui/loading-spinner";
import ErrorBoundary from "./components/ui/error-boundary";

// Lazy loaded components
const LandingPage = lazy(() => import("./pages/LandingPage"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Clients = lazy(() => import("./pages/Clients"));
const Proposals = lazy(() => import("./pages/Proposals"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CNPJIntegration = lazy(() => import("./pages/CNPJ/Integration"));
const AuditPage = lazy(() => import("./pages/Audit/AuditPage"));
const TaxRatesPage = lazy(() => import("./pages/TaxRates/TaxRatesPage"));
const UnderDevelopment = lazy(() => import("./pages/UnderDevelopment"));

// Admin pages
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const UsersPage = lazy(() => import("./pages/admin/Users"));
const SecuritySettings = lazy(() => import("./pages/admin/SecuritySettings"));
const TaxCalculator = lazy(() => import("./pages/admin/TaxCalculator"));
const ClientsManagement = lazy(() => import("./pages/admin/ClientsManagement"));
const CommercialProposals = lazy(() => import("./pages/admin/CommercialProposals"));
const CreditIdentification = lazy(() => import("./pages/admin/CreditIdentification"));
const AccessControlPage = lazy(() => import("./pages/admin/AccessControl"));
const TwoFactorPage = lazy(() => import("./pages/admin/TwoFactor"));
const AlertsPage = lazy(() => import("./pages/admin/Alerts"));
const LogsPage = lazy(() => import("./pages/admin/Logs"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    }
  }
});

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    const { user } = useAuth();
    
    if (user?.role === 'admin') {
      return <Navigate to="/admin-dashboard" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute>
      <AppLayout>{children}</AppLayout>
    </ProtectedRoute>
  );
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AdminRoute>
      <AppLayout>{children}</AppLayout>
    </AdminRoute>
  );
};

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner />
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/index" element={<Navigate to="/" replace />} />
                  
                  <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                  
                  <Route path="/dashboard" element={<AuthenticatedLayout><Dashboard /></AuthenticatedLayout>} />
                  <Route path="/clients" element={<AuthenticatedLayout><Clients /></AuthenticatedLayout>} />
                  <Route path="/proposals" element={<AuthenticatedLayout><Proposals /></AuthenticatedLayout>} />
                  <Route path="/audit" element={<AuthenticatedLayout><AuditPage /></AuthenticatedLayout>} />
                  
                  {/* Rotas de gerenciamento de clientes */}
                  <Route path="/client-management" element={<AdminLayout><ClientsManagement /></AdminLayout>} />
                  <Route path="/client-detail/:id" element={<AdminLayout><UnderDevelopment pageName="Detalhes do Cliente" /></AdminLayout>} />
                  <Route path="/client-edit/:id" element={<AdminLayout><UnderDevelopment pageName="Editar Cliente" /></AdminLayout>} />
                  
                  {/* Rotas de propostas comerciais */}
                  <Route path="/commercial-proposals" element={<AdminLayout><CommercialProposals /></AdminLayout>} />
                  <Route path="/proposal-detail/:id" element={<AdminLayout><UnderDevelopment pageName="Detalhes da Proposta" /></AdminLayout>} />
                  
                  {/* Rotas de identificação de créditos */}
                  <Route path="/credit-identification" element={<AdminLayout><CreditIdentification /></AdminLayout>} />
                  
                  {/* Rotas de calculadora avançada */}
                  <Route path="/advanced-calculator" element={<AdminLayout><TaxCalculator /></AdminLayout>} />
                  
                  {/* Outras rotas de módulos */}
                  <Route path="/irrf-calculations" element={<AuthenticatedLayout><UnderDevelopment pageName="Cálculos IRRF" /></AuthenticatedLayout>} />
                  <Route path="/irrf-recovery" element={<AuthenticatedLayout><UnderDevelopment pageName="Recuperação IRRF" /></AuthenticatedLayout>} />
                  <Route path="/data-import" element={<AuthenticatedLayout><UnderDevelopment pageName="Importação de Dados" /></AuthenticatedLayout>} />
                  <Route path="/detailed-reports" element={<AuthenticatedLayout><UnderDevelopment pageName="Relatórios Detalhados" /></AuthenticatedLayout>} />
                  <Route path="/tax-compensation" element={<AuthenticatedLayout><UnderDevelopment pageName="Compensação Tributária" /></AuthenticatedLayout>} />
                  <Route path="/interactive-dashboard" element={<AuthenticatedLayout><UnderDevelopment pageName="Dashboard Interativo" /></AuthenticatedLayout>} />
                  <Route path="/retention-receipts" element={<AuthenticatedLayout><UnderDevelopment pageName="Comprovantes de Retenção" /></AuthenticatedLayout>} />
                  <Route path="/fiscal-reports" element={<AuthenticatedLayout><UnderDevelopment pageName="Relatórios Fiscais" /></AuthenticatedLayout>} />
                  <Route path="/monetary-correction" element={<AuthenticatedLayout><UnderDevelopment pageName="Correção Monetária" /></AuthenticatedLayout>} />
                  <Route path="/audit-management" element={<AuthenticatedLayout><UnderDevelopment pageName="Gestão de Auditoria" /></AuthenticatedLayout>} />
                  <Route path="/tax-dossiers" element={<AuthenticatedLayout><UnderDevelopment pageName="Dossiês Tributários" /></AuthenticatedLayout>} />
                  
                  {/* Admin pages */}
                  <Route path="/users" element={<AdminLayout><UsersPage /></AdminLayout>} />
                  <Route path="/security" element={<AdminLayout><SecuritySettings /></AdminLayout>} />
                  <Route path="/access-control" element={<AdminLayout><AccessControlPage /></AdminLayout>} />
                  <Route path="/two-factor" element={<AdminLayout><TwoFactorPage /></AdminLayout>} />
                  <Route path="/alerts" element={<AdminLayout><AlertsPage /></AdminLayout>} />
                  <Route path="/logs" element={<AdminLayout><LogsPage /></AdminLayout>} />
                  
                  <Route path="/admin-dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
                  <Route path="/settings" element={<AdminLayout><UnderDevelopment pageName="Configurações" /></AdminLayout>} />
                  <Route path="/backup" element={<AdminLayout><UnderDevelopment pageName="Backup" /></AdminLayout>} />
                  <Route path="/workflows" element={<AdminLayout><UnderDevelopment pageName="Fluxos de Trabalho" /></AdminLayout>} />
                  <Route path="/integrations" element={<AdminLayout><UnderDevelopment pageName="Integrações" /></AdminLayout>} />
                  <Route path="/cnpj-integration" element={<AdminLayout><CNPJIntegration /></AdminLayout>} />
                  <Route path="/tax-rates" element={<AdminLayout><TaxRatesPage /></AdminLayout>} />
                  
                  <Route path="/website" element={<AdminLayout><UnderDevelopment pageName="Website" /></AdminLayout>} />
                  <Route path="/content" element={<AdminLayout><UnderDevelopment pageName="Conteúdo" /></AdminLayout>} />
                  <Route path="/knowledge-base" element={<AdminLayout><UnderDevelopment pageName="Base de Conhecimento" /></AdminLayout>} />
                  
                  <Route path="/support-tickets" element={<AdminLayout><UnderDevelopment pageName="Tickets de Suporte" /></AdminLayout>} />
                  <Route path="/help" element={<AdminLayout><UnderDevelopment pageName="Ajuda" /></AdminLayout>} />
                  <Route path="/contact" element={<AdminLayout><UnderDevelopment pageName="Contato" /></AdminLayout>} />
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
