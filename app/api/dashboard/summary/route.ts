import { getSummary } from "@/lib/data/summary";
import getSession from "@/lib/auth/get-session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const isAllTimePeriod = request.nextUrl.searchParams.get("isAllTimePeriod") === "true"

  const summaryMonth = Number(request.nextUrl.searchParams.get("month"))
  const summaryYear = Number(request.nextUrl.searchParams.get("year"))

  if (!Number.isInteger(summaryMonth) || summaryMonth > 12 || summaryMonth < 1) {
    return NextResponse.json(
      { error: "Month must be between 1 and 12" },
      { status: 400 }
    )
  }

  if (!Number.isInteger(summaryYear)) {
    return NextResponse.json(
      { error: "Invalid year" },
      { status: 400 }
    )
  }

  const summary = await getSummary({ userId: session.user.id, month: summaryMonth, year: summaryYear, isAllTimePeriod })

  return NextResponse.json(summary, { status: 200 })
}