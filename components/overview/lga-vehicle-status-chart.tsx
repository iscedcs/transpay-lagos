"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import type { VehicleStatusData } from "@/types/overview"

interface LGAVehicleStatusChartProps {
  data: VehicleStatusData[]
}

const COLORS = {
  Compliant: "#22c55e",
  Overdue: "#ef4444",
  "Not Scanned": "#f59e0b",
  "Grace Period": "#3b82f6",
}

export function LGAVehicleStatusChart({ data }: LGAVehicleStatusChartProps) {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{data.status}</p>
          <p className="text-sm text-muted-foreground">
            {data.count} vehicles ({data.percentage}%)
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vehicle Status Distribution</CardTitle>
        <CardDescription>Breakdown of vehicle compliance status in this LGA</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={120} paddingAngle={5} dataKey="count">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.status as keyof typeof COLORS] || "#8884d8"} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
