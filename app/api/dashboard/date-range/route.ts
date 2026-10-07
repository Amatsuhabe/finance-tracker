import getSession from "@/lib/auth/get-session";
import { prisma } from "@/lib/prisma";
import { getDatePartsUtc, getYearMonthInTimeZone } from "@/lib/date-time";
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

  const timeZone = session.user.timezone || "UTC"
  const now = new Date()
  const min = _min.date
    ? getDatePartsUtc(_min.date)
    : getYearMonthInTimeZone(now, timeZone)
  const max = getYearMonthInTimeZone(now, timeZone)

  return NextResponse.json({ min, max }, { status: 200 })
}