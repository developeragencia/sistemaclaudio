import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons";

export function DashboardStats() {
  const stats = [
    {
      title: "Clientes Ativos",
      value: "246",
      change: "+12.3%",
      trend: "up",
    },
    {
      title: "Créditos Identificados",
      value: "R$ 1.2M",
      change: "+8.2%",
      trend: "up",
    },
    {
      title: "Auditorias em Andamento",
      value: "32",
      change: "-4.5%",
      trend: "down",
    },
    {
      title: "Taxa de Sucesso",
      value: "92%",
      change: "+2.1%",
      trend: "up",
    },
  ];

  return (
    <>
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className={`text-xs ${
              stat.trend === "up" ? "text-green-500" : "text-red-500"
            } flex items-center`}>
              {stat.trend === "up" ? (
                <ArrowUpIcon className="mr-1 h-4 w-4" />
              ) : (
                <ArrowDownIcon className="mr-1 h-4 w-4" />
              )}
              {stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  );
} 