import { SidebarProvider } from "../hooks/use-sidebar";
import Sidebar from "./components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex">
        <Sidebar />
        <main className="w-full flex-1 overflow-hidden">{children}</main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
