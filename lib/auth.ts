import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { createAuthMiddleware } from "better-auth/api";
import { DEFAULT_CATEGORIES } from "./const";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    fields: {
      name: "firstName"
    },
    additionalFields: {
      lastName: {
        type: "string",
        required: true,
        defaultValue: "",
        input: true,
      },
    }
  },
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      const newUser = ctx.context.newSession?.user

      if (!newUser) return;

      if (ctx.path.includes("/sign-up")) {
        await prisma.category.createMany({
          data: DEFAULT_CATEGORIES.map(category => ({
            ...category,
            userId: newUser.id
          }))
        })
      }
    })
  }
});