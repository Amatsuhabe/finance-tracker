import getSession from "@/lib/auth/get-session";
import { getTransactions } from "@/lib/data/transactions";
import { transactionApiSchema } from "@/lib/schemas/add-transaction";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getSession()

  if (!session) return NextResponse.json({ error: "Unathorized" }, { status: 401 })

  let body: unknown

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const result = transactionApiSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid transaction data", details: result.error.flatten() },
      { status: 400 }
    )
  }

  const data = result.data

  const category = await prisma.category.findFirst({
    where: {
      id: data.categoryId,
      userId: session.user.id,
    },
  })

  if (!category) {
    return NextResponse.json(
      { error: "Category not found" },
      { status: 404 }
    )
  }

  await prisma.transaction.create({
    data: {
      amount: data.amount,
      type: data.type,
      date: data.date,
      description: data.description,
      category: {
        connect: {
          id: data.categoryId,
          userId: session.user.id
        }
      },
      user: {
        connect: {
          id: session.user.id
        }
      }
    }
  })

  return NextResponse.json({ message: "Transaction added successfully" }, { status: 200 })
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const take = Number(searchParams.get('take'))
  const skip = Number(searchParams.get('skip'))

  const transactions = await getTransactions({ take, skip })

  return NextResponse.json(transactions, { status: 200 })
}

