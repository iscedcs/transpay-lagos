import { RevenueCharts } from "@/components/shared/chats/revenue-chart";
import { getAllTransactions } from "@/lib/controllers/transactions.controller";
import {
     compareDates,
     transformTransactionsToDaysData,
     transformTransactionsToHoursData,
     transformTransactionsToMonthsData,
     transformTransactionsToWeeksData,
     transformTransactionsToYearsData,
} from "@/lib/utils";
export default async function RevenueChartContainer({
     start,
     end,
     title,
}: {
     start: string;
     end: string;
     title: string;
}) {
     const allTransactions = await getAllTransactions(start, end);
     const scope = compareDates(start, end);

     const formattedData =
          scope === "hourly"
               ? transformTransactionsToHoursData(allTransactions?.rows ?? [])
               : scope === "daily"
                 ? transformTransactionsToDaysData(allTransactions?.rows ?? [])
                 : scope === "weekly"
                   ? transformTransactionsToWeeksData(
                          allTransactions?.rows ?? [],
                     )
                   : scope === "monthly"
                     ? transformTransactionsToMonthsData(
                            allTransactions?.rows ?? [],
                       )
                     : transformTransactionsToYearsData(
                            allTransactions?.rows ?? [],
                       );
     return <RevenueCharts data={formattedData} />;
}
