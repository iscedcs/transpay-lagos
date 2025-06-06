import { formatCurrency } from "@/lib/utils";

export default async function RevenueAmountCard({
     startDate,
     endDate,
     title,
     desc,
     type,
     total,
}: {
     startDate?: string;
     endDate?: string;
     title: string;
     desc: string;
     type: "TOTAL" | "YEAR" | "MONTH" | "WEEK" | "DAY" | "CUSTOM";
     total: number;
}) {
     return (
          <div className="relative flex h-24 w-full flex-col justify-between overflow-clip rounded-2xl bg-secondary p-3 shadow-md">
               <div className="">
                    <div className="line-clamp-1 text-sm text-primary">{title}</div>
                    <div className="text-2xl">{formatCurrency(total)}</div>
               </div>
               <div className="flex flex-col items-end justify-end">
                    <div className="text-sm text-gray-800">{desc || "previous 30 days"}</div>
               </div>
               {/* <Meteors number={10} /> */}
          </div>
     );
}
