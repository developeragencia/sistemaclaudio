import { ScrollArea } from "@/components/ui/scroll-area";

const activities = [
  {
    id: 1,
    title: "Nova auditoria iniciada",
    description: "Cliente: Empresa ABC Ltda",
    timestamp: "Há 2 horas",
  },
  {
    id: 2,
    title: "Crédito identificado",
    description: "R$ 25.000,00 em créditos tributários",
    timestamp: "Há 3 horas",
  },
  {
    id: 3,
    title: "Relatório gerado",
    description: "Análise mensal de retenções",
    timestamp: "Há 5 horas",
  },
  {
    id: 4,
    title: "Novo cliente cadastrado",
    description: "XYZ Comércio e Serviços",
    timestamp: "Há 1 dia",
  },
  {
    id: 5,
    title: "Compensação realizada",
    description: "Processo #12345 finalizado",
    timestamp: "Há 1 dia",
  },
];

export function RecentActivity() {
  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-8">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium leading-none">
                {activity.title}
              </p>
              <p className="text-sm text-muted-foreground">
                {activity.description}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {activity.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
} 