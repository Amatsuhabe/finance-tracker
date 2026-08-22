import { createStore } from 'zustand/vanilla'
import { Category } from '../types';

export type CategoriesState = {
  categories: Category[];
}

export type CategoriesActions = {
  setCategories: (categories: Category[]) => void;
}

export type CategoriesStore = CategoriesState & CategoriesActions;

export const defaultCategoriesState: CategoriesState = {
  categories: []
}

export const createCategoriesStore = (initState: CategoriesState = defaultCategoriesState) => {
  return createStore<CategoriesStore>()((set) => ({
    ...initState,
    setCategories: (categories: Category[]) => set({ categories })
  }))
}