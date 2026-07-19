'use client'

import { CategoriesStore, createCategoriesStore } from "@/lib/stores/categories-store";
import { Category } from "@/lib/types";
import { createContext, useContext } from "react";
import { useStore } from 'zustand'

export const CategoriesStoreContext = createContext<ReturnType<typeof createCategoriesStore> | undefined>(undefined);

export default function CategoriesStoreProvider({ children, initialCategories }: { children: React.ReactNode; initialCategories: Category[] }) {
  const categoriesStore = createCategoriesStore({
    categories: initialCategories
  });

  return (
    <CategoriesStoreContext.Provider value={categoriesStore}>
      {children}
    </CategoriesStoreContext.Provider>
  );
}

export const useCategoriesStore = <T,>(selector: (store: CategoriesStore) => T) => {
  const categoriesStoreContext = useContext(CategoriesStoreContext);
  
  if (!categoriesStoreContext) {
    throw new Error("useCategoriesStore must be used within a CategoriesStoreProvider");
  }
  
  return useStore(categoriesStoreContext, selector);
}