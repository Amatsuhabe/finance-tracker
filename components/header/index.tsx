'use client'

import { usePathname } from "next/navigation";
import SummaryDateSelector from "../dashboard/summary-date-selector";
import { SidebarTrigger } from "../ui/sidebar";

export default function Header() {
  const path = usePathname()
  const isDashboard = path === "/dashboard";

  return (
    <header className="flex w-full border-b h-14 px-4 items-center justify-between">
        <SidebarTrigger />

        {isDashboard && <SummaryDateSelector />}
    </header>
  )
}