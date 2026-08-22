import getSession from "@/lib/auth/get-session";
import { getTransactions } from "@/lib/data/transactions";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getSession()

  if (!session.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()

  await prisma.transaction.create({
    data: {
      amount: body.amount,
      type: body.type,
      date: new Date(body.date),
      description: body.description,
      category: {
        connect: {
          id: body.categoryId
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

