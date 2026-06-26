import { SidebarTrigger } from "../ui/sidebar";

export default function Header() {
  return (
    <header className="flex w-full border-b h-14 px-4 items-center">
        <SidebarTrigger />
    </header>
  )
}