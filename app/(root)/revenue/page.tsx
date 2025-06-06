import SplitPayment from "@/components/pages/activities/revenue/split-payment";
import RevenueAmountCard from "@/components/role/super-admin/revenue-amount-card";
import { Skeleton } from "@/components/ui/skeleton";
import { DATE_RANGE } from "@/lib/const";
import { format, subMonths } from "date-fns";
import { Suspense } from "react";


interface PageProps {
     searchParams: Promise<{ [key: string]: string | undefined }>;
}
export default async function Revenue({
     searchParams,
}: PageProps) {
     // const payments = await allPayments();
     const today = new Date();
     const oneMonthAgo = subMonths(today, 1);

     const start =
          ( await searchParams)["startDate"] ?? format(oneMonthAgo, "yyyy-MM-dd");
     const end = ( await searchParams)["endDate"] ?? format(today, "yyyy-MM-dd");
     const duration = ( await searchParams)["d"] ?? "1M";
     return (
          <div className="flex h-full w-full flex-col gap-3 p-5">
               <div className="flex items-center justify-between">
                    <div className="shrink-0 grow-0">Revenue & Stats</div>
                    {/* <SelectDuration d={duration} /> */}
               </div>
               <div className="flex flex-col gap-5">
                    <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
                         {DATE_RANGE.map(({ type, title, description }, b) => (
                              <Suspense
                                   key={b}
                                   fallback={
                                        <Skeleton className="flex h-24 w-full flex-col justify-between rounded-2xl bg-secondary p-3 shadow-md" />
                                   }
                              >
                                   <RevenueAmountCard
                                        type={type}
                                        title={`${title} Revenue`}
                                        desc={description}
                                   />
                              </Suspense>
                         ))}
                    </div>

                    <SplitPayment />
                    {/* <div className="mb-20 flex flex-col gap-3 rounded-3xl bg-secondary p-5">
                         <RevenueChartContainer
                              start={start}
                              end={end}
                              title="Revenue Chart"
                         />
                    </div> */}
                    {/* <TransactionChart
                         transactions={payments.success?.data ?? []}
                    /> */}
               </div>
          </div>
     );
}
