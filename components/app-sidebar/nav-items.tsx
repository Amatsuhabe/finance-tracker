'use client'

import { ArrowLeftRight, LayoutDashboard, Tag, Target } from "lucide-react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";


const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard
  },
  {
    label: "Transactions",
    href: "/transactions",
    icon: ArrowLeftRight
  },
  {
    label: "Categories",
    href: "/categories",
    icon: Tag
  },
  {
    label: "Budgets",
    href: "/budgets",
    icon: Target
  }
]

export default function NavItems() {
  const pathname = usePathname()

  return (
    <SidebarMenu>
      {navItems.map((item) => {
        const isActive = pathname === item.href

        return (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href}>
              <SidebarMenuButton tooltip={item.label} isActive={isActive}>
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  )
}