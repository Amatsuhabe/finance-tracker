'use client'

import { authClient } from "@/lib/auth-client"
import { SidebarMenuButton } from "../ui/sidebar"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LogoutButton() {
  const router = useRouter()

  const handleSignOut = async () => {
    await authClient.signOut()
    router.push("/sign-in")
  }

  return (
    <SidebarMenuButton onClick={handleSignOut} tooltip={"Sign Out"} className="gap-3">
      <LogOut />
      <span>
        Sign Out
      </span>
    </SidebarMenuButton>
  )
}