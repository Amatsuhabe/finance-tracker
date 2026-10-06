'use client'

import { create } from "zustand";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm, useWatch, type Control } from "react-hook-form"
import { cn } from "@/lib/utils"
import { Label } from "../../ui/label"
import { Check, Pipette } from "lucide-react"
import { Category } from "@/lib/types";
import { CategoryData, categorySchema } from "@/lib/schemas/add-category";
import { Input } from "@/components/ui/input";
import { CATEGORY_COLORS, CATEGORY_ICONS } from "@/lib/const";
import CategoryItem from "../category-item";


interface CategoryModalState {
  category: Category | null;

  isDeleteOpen: boolean;
  openDelete: (category: Category) => void;
  setIsDeleteOpen: (isOpen: boolean) => void;

  isAddOpen: boolean;
  setIsAddOpen: (isOpen: boolean) => void;

  isEditOpen: boolean;
  openEdit: (category: Category) => void;
  setIsEditOpen: (isOpen: boolean) => void;
}

export const useCategoryModalStore = create<CategoryModalState>((set) => ({
  category: null,

  isDeleteOpen: false,
  openDelete: (category: Category) => set({ category, isDeleteOpen: true }),
  setIsDeleteOpen: (isOpen: boolean) => set({ isDeleteOpen: isOpen }),

  isAddOpen: false,
  setIsAddOpen: (isOpen: boolean) => set({ isAddOpen: isOpen }),

  isEditOpen: false,
  openEdit: (category: Category) => set({ category, isEditOpen: true }),
  setIsEditOpen: (isOpen: boolean) => set({ isEditOpen: isOpen }),
}))

function CategoryPreview({ control }: { control: Control<CategoryData> }) {
  const values = useWatch({ control })

  return (
    <CategoryItem
      id="preview"
      name={values.name ?? ""}
      type={values.type ?? "expense"}
      icon={values.icon ?? Object.keys(CATEGORY_ICONS)[0]}
      color={values.color ?? CATEGORY_COLORS[0]}
    />
  )
}

export default function CategoryModalContent({ defaultValues, onSubmit, formId }: { defaultValues?: Partial<CategoryData>; onSubmit: (data: CategoryData) => void; formId?: string }) {
  const { control, handleSubmit } = useForm<CategoryData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: defaultValues?.name || "",
      type: defaultValues?.type || "expense",
      icon: defaultValues?.icon || Object.keys(CATEGORY_ICONS)[0],
      color: defaultValues?.color || CATEGORY_COLORS[0],
    }
  })

  return (
    <form id={formId} className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <div className="flex gap-3">
              <Input placeholder="e.g. Coffee" {...field} />
            </div>
          </div>
        )}>
      </Controller>

      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => field.onChange("expense")}
                className={cn(
                  "flex items-center justify-center w-full px-3 py-1 bg-transparent text-muted-foreground border font-medium rounded-md duration-200 select-none",
                  field.value === "expense" ? "border-expense bg-expense/20 text-expense" : "hover:text-foreground cursor-pointer"
                )}
              >
                Expense
              </button>

              <button
                type="button"
                onClick={() => field.onChange("income")}
                className={cn(
                  "flex items-center justify-center w-full px-3 py-1 bg-transparent text-muted-foreground border font-medium rounded-md duration-200 select-none",
                  field.value === "income" ? "border-income bg-income/20 text-income" : "hover:text-foreground cursor-pointer"
                )}
              >
                Income
              </button>

              <button
                type="button"
                onClick={() => field.onChange("both")}
                className={cn(
                  "flex items-center justify-center w-full px-3 py-1 bg-transparent text-muted-foreground border font-medium rounded-md duration-200 select-none",
                  field.value === "both" ? "border-primary/20 bg-primary/20 text-primary" : "hover:text-foreground cursor-pointer"
                )}
              >
                Both
              </button>
            </div>
          </div>
        )}>
      </Controller>

      <Controller
        name="icon"
        control={control}
        render={({ field }) => (
          <div className="space-y-2">
            <Label htmlFor="icon">Icon</Label>
            <div className="rounded-md border p-1 h-40 overflow-y-auto">
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(CATEGORY_ICONS).map(([iconName, Icon]) => (
                  <div key={iconName} onClick={() => field.onChange(iconName)} className={cn("p-2 rounded-md cursor-pointer border duration-200", field.value === iconName ? "border-primary bg-primary/10 text-primary" : "border-transparent hover:bg-muted text-muted-foreground")}>
                    <Icon size={16} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}>
      </Controller>

      <Controller
        name="color"
        control={control}
        render={({ field }) => (
          <div className="space-y-2">
            <Label htmlFor="color">Color</Label>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORY_COLORS.map(color => (
                <div key={color} onClick={() => field.onChange(color)} className="w-8 h-8 cursor-pointer">
                  <div className={cn("flex items-center justify-center w-full h-full rounded-full duration-200", field.value === color ? "border-foreground border scale-110" : "border-transparent hover:bg-muted")} style={{ backgroundColor: color }}>
                    {
                      field.value === color && (
                        <Check className="w-4 h-4" />
                      )
                    }
                  </div>
                </div>
              ))}

              <label htmlFor="color-picker">
                <div className="relative flex justify-center items-center border-foreground border rounded-full w-8 h-8 cursor-pointer hover:bg-foreground/10 duration-200">
                  <Pipette size={16} />
                  <Input id="color-picker" className="absolute opacity-0 pointer-events-none" type="color" value={field.value} onChange={(e) => field.onChange(e.target.value)} />
                </div>
              </label>

            </div>
          </div>
        )}>
      </Controller>

      <CategoryPreview control={control} />
    </form >
  )
}