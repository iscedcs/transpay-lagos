"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { RegistrationData } from "@/types/overview"

interface RegistrationsByDayProps {
  data: RegistrationData[]
}

export function RegistrationsByDay({ data }: RegistrationsByDayProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Registrations</CardTitle>
        <CardDescription>New vehicle registrations over the last 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
            <YAxis />
            <Tooltip
              labelFormatter={(value) => new Date(value).toLocaleDateString()}
              formatter={(value) => [value, "Registrations"]}
            />
            <Bar dataKey="registrations" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
