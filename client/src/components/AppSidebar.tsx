import { Link, useLocation } from "wouter";
import { ALL_SUBJECTS, getSubjectIcon } from "@/lib/subjects";
import { Home, BookOpen } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";

export function AppSidebar() {
  const [location] = useLocation();

  const isActive = (path: string) => location === path || location.startsWith(path + "/");

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="px-2 py-2 flex items-center justify-between gap-2">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity" data-testid="link-sidebar-logo">
            <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
              <span className="text-sidebar-primary-foreground font-bold text-sm">Σ</span>
            </div>
            <span className="font-bold text-base">SigmaLearn</span>
          </Link>
          <ThemeToggle />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/") && !isActive("/linear") && !isActive("/calculus") && !isActive("/discrete") && !isActive("/kb")}>
                <Link href="/" data-testid="link-sidebar-home">
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/kb")}>
                <Link href="/kb" data-testid="link-sidebar-kb">
                  <BookOpen className="h-4 w-4" />
                  <span>Knowledge Base</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Subjects</SidebarGroupLabel>
          <SidebarMenu>
            {ALL_SUBJECTS.map((subject) => {
              const Icon = getSubjectIcon(subject.icon);
              return (
                <SidebarMenuItem key={subject.id}>
                  <SidebarMenuButton asChild isActive={isActive(subject.route)}>
                    <Link href={subject.route} data-testid={`link-sidebar-${subject.id}`}>
                      <Icon className="h-4 w-4" />
                      <span>{subject.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="px-4 py-3 text-xs text-muted-foreground space-y-1">
          <p className="font-semibold">SigmaLearn</p>
          <p>Open Source Math Platform</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
