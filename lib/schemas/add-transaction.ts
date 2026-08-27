import { z } from "zod"

export const transactionSchema = z.object({
  type: z
    .enum(["income", "expense"]),
  amount: z
    .string()
    .regex(/^\d+(\.\d{2})?$/, "Amount must be a valid number with up to 2 decimal places")
    .transform((val) => parseFloat(val))
    .refine((val) => val > 0, "Amount must be greater than 0"),
  categoryId: z
    .string(),
  date: z
    .date({ error: "Invalid date" }),
  description: z
    .string()
    .max(255, "Description is too long")
    .optional(),
})

export const transactionApiSchema = z.object({
  type: z.enum(["income", "expense"]),
  amount: z.number().positive(),
  categoryId: z.string().trim(),
  date: z.preprocess((value) => {
    if (typeof value === "string" || value instanceof Date) {
      return new Date(value)
    }

    return value
  }, z.date()),
  description: z.string().optional(),
})

export type TransactionData = z.infer<typeof transactionSchema>