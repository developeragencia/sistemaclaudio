import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function TaxRulesLayout() {
  const location = useLocation();

  const routes = [
    {
      href: "/tax-rules",
      label: "Regras",
    },
    {
      href: "/tax-rules/history",
      label: "Histórico",
    },
    {
      href: "/tax-rules/settings",
      label: "Configurações",
    },
  ];

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Regras Tributárias</h1>
        <p className="text-muted-foreground">
          Gerencie as regras e configurações do sistema tributário
        </p>
      </div>

      <div className="flex border-b space-x-4">
        {routes.map((route) => (
          <Link
            key={route.href}
            to={route.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              location.pathname === route.href
                ? "border-b-2 border-primary"
                : "hover:border-b-2 hover:border-primary",
              "rounded-none px-4"
            )}
          >
            {route.label}
          </Link>
        ))}
      </div>

      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
} 