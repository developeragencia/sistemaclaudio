import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Proposals from "./pages/Proposals";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/layout/AppLayout";
import CNPJIntegration from "./pages/CNPJ/Integration";
import AuditPage from "./pages/Audit/AuditPage";
import TaxRatesPage from "./pages/TaxRates/TaxRatesPage";
import { supabase } from "@/integrations/supabase/client";

const queryClient = new QueryClient();

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

const UnderDevelopment = () => (
  <div className="flex flex-col items-center justify-center p-8">
    <h1 className="text-2xl font-bold mb-4">Página em Desenvolvimento</h1>
    <p className="text-muted-foreground mb-6">Esta funcionalidade está sendo implementada e estará disponível em breve.</p>
    <img src="/placeholder.svg" alt="Em desenvolvimento" className="w-64 h-64 opacity-50" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            
            <Route path="/dashboard" element={<AuthenticatedLayout><Dashboard /></AuthenticatedLayout>} />
            <Route path="/clients" element={<AuthenticatedLayout><Clients /></AuthenticatedLayout>} />
            <Route path="/proposals" element={<AuthenticatedLayout><Proposals /></AuthenticatedLayout>} />
            <Route path="/credits" element={<AuthenticatedLayout><UnderDevelopment /></AuthenticatedLayout>} />
            <Route path="/reports" element={<AuthenticatedLayout><UnderDevelopment /></AuthenticatedLayout>} />
            <Route path="/audit" element={<AuthenticatedLayout><AuditPage /></AuthenticatedLayout>} />
            
            <Route path="/admin-dashboard" element={<AdminLayout><UnderDevelopment /></AdminLayout>} />
            <Route path="/settings" element={<AdminLayout><UnderDevelopment /></AdminLayout>} />
            
            <Route path="/users" element={<AdminLayout><UnderDevelopment /></AdminLayout>} />
            <Route path="/workflows" element={<AdminLayout><UnderDevelopment /></AdminLayout>} />
            <Route path="/knowledge-base" element={<AdminLayout><UnderDevelopment /></AdminLayout>} />
            
            <Route path="/security" element={<AdminLayout><UnderDevelopment /></AdminLayout>} />
            <Route path="/access-control" element={<AdminLayout><UnderDevelopment /></AdminLayout>} />
            <Route path="/logs" element={<AdminLayout><UnderDevelopment /></AdminLayout>} />
            <Route path="/cnpj-integration" element={<AdminLayout><CNPJIntegration /></AdminLayout>} />
            <Route path="/tax-rates" element={<AdminLayout><TaxRatesPage /></AdminLayout>} />
            
            <Route path="/backup" element={<AdminLayout><UnderDevelopment /></AdminLayout>} />
            <Route path="/integrations" element={<AdminLayout><UnderDevelopment /></AdminLayout>} />
            
            <Route path="/website" element={<AdminLayout><UnderDevelopment /></AdminLayout>} />
            <Route path="/content" element={<AdminLayout><UnderDevelopment /></AdminLayout>} />
            
            <Route path="/support-tickets" element={<AdminLayout><UnderDevelopment /></AdminLayout>} />
            <Route path="/help" element={<AdminLayout><UnderDevelopment /></AdminLayout>} />
            <Route path="/contact" element={<AdminLayout><UnderDevelopment /></AdminLayout>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
