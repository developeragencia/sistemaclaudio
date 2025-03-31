import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { TaxRulesLayout } from "@/components/layout/tax-rules-layout";
import { HomePage } from "@/pages/home/HomePage";
import { TaxCreditsPage } from "@/pages/tax-credits/TaxCreditsPage";
import { AdvancedCalculatorPage } from "@/pages/calculator/AdvancedCalculatorPage";
import { IRRFCalculatorPage } from "@/pages/irrf/IRRFCalculatorPage";
import { IRRFRecoveryPage } from "@/pages/irrf-recovery/IRRFRecoveryPage";
import { CreditIdentificationPage } from "@/pages/credit-identification/CreditIdentificationPage";
import { PaymentAuditPage } from "@/pages/payment-audit/PaymentAuditPage";
import { TaxRulesPage } from "@/pages/tax-rules/TaxRulesPage";
import { TaxRuleHistoryPage } from "@/pages/tax-rules/history/TaxRuleHistoryPage";
import { TaxRuleSettingsPage } from "@/pages/tax-rules/settings/TaxRuleSettingsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/tax-credits",
        element: <TaxCreditsPage />,
      },
      {
        path: "/calculator",
        element: <AdvancedCalculatorPage />,
      },
      {
        path: "/irrf-calculator",
        element: <IRRFCalculatorPage />,
      },
      {
        path: "/irrf-recovery",
        element: <IRRFRecoveryPage />,
      },
      {
        path: "/credit-identification",
        element: <CreditIdentificationPage />,
      },
      {
        path: "/payment-audit",
        element: <PaymentAuditPage />,
      },
      {
        path: "/tax-rules",
        element: <TaxRulesLayout />,
        children: [
          {
            path: "",
            element: <TaxRulesPage />,
          },
          {
            path: "history",
            element: <TaxRuleHistoryPage />,
          },
          {
            path: "settings",
            element: <TaxRuleSettingsPage />,
          },
        ],
      },
    ],
  },
]); 