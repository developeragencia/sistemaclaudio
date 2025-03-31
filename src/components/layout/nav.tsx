import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface NavProps extends React.HTMLAttributes<HTMLElement> {}

export function Nav({ className, ...props }: NavProps) {
  const location = useLocation();

  const routes = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/tax-credits",
      label: "Créditos Tributários",
    },
    {
      href: "/calculator",
      label: "Calculadora Avançada",
    },
    {
      href: "/irrf-calculator",
      label: "Cálculos IRRF",
    },
    {
      href: "/irrf-recovery",
      label: "Recuperação IRRF/PJ",
    },
    {
      href: "/credit-identification",
      label: "Identificação de Créditos",
    },
    {
      href: "/payment-audit",
      label: "Auditoria de Pagamentos",
    },
    {
      href: "/tax-rules",
      label: "Regras Tributárias",
    },
  ];

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          to={route.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            location.pathname === route.href ||
            (route.href !== "/" && location.pathname.startsWith(route.href))
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
} 