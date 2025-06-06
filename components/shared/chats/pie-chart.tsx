"use client";

import {
     Card,
     CardContent,
     CardDescription,
     CardHeader,
     CardTitle,
} from "@/components/ui/card";
import { COLORS } from "@/lib/const";
import {
     Cell,
     Legend,
     Pie,
     PieChart,
     ResponsiveContainer,
     Tooltip,
} from "recharts";

// Define the type for the prop data
interface VehiclePieChartProps {
     data: { name: string; value: number }[]; // Expected shape of the data
}

export default function VehiclePieChart({ data }: VehiclePieChartProps) {
     return (
          <Card className="">
               <CardHeader>
                    <CardTitle>Vehicle Type Distribution</CardTitle>
                    <CardDescription>
                         Breakdown of charged vehicles by type
                    </CardDescription>
               </CardHeader>
               <CardContent>
                    <ResponsiveContainer width="100%" className="aspect-square">
                         <PieChart>
                              <Pie
                                   data={data}
                                   cx="50%"
                                   cy="50%"
                                   labelLine={false}
                                   // outerRadius={200}
                                   fill="#8884d8"
                                   dataKey="value"
                              >
                                   {data.map((entry, index) => (
                                        <Cell
                                             key={`cell-${index}`}
                                             fill={
                                                  COLORS[index % COLORS.length]
                                             }
                                        />
                                   ))}
                              </Pie>
                              <Tooltip />
                              <Legend className="hidden xl:inline-block" />
                         </PieChart>
                    </ResponsiveContainer>
               </CardContent>
          </Card>
     );
}
