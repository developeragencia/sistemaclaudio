import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface NavProps extends React.HTMLAttributes<HTMLElement> {}

export function Nav({ className, ...props }: NavProps) {
  const location = useLocation();

  const routes = [
    {
      href: "/app/home",
      label: "Home",
    },
    {
      href: "/app/tax-credits",
      label: "Créditos Tributários",
    },
    {
      href: "/app/tax-rules",
      label: "Regras Tributárias",
    },
    {
      href: "/app/calculator/advanced",
      label: "Calculadora Avançada",
    },
    {
      href: "/app/calculator/simple",
      label: "Calculadora Simples",
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
            (route.href !== "/app/home" && location.pathname.startsWith(route.href))
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