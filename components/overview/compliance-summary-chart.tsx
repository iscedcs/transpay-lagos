"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { useState } from "react"
import type { ComplianceData } from "@/types/overview"

interface ComplianceSummaryChartProps {
  data: ComplianceData[]
}

export function ComplianceSummaryChart({ data }: ComplianceSummaryChartProps) {
  const [timeFilter, setTimeFilter] = useState("30")

  const filteredData = data.slice(-Number.parseInt(timeFilter))

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Compliance Trend</CardTitle>
          <CardDescription>Compliant vs non-compliant vehicles over time</CardDescription>
        </div>
        <Select value={timeFilter} onValueChange={setTimeFilter}>
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">7 days</SelectItem>
            <SelectItem value="14">14 days</SelectItem>
            <SelectItem value="30">30 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
            <YAxis />
            <Tooltip
              labelFormatter={(value) => new Date(value).toLocaleDateString()}
              formatter={(value, name) => [value, name === "compliant" ? "Compliant" : "Non-Compliant"]}
            />
            <Legend />
            <Line type="monotone" dataKey="compliant" stroke="#22c55e" strokeWidth={2} name="Compliant" />
            <Line type="monotone" dataKey="nonCompliant" stroke="#ef4444" strokeWidth={2} name="Non-Compliant" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
