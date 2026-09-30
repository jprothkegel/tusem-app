import { Header } from "@/ui/components/Header/Header";
import { Sidebar } from "@/ui/components/Sidebar/Sidebar";
import { SidebarProvider } from "@/ui/components/Sidebar/SidebarContext";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="md:grid md:grid-cols-[1fr_6fr] h-full bg-white min-h-0">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-4 text-black">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
