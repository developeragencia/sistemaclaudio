import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <a className="flex items-center justify-center" href="#">
          <span className="font-bold text-xl">Sistema Tributário</span>
        </a>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-white to-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Simplifique sua Gestão Tributária
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Automatize seus cálculos, gerencie créditos e mantenha-se em conformidade com a legislação fiscal.
                </p>
              </div>
              <div className="space-x-4">
                <Button onClick={() => navigate("/login")} size="lg">
                  Começar Agora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold tracking-tight">
                    Controle Inteligente
                  </h3>
                  <p className="text-gray-500">
                    Gerencie seus créditos tributários de forma eficiente com nossa plataforma intuitiva.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold tracking-tight">
                    Automação Fiscal
                  </h3>
                  <p className="text-gray-500">
                    Automatize seus cálculos tributários e reduza erros com nossas ferramentas avançadas.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold tracking-tight">
                    Relatórios Detalhados
                  </h3>
                  <p className="text-gray-500">
                    Acesse relatórios completos e tome decisões baseadas em dados precisos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">
          © 2024 Sistema Tributário. Todos os direitos reservados.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Desenvolvido por Claudio Figaro
          </a>
        </nav>
      </footer>
    </div>
  );
}
