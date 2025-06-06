"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import type { ActivityTrendData } from "@/types/overview"

interface LGAActivityTrendProps {
  data: ActivityTrendData[]
}

export function LGAActivityTrend({ data }: LGAActivityTrendProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Trends</CardTitle>
        <CardDescription>Daily registrations, scans, and payments over the last 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
            <YAxis />
            <Tooltip labelFormatter={(value) => new Date(value).toLocaleDateString()} />
            <Legend />
            <Line type="monotone" dataKey="registrations" stroke="#3b82f6" strokeWidth={2} name="Registrations" />
            <Line type="monotone" dataKey="scans" stroke="#22c55e" strokeWidth={2} name="Scans" />
            <Line type="monotone" dataKey="payments" stroke="#f59e0b" strokeWidth={2} name="Payments" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
