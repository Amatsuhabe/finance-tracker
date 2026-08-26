import { getSummary } from "@/lib/data/summary";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const isAllTimePeriod = request.nextUrl.searchParams.get("isAllTimePeriod") === "true"

  const summaryMonth = request.nextUrl.searchParams.get("month")
  const summaryYear = request.nextUrl.searchParams.get("year")

  const summary = await getSummary({ month: Number(summaryMonth), year: Number(summaryYear), isAllTimePeriod })

  return NextResponse.json(summary, { status: 200 })
}