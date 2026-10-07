'use client'

import { CalendarDays, ChevronDownIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useState } from "react";
import useSWR from "swr";
import { cn, fetcher } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MONTHS } from "@/lib/const";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

interface SummaryRange {
  min: { year: number; month: number };
  max: { year: number; month: number };
}

export default function SummaryDateSelector() {
  const { data } = useSWR<SummaryRange>(`/api/dashboard/date-range`, fetcher)
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const monthParam = searchParams?.get("month")
  const yearParam = searchParams?.get("year")

  const selectedMonthNumber = Number(monthParam);
  const selectedYearNumber = Number(yearParam);
  const selectedMonth = monthParam && selectedMonthNumber >= 1 && selectedMonthNumber <= 12
    ? selectedMonthNumber
    : data?.max.month;
  const selectedYear = yearParam && Number.isInteger(selectedYearNumber)
    ? selectedYearNumber
    : data?.max.year;
  const routeKey = `${monthParam ?? ""}:${yearParam ?? ""}`;
  const [yearView, setYearView] = useState<{ routeKey: string; year: number } | null>(null);
  const year = yearView?.routeKey === routeKey ? yearView.year : selectedYear;

  const increaseYear = () => {
    if (data && year !== undefined && year < data.max.year) {
      setYearView({ routeKey, year: year + 1 });
    }
  };

  const decreaseYear = () => {
    if (data && year !== undefined && year > data.min.year) {
      setYearView({ routeKey, year: year - 1 });
    }
  };

  function selectDate(month: string, year: number) {
    if (MONTHS.indexOf(month) + 1 === selectedMonth && year === selectedYear) return;

    const params = new URLSearchParams(searchParams.toString());

    params.set("month", (MONTHS.indexOf(month) + 1).toString());
    params.set("year", year.toString());

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  if (!data || selectedMonth === undefined || selectedYear === undefined || year === undefined) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-fit cursor-pointer items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-1.5 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
        <CalendarDays className="text-primary" />
        <span className="font-semibold text-foreground tabular-nums">
          {MONTHS[selectedMonth - 1]} {selectedYear}
        </span>
        <ChevronDownIcon className="text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64 p-0" sideOffset={6}>
        <DropdownMenuGroup>
          <DropdownMenuLabel className="p-1.5 text-center text-sm">Choose a month</DropdownMenuLabel>
        </DropdownMenuGroup>

        <Separator></Separator>

        <DropdownMenuGroup>
          <div className="p-2 space-y-2">
            <div className="flex justify-between items-center">
              <Button disabled={year <= data.min.year} variant="ghost" className="text-muted-foreground" onClick={decreaseYear}>
                <ChevronLeft />
              </Button>

              <span className="font-semibold text-sm tabular-nums">{year}</span>

              <Button disabled={year >= data.max.year} variant="ghost" className="text-muted-foreground" onClick={increaseYear}>
                <ChevronRight />
              </Button>
            </div>

            <div className="grid grid-cols-3 grid-rows-4 gap-2">
              {MONTHS.map((month) => (
                <Button
                  key={month}
                  className={cn(
                    "text-muted-foreground text-xs font-semibold",
                    MONTHS.indexOf(month) + 1 === selectedMonth && selectedYear === year && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground cursor-default"
                  )}
                  disabled={(year === data.min.year && MONTHS.indexOf(month) + 1 < data.min.month) || (year === data.max.year && MONTHS.indexOf(month) + 1 > data.max.month)}
                  variant="ghost"
                  onClick={() => selectDate(month, year)}
                >
                  {month.slice(0, 3)}
                </Button>
              ))}
            </div>
          </div>
        </DropdownMenuGroup>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}