'use client'

import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

interface WeeklyOverviewChartProps {
  summary: { date: Date; totalDayIncome: number; totalDayExpenses: number }[]
}

export default function CashFlowChart({ summary }: WeeklyOverviewChartProps) {
  const data = summary.map((day, index) => ({
    name: `Day ${index + 1}`,
    Expenses: day.totalDayExpenses,
    Income: day.totalDayIncome,
  }));

  return (
    <ResponsiveContainer height={240} width="100%" debounce={50} className={"**:focus:outline-none"}>
      <LineChart data={data} margin={{ right: 24 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />

        <XAxis
          dataKey={"name"}
          interval={0}
          tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          width="auto"
          tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => value > 1000 ? `$${value / 1000}k` : value}
          tickMargin={10}
        />

        <Tooltip
          contentStyle={{
            background: "var(--background)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            color: "var(--foreground)",
          }}
          cursor={{ fill: "var(--border)" }}
          content={({ payload, label }) => {
            const incomeData = payload.find((item) => item.dataKey === 'Income');
            const expensesData = payload.find((item) => item.dataKey === 'Expenses');

            return (
              <div className="bg-zinc-900/90 border border-border p-3 rounded-lg text-xs space-y-1.5 will-change-transform">
                <p className="text-muted-foreground font-medium">{label}</p>

                {incomeData && (
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-1.5 text-income">
                      <span className="w-2 h-2 rounded-full bg-income" />
                      Income:
                    </span>
                    <span className="font-semibold">
                      ${incomeData?.value ?? 0}
                    </span>
                  </div>
                )}

                {expensesData && (
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-1.5 text-expense">
                      <span className="w-2 h-2 rounded-full bg-expense" />
                      Expenses:
                    </span>
                    <span className="font-semibold">
                      ${expensesData?.value ?? 0}
                    </span>
                  </div>
                )}
              </div>
            )
          }}
        />

        <Legend
          wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
          formatter={(value) => (
            <span style={{ color: "var(--muted-foreground)" }}>{value}</span>
          )}
        />

        <Line dataKey="Expenses" fill="var(--expense)" stroke='var(--expense)' strokeWidth={2} type={"monotone"} animationDuration={500} animationEasing="cubic-bezier(0.16, 1, 0.3, 1)"></Line>
        <Line dataKey="Income" fill="var(--income)" stroke='var(--income)' strokeWidth={2} type={"monotone"} animationDuration={500} animationEasing="cubic-bezier(0.16, 1, 0.3, 1)"></Line>
      </LineChart>
    </ResponsiveContainer>
  )
}