import { cn } from "@/lib/utils";
import { Calculator, CreditCard, Home, Settings } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface NavProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed: boolean;
}

export function Nav({ className, isCollapsed, ...props }: NavProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const routes = [
    {
      href: "/app/home",
      label: "Dashboard",
      icon: Home,
    },
    {
      href: "/app/tax-credits",
      label: "Créditos",
      icon: CreditCard,
    },
    {
      href: "/app/tax-rules",
      label: "Regras",
      icon: Settings,
    },
    {
      href: "/app/calculator/advanced",
      label: "Calculadora",
      icon: Calculator,
    },
  ];

  return (
    <nav className={cn("flex flex-col gap-4", className)} {...props}>
      {routes.map((route) => {
        const Icon = route.icon;
        const isActive = location.pathname === route.href;

        return (
          <button
            key={route.href}
            onClick={() => navigate(route.href)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900",
              isCollapsed ? "justify-center" : "",
              isActive ? "bg-gray-100 text-gray-900" : "hover:bg-gray-100"
            )}
          >
            <Icon className="h-4 w-4" />
            {!isCollapsed && <span>{route.label}</span>}
          </button>
        );
      })}
    </nav>
  );
} 