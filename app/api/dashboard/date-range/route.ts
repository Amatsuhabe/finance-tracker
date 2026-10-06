import getSession from "@/lib/auth/get-session";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { _min } = await prisma.transaction.aggregate({
    where: {
      userId: session.user.id
    },
    _min: {
      date: true
    }
  })

  return NextResponse.json({ min: _min.date, max: new Date() }, { status: 200 })
}