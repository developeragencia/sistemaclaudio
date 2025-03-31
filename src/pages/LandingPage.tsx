
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export function LandingPage() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <a className="flex items-center justify-center" href="/">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="font-bold text-xl"
          >
            Sistema Tributário
          </motion.span>
        </a>
        <div className="ml-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/login")}
            className="transition-all hover:scale-105"
          >
            Login
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-white to-gray-100">
          <div className="container px-4 md:px-6">
            <motion.div 
              className="flex flex-col items-center space-y-4 text-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="space-y-2" variants={itemVariants}>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                  Simplifique sua Gestão Tributária
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Automatize seus cálculos, gerencie créditos e mantenha-se em conformidade com a legislação fiscal.
                </p>
              </motion.div>
              <motion.div variants={itemVariants} className="space-x-4">
                <Button 
                  onClick={() => navigate("/login")} 
                  size="lg"
                  className="transition-all hover:scale-105 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  Começar Agora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <motion.div 
              className="grid gap-6 lg:grid-cols-3 lg:gap-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div 
                className="flex flex-col justify-center space-y-4 p-6 rounded-lg border border-gray-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
                variants={itemVariants}
              >
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold tracking-tight">
                    Controle Inteligente
                  </h3>
                  <p className="text-gray-500">
                    Gerencie seus créditos tributários de forma eficiente com nossa plataforma intuitiva.
                  </p>
                </div>
              </motion.div>
              <motion.div 
                className="flex flex-col justify-center space-y-4 p-6 rounded-lg border border-gray-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
                variants={itemVariants}
              >
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold tracking-tight">
                    Automação Fiscal
                  </h3>
                  <p className="text-gray-500">
                    Automatize seus cálculos tributários e reduza erros com nossas ferramentas avançadas.
                  </p>
                </div>
              </motion.div>
              <motion.div 
                className="flex flex-col justify-center space-y-4 p-6 rounded-lg border border-gray-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
                variants={itemVariants}
              >
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold tracking-tight">
                    Relatórios Detalhados
                  </h3>
                  <p className="text-gray-500">
                    Acesse relatórios completos e tome decisões baseadas em dados precisos.
                  </p>
                </div>
              </motion.div>
            </motion.div>
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
