import { ReactNode } from "react";
import { Header } from "./Header";
import { AppSidebar } from "./AppSidebar";
import { RightRail } from "./RightRail";
import { useLocation } from "wouter";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface AppShellProps {
  children: ReactNode;
  onSearch?: (query: string) => void;
  rightRail?: ReactNode;
  showRightRail?: boolean;
}

export function AppShell({ children, onSearch, rightRail, showRightRail = false }: AppShellProps) {
  const [, setLocation] = useLocation();

  const handleSearch = (query: string) => {
    if (onSearch) {
      onSearch(query);
    } else {
      setLocation(`/kb?q=${encodeURIComponent(query)}`);
    }
  };

  const sidebarStyle = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={sidebarStyle as React.CSSProperties}>
      <div className="flex h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex flex-col flex-1 min-w-0">
          <Header onSearch={handleSearch} />
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto px-4 lg:px-8 py-8">
              <div className="flex gap-8">
                <div className="flex-1 min-w-0">
                  {children}
                </div>
                {showRightRail && rightRail}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
