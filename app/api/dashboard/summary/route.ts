import { getSummary } from "@/lib/data/summary";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
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

  const summary = await getSummary({ month: summaryMonth, year: summaryYear, isAllTimePeriod })

  return NextResponse.json(summary, { status: 200 })
}