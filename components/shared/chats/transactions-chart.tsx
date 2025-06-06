"use client";

import { Button } from "@/components/ui/button";
import { format, getWeek, getYear, startOfDay, startOfMonth } from "date-fns";
import { useState } from "react";
import {
     CartesianGrid,
     Legend,
     Line,
     LineChart,
     Tooltip,
     XAxis,
     YAxis,
} from "recharts";

type Transaction = {
     id: string;
     createdAt: Date;
     updatedAt: Date;
     deletedAt: Date | null;
     payment_reference: string;
     customerName: string;
     payment_date: Date;
     tcode: string;
     revenueName: string;
     revenue_code: string;
     amount: number; // Changed from Decimal to number for simplicity
     vehicleId: string | null;
};

type ChartDataPoint = {
     name: string;
     total: number;
};

type FilterType = "day" | "week" | "month" | "year";

function formatChartData(
     transactions: Transaction[],
     filterType: FilterType,
): ChartDataPoint[] {
     const groupedData = transactions.reduce(
          (acc, transaction) => {
               let key: string;
               const date = new Date(transaction.payment_date);

               switch (filterType) {
                    case "day":
                         key = format(startOfDay(date), "yyyy-MM-dd");
                         break;
                    case "week":
                         key = `Week ${getWeek(date)}`;
                         break;
                    case "month":
                         key = format(startOfMonth(date), "MMM yyyy");
                         break;
                    case "year":
                         key = getYear(date).toString();
                         break;
               }

               if (!acc[key]) {
                    acc[key] = 0;
               }
               acc[key] += Number(transaction.amount);
               return acc;
          },
          {} as Record<string, number>,
     );

     return Object.entries(groupedData).map(([name, total]) => ({
          name,
          total: Number(total.toFixed(2)), // Ensure we don't have too many decimal places
     }));
}

export default function TransactionChart({
     transactions,
}: {
     transactions: Transaction[];
}) {
     const [filterType, setFilterType] = useState<FilterType>("month");

     const data = formatChartData(transactions, filterType);

     return (
          <div className="mx-auto w-full p-4">
               <div className="mb-4 flex justify-center space-x-2">
                    <Button onClick={() => setFilterType("day")}>Daily</Button>
                    <Button onClick={() => setFilterType("week")}>
                         Weekly
                    </Button>
                    <Button onClick={() => setFilterType("month")}>
                         Monthly
                    </Button>
                    <Button onClick={() => setFilterType("year")}>
                         Yearly
                    </Button>
               </div>
               <LineChart
                    width={600}
                    height={300}
                    data={data}
                    className="mx-auto"
               >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="total" stroke="#8884d8" />
               </LineChart>
          </div>
     );
}
