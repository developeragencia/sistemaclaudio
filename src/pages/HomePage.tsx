import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const navigate = useNavigate();

  const recentActivity = [
    {
      id: 1,
      type: "tax-credit",
      description: "Crédito de ICMS aprovado",
      value: 15000.0,
      date: "2024-03-15T14:30:00",
    },
    {
      id: 2,
      type: "tax-rule",
      description: "Nova regra de ISS criada",
      value: null,
      date: "2024-03-14T16:45:00",
    },
    {
      id: 3,
      type: "calculation",
      description: "Cálculo de impostos múltiplos",
      value: 7500.0,
      date: "2024-03-14T11:20:00",
    },
  ];

  const quickStats = [
    {
      title: "Total de Créditos",
      value: "R$ 45.000,00",
      description: "Últimos 30 dias",
      trend: "up",
      percentage: "12",
    },
    {
      title: "Regras Ativas",
      value: "24",
      description: "De 30 regras totais",
      trend: "up",
      percentage: "4",
    },
    {
      title: "Cálculos Realizados",
      value: "156",
      description: "Este mês",
      trend: "down",
      percentage: "8",
    },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button onClick={() => navigate("/app/calculator/advanced")}>
            Nova Calculadora
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {quickStats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className={`h-4 w-4 ${
                      stat.trend === "up" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <path d="M7 17l5-5 5 5M7 7l5 5 5-5" />
                    ) : (
                      <path d="M7 7l5 5 5-5M7 17l5-5 5 5" />
                    )}
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                  <div className="mt-2 flex items-center gap-1 text-xs">
                    <span
                      className={
                        stat.trend === "up"
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {stat.percentage}%
                    </span>
                    <span className="text-muted-foreground">
                      vs. mês anterior
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
                <CardDescription>
                  Últimas ações realizadas no sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {activity.description}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(activity.date)}
                        </p>
                      </div>
                      {activity.value && (
                        <div className="font-medium">
                          {formatCurrency(activity.value)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
                <CardDescription>
                  Acesse as principais funcionalidades
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate("/app/tax-credits")}
                >
                  Gerenciar Créditos Tributários
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate("/app/tax-rules")}
                >
                  Configurar Regras Tributárias
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate("/app/calculator/simple")}
                >
                  Calculadora Simples
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate("/app/calculator/advanced")}
                >
                  Calculadora Avançada
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análises</CardTitle>
              <CardDescription>
                Esta seção está em desenvolvimento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-6">
                <p className="text-muted-foreground">
                  Em breve você poderá visualizar análises detalhadas aqui.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios</CardTitle>
              <CardDescription>
                Esta seção está em desenvolvimento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-6">
                <p className="text-muted-foreground">
                  Em breve você poderá gerar relatórios personalizados aqui.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 