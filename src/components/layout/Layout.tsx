import { Outlet } from "react-router-dom";
import AppLayout from "./AppLayout";
import { SidebarProvider } from "@/components/ui/sidebar";

export function Layout() {
  return (
    <SidebarProvider>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </SidebarProvider>
  );
} 