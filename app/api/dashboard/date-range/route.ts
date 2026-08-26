import getSession from "@/lib/auth/get-session";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getSession()

  const { _min, _max } = await prisma.transaction.aggregate({
    where: {
      userId: session.user.id
    },
    _min: {
      date: true
    },
    _max: {
      date: true
    }
  })

  return NextResponse.json({ min: _min.date, max: _max.date }, { status: 200 })
}