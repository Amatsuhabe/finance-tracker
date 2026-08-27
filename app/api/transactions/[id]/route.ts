import getSession from "@/lib/auth/get-session"
import { prisma } from "@/lib/prisma"
import { transactionApiSchema } from "@/lib/schemas/add-transaction"
import { NextResponse } from "next/server"
import z from "zod"

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const session = await getSession()

  if (!session) return NextResponse.json({ error: "Unathorized" }, { status: 401 })

  try {
    const transaction = await prisma.transaction.delete({
      where: {
        id,
        userId: session.user.id
      },
    })

    if (!transaction) return NextResponse.json({ error: "Transaction not found" }, { status: 404 })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: "Failed to delete transaction" },
      { status: 500 }
    )
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
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
      { error: "Invalid transaction data", details: z.treeifyError(result.error) },
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

  try {
    await prisma.transaction.update({
      where: {
        id,
        userId: session.user.id
      },
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
        }
      }
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: "Failed to edit transaction" },
      { status: 500 }
    )
  }
}

