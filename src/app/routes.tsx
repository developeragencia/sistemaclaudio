import { Navigate, createBrowserRouter } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import LandingPage from "@/pages/LandingPage";
import Login from "@/pages/Login";
import { NotFound } from "@/pages/NotFound";
import { HomePage } from "@/pages/home/HomePage";
import { TaxCreditsPage } from "@/pages/tax-credits/TaxCreditsPage";
import { TaxRulesPage } from "@/pages/tax-rules/TaxRulesPage";
import { TaxRuleHistoryPage } from "@/pages/tax-rules/history/TaxRuleHistoryPage";
import { TaxRuleSettingsPage } from "@/pages/tax-rules/settings/TaxRuleSettingsPage";
import { AdvancedCalculatorPage } from "@/pages/calculator/AdvancedCalculatorPage";
import { SimpleCalculatorPage } from "@/pages/calculator/SimpleCalculatorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/app",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Navigate to="/app/home" replace />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "tax-credits",
        element: <TaxCreditsPage />,
      },
      {
        path: "tax-rules",
        element: <TaxRulesPage />,
      },
      {
        path: "tax-rules/history",
        element: <TaxRuleHistoryPage />,
      },
      {
        path: "tax-rules/settings",
        element: <TaxRuleSettingsPage />,
      },
      {
        path: "calculator/advanced",
        element: <AdvancedCalculatorPage />,
      },
      {
        path: "calculator/simple",
        element: <SimpleCalculatorPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]); 