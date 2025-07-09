"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts"
import type { Settlement } from "./types"

interface SettlementsChartsProps {
  settlements: Settlement[]
  period: string
}

const COLORS = {
  state: "#0088FE",
  irs: "#00C49F",
  lga: "#FFBB28",
  isce: "#FF8042",
}

export function SettlementsCharts({ settlements, period }: SettlementsChartsProps) {
  // Calculate split data with ISCE
  const splitData = [
    { name: "State", value: 40, amount: 980000, color: COLORS.state },
    { name: "IRS", value: 25, amount: 612500, color: COLORS.irs },
    { name: "LGA", value: 20, amount: 490000, color: COLORS.lga },
    { name: "ISCE", value: 15, amount: 367500, color: COLORS.isce },
  ]

  // Mock trend data with ISCE - replace with actual calculations
  const trendData = [
    { period: "Jan", state: 960000, irs: 600000, lga: 480000, isce: 360000, total: 2400000 },
    { period: "Feb", state: 880000, irs: 550000, lga: 440000, isce: 330000, total: 2200000 },
    { period: "Mar", state: 1040000, irs: 650000, lga: 520000, isce: 390000, total: 2600000 },
    { period: "Apr", state: 980000, irs: 612500, lga: 490000, isce: 367500, total: 2450000 },
  ]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.dataKey}: ₦{entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle className="text-lg">Revenue Split Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={splitData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {splitData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: any, name: string) => [`${value}%`, name]}
                contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {splitData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-medium">₦{item.amount.toLocaleString()}</div>
                  <div className="text-muted-foreground">{item.value}%</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Settlement Trends ({period})</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis tickFormatter={(value) => `₦${(value / 1000000).toFixed(1)}M`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="state" stroke={COLORS.state} strokeWidth={2} name="State" />
              <Line type="monotone" dataKey="irs" stroke={COLORS.irs} strokeWidth={2} name="IRS" />
              <Line type="monotone" dataKey="lga" stroke={COLORS.lga} strokeWidth={2} name="LGA" />
              <Line type="monotone" dataKey="isce" stroke={COLORS.isce} strokeWidth={2} name="ISCE" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-1 md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle className="text-lg">Monthly Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis tickFormatter={(value) => `₦${(value / 1000000).toFixed(1)}M`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="state" fill={COLORS.state} name="State" />
              <Bar dataKey="irs" fill={COLORS.irs} name="IRS" />
              <Bar dataKey="lga" fill={COLORS.lga} name="LGA" />
              <Bar dataKey="isce" fill={COLORS.isce} name="ISCE" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
