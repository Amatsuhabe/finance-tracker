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
  amount: z.number().refine((val) => val > 0, "Amount must be greater than 0"),
  categoryId: z.string().trim(),
  date: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must use YYYY-MM-DD format")
    .refine((value) => {
      const date = new Date(`${value}T00:00:00.000Z`);
      return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
    }, "Invalid date")
    .transform((value) => new Date(`${value}T00:00:00.000Z`)),
  description: z
    .string()
    .max(255, "Description is too long")
    .optional(),
})

export type TransactionData = z.infer<typeof transactionSchema>