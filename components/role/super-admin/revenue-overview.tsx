import { getPaymentTotals } from "@/actions/payment-notification";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

export default async function FrequencyRevenueOverview({ frequency }: { frequency: string | undefined }) {
     const { allTimeTotal, yearToDateTotal, monthToDateTotal, weekToDateTotal, dayToDateTotal } = await getPaymentTotals({});
     return (
          <div className="flex flex-row gap-4">
               <Card className="w-full p-[20px]">
                    <h1 className="text-[14px] text-[#333]">Total Revenue Attained</h1>
                    <p className="text-[40px] font-bold">{formatCurrency(Math.round(Number(allTimeTotal)))}</p>
               </Card>
               {frequency != "all" ? (
                    <Card className="w-full p-[20px]">
                         <span>
                              {frequency === "yearly" ? (
                                   <>
                                        <h1 className="text-[14px] text-[#333]">Total Revenue Attained This Year</h1>
                                        <p className="text-[40px] font-bold">{formatCurrency(Math.round(Number(yearToDateTotal)))}</p>
                                   </>
                              ) : frequency === "daily" ? (
                                   <>
                                        <h1 className="text-[14px] text-[#333]">Total Revenue Attained Today</h1>
                                        <p className="text-[40px] font-bold">{formatCurrency(Math.round(Number(dayToDateTotal)))}</p>
                                   </>
                              ) : frequency === "monthly" ? (
                                   <>
                                        <h1 className="text-[14px] text-[#333]">Total Revenue Attained This Month</h1>
                                        <p className="text-[40px] font-bold">{formatCurrency(Math.round(Number(monthToDateTotal)))}</p>
                                   </>
                              ) : frequency === "weekly" ? (
                                   <>
                                        <h1 className="text-[14px] text-[#333]">Total Revenue Attained This Week</h1>
                                        <p className="text-[40px] font-bold">{formatCurrency(Math.round(Number(weekToDateTotal)))}</p>
                                   </>
                              ) : (
                                   ""
                              )}
                         </span>
                    </Card>
               ) : null}
          </div>
     );
}
