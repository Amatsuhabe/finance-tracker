import getSession from "@/lib/auth/get-session";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getSession()

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
  const session = await getSession()

  const transactions = await prisma.transaction.findMany({
    where: {
      userId: session.user.id
    },
  })

  return NextResponse.json(transactions, { status: 200 })
}