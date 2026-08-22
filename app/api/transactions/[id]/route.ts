import getSession from "@/lib/auth/get-session"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const session = await getSession()

  if (!session.user) return NextResponse.json({ error: "Unathorized" }, { status: 401 })

  try {
    const transaction = await prisma.transaction.delete({
      where: { id },
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

  if (!session.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()

  try {
    await prisma.transaction.update({
      where: { id },
      data: {
        amount: body.amount,
        type: body.type,
        date: new Date(body.date),
        description: body.description,
        category: {
          connect: {
            id: body.categoryId
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

