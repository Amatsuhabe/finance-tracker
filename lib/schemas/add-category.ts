import { z } from "zod"

export const categorySchema = z.object({
  name: z.string().min(2).max(100),
  type: z
    .enum(["income", "expense", "both"]),
  icon: z.string(),
  color: z.string()
})

export type CategoryData = z.infer<typeof categorySchema>