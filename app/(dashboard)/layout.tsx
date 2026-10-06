import AppSidebar from "@/components/app-sidebar";
import AddCategoryModal from "@/components/categories/modals/add-category-model";
import DeleteCategoryModal from "@/components/categories/modals/delete-category-modal";
import EditCategoryModal from "@/components/categories/modals/edit-category-modal";
import Header from "@/components/header";
import AddTransactionModal from "@/components/transactions/modals/add-transaction-modal";
import DeleteTransactionModal from "@/components/transactions/modals/delete-transaction-modal";
import EditTransactionModal from "@/components/transactions/modals/edit-transaction-modal";
import { SidebarProvider } from "@/components/ui/sidebar";
import getSession from "@/lib/auth/get-session";
import { getCategories } from "@/lib/data/categories";
import { redirect } from "next/navigation";
import { SWRConfig } from "swr";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession()
  if (!session?.user.id) redirect("/sign-in")

  const categories = await getCategories({ userId: session.user.id })

  return (
    <SWRConfig value={{ fallback: { "/api/categories": categories } }}>
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full">
          <Header />
          <div className="p-6">
            {children}
          </div>
        </div>

        <AddCategoryModal />
        <EditCategoryModal />
        <DeleteCategoryModal />

        <AddTransactionModal />
        <EditTransactionModal />
        <DeleteTransactionModal />

      </SidebarProvider>
    </SWRConfig>
  )
}