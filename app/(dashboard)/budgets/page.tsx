import getSession from "@/lib/auth/get-session";
import { MONTHS } from "@/lib/const";
import { getSummary } from "@/lib/data/summary";
import { getYearMonthInTimeZone } from "@/lib/date-time";
import { redirect } from "next/navigation";

export default async function Budgets({ searchParams }: { searchParams: Promise<{ month: string, year: string, isAllTimePeriod?: string }> }) {
  const session = await getSession()
  if (!session?.user.id) redirect("/sign-in")
  console.log(session)
  const params = await searchParams

  const timeZone = session.user.timezone;

  const { year: currentYear, month: currentMonth } = getYearMonthInTimeZone(new Date(), timeZone);

  const summaryMonth = params.month ? Number(params.month) : currentMonth;
  const summaryYear = params.year ? Number(params.year) : currentYear;

  const isAllTimePeriod = params.isAllTimePeriod === "true"

  const summary = await getSummary({ userId: session.user.id, month: summaryMonth, year: summaryYear, isAllTimePeriod });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-xl font-semibold">Budgets</div>
          <div className="text-muted-foreground text-sm">{MONTHS[summaryMonth - 1]} {summaryYear}</div>
        </div>

        
      </div>
    </div>
  )
}