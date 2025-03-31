import { Outlet } from "react-router-dom";
import AppLayout from "./AppLayout";

export function Layout() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
} 