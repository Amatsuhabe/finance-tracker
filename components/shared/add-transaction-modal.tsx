'use client'

import { TransactionData, transactionSchema } from "@/lib/schemas/add-transaction"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm, useWatch } from "react-hook-form"
import { cn } from "@/lib/utils"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "../ui/calendar"
import { Textarea } from "../ui/textarea"
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react"
import { useCategoriesStore } from "../providers/categories-provider"
import { DynamicIcon, IconName } from "lucide-react/dynamic"
import { toast } from "sonner"

export default function AddTransactionModal() {
  const [isOpen, setIsOpen] = useState(false)

  const categories = useCategoriesStore((state) => state.categories)

  const { control, handleSubmit, setValue, reset } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: "",
      type: "expense",
      date: new Date(),
      description: "",
      categoryId: categories[0]?.id || "",
    }
  })

  const categoryId = useWatch({ control, name: 'categoryId' });
  const type = useWatch({ control, name: 'type' });

  const filteredCategories = categories.filter(category => category.type === "both" || category.type === type)
  const selectedCategory = filteredCategories.find(category => category.id === categoryId)

  useEffect(() => {
    const hasValidSelection = filteredCategories.some(
      (category) => category.id === categoryId
    )

    if (!categoryId || !hasValidSelection) {
      setValue('categoryId', filteredCategories[0]?.id || "")
    }
  }, [filteredCategories, categoryId, setValue])

  const onSubmit = async (data: TransactionData) => {
    toast.promise(
      async () => new Promise(async (resolve, reject) => {
        const res = await fetch("/api/transactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })

        if (!res.ok) reject("Failed to add transaction")

        resolve(res)
        setIsOpen(false)
        reset()
      }),
      {
        loading: "Adding transaction...",
        success: "Transaction added successfully",
        error: (error) => error
      }
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus></Plus>
          <span>Add Transaction</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="md:max-w-md md:w-full" >
        <DialogHeader className="text-base font-medium">
          Add Transaction
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => field.onChange("expense")}
                  className={cn(
                    "flex items-center justify-center w-full px-3 py-2 bg-transparent text-muted-foreground border font-medium rounded-md duration-200 select-none",
                    field.value === "expense" ? "border-expense bg-expense/20 text-expense" : "hover:text-foreground cursor-pointer"
                  )}
                >
                  Expense
                </button>

                <button
                  type="button"
                  onClick={() => field.onChange("income")}
                  className={cn(
                    "flex items-center justify-center w-full px-3 py-2 bg-transparent text-muted-foreground border font-medium rounded-md duration-200 select-none",
                    field.value === "income" ? "border-income bg-income/20 text-income" : "hover:text-foreground cursor-pointer"
                  )}
                >
                  Income
                </button>
              </div>
            )}>
          </Controller>

          <Controller
            name="amount"
            control={control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="amount">Amount</Label>
                <InputGroup>
                  <InputGroupAddon>
                    <InputGroupText>$</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput {...field} onChange={(e) => field.onChange(e.target.value)} className="tabular-nums" type="number" min={0} step={1} placeholder="0.00"></InputGroupInput>

                </InputGroup>
                {fieldState.error && <p className="text-xs text-destructive">{fieldState.error.message}</p>}
              </div>
            )}>
          </Controller>

          <Controller
            name="categoryId"
            control={control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="categoryId">Category</Label>
                <Select value={field.value} onValueChange={(value) => field.onChange(value)} defaultValue={field.value}>
                  <SelectTrigger id="categoryId" className="min-w-48">
                    <SelectValue>
                      {
                        selectedCategory ? (
                          <>
                            <DynamicIcon name={selectedCategory?.icon as IconName} style={{ color: selectedCategory?.color }} />
                            <span>
                              {selectedCategory?.name}
                            </span>
                          </>
                        ) : (
                          <span className="text-muted-foreground">Select a category</span>
                        )
                      }
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent position="popper" align="start" >
                    <SelectGroup>
                      {filteredCategories.map((category) => (
                        <SelectItem key={category.name} value={category.id}>
                          <DynamicIcon name={category.icon as IconName} style={{ color: category.color }} />
                          <span>
                            {category.name}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {fieldState.error && <p className="text-xs text-destructive">{fieldState.error.message}</p>}
              </div>
            )}>
          </Controller>

          <Controller
            name="date"
            control={control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="date">Date</Label>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button type="button" variant={"outline"} data-empty={!field.value} className="justify-start font-normal data-[empty=true]:text-muted-foreground">
                      {field.value ? field.value.toLocaleDateString() : "Pick a date"}

                      <CalendarIcon className="ml-auto text-foreground" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-auto">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={value => field.onChange(value)}
                    ></Calendar>
                  </PopoverContent>
                </Popover>

                {fieldState.error && <p className="text-xs text-destructive">{fieldState.error.message}</p>}
              </div>
            )}>
          </Controller>

          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="description">Description (optional)</Label>

                <Textarea {...field} placeholder="Notes about this transaction..." />

                {fieldState.error && <p className="text-xs text-destructive">{fieldState.error.message}</p>}
              </div>
            )}>
          </Controller>

          <DialogFooter>
            <Button variant={"outline"} type="button" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Transaction</Button>
          </DialogFooter>
        </form >
      </DialogContent>
    </Dialog>

  )
}