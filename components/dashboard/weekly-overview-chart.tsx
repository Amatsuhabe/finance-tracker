'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface WeeklyOverviewChartProps {
  weeks: { income: number; expenses: number }[]
}

export default function WeeklyOverviewChart({ weeks }: WeeklyOverviewChartProps) {
  const data = weeks.map((week, index) => ({
    name: `Week ${index + 1}`,
    Income: week.income,
    Expenses: week.expenses
  }));

  return (
    <ResponsiveContainer height={240} width="100%">
      <BarChart
        data={data}
        barGap={4}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />

        <XAxis
          dataKey={"name"}
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
          formatter={(value) => [`$${Number(value ?? 0).toLocaleString()}`, undefined]}
        />

        <Legend
          wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
          formatter={(value) => (
            <span style={{ color: "var(--muted-foreground)" }}>{value}</span>
          )}
        />

        <Bar dataKey="Income" fill="var(--income)" radius={[4, 4, 0, 0]} maxBarSize={40} />
        <Bar dataKey="Expenses" fill="var(--expense)" radius={[4, 4, 0, 0]} maxBarSize={40} />

      </BarChart>
    </ResponsiveContainer>
  )
}