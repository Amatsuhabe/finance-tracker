import AppSidebar from "@/components/app-sidebar";
import Header from "@/components/header";
import CategoriesProvider from "@/components/providers/categories-provider";
import AddTransactionModal from "@/components/transactions/add-transaction-modal";
import DeleteTransactionModal from "@/components/transactions/delete-transaction-modal";
import EditTransactionModal from "@/components/transactions/edit-transaction-modal";
import { SidebarProvider } from "@/components/ui/sidebar";
import getSession from "@/lib/auth/get-session";
import { prisma } from "@/lib/prisma";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession()

  const categories = await prisma.category.findMany({
    where: {
      userId: session.user.id
    },
    select: {
      icon: true,
      name: true,
      color: true,
      type: true,
      id: true
    }
  })

  return (
    <CategoriesProvider initialCategories={categories}>
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full">
          <Header />
          <div className="p-6">
            {children}
          </div>
        </div>

        <AddTransactionModal />
        <EditTransactionModal />
        <DeleteTransactionModal />

      </SidebarProvider>
    </CategoriesProvider>
  )
}