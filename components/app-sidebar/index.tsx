import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import LogoutButton from "./logout-button";
import { TrendingUp } from "lucide-react";
import NavItems from "./nav-items";
import Link from "next/link";

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuButton size="lg" asChild>
          <Link href="/">
            <div className="flex aspect-square items-center justify-center size-8 bg-primary text-primary-foreground rounded-lg">
              <TrendingUp size={16} />
            </div>
            <div className="font-bold tracking-tight">Finio</div>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <NavItems />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t">
        <LogoutButton />
      </SidebarFooter>
    </Sidebar>
  )
}