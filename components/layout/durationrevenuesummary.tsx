export default function DurationRevenueSummary({
     duration,
     totalDurationTricycleRev,
     totalDurationSmallShuttleRev,
     totalDurationBigShuttleRev,
     totalDurationTrackerRev,
     lgaRevenueSummary,
}: IDurationSummary) {
     return (
          <div className="px-[20px]">
               <h2 className="text-title1Bold">{`${duration} REVENUE`}</h2>
               <div className="grid grid-cols-4 gap-[30px] pt-3">
                    <div className="rounded-lg bg-secondary p-[15px] shadow-md">
                         <p className="text-body text-primary">
                              Tricycle Revenue Value
                         </p>
                         <p className="pt-[6px] text-title1">
                              {totalDurationTricycleRev}
                         </p>
                    </div>
                    <div className="rounded-lg bg-secondary p-[15px] shadow-md">
                         <p className="text-body text-primary">
                              Small Shuttle Revenue Value
                         </p>
                         <p className="pt-[6px] text-title1">
                              {totalDurationSmallShuttleRev}
                         </p>
                    </div>
                    <div className="rounded-lg bg-secondary p-[15px] shadow-md">
                         <p className="text-body text-primary">
                              Big Shuttle Revenue Value
                         </p>
                         <p className="pt-[6px] text-title1">
                              {totalDurationBigShuttleRev}
                         </p>
                    </div>
                    <div className="rounded-lg bg-secondary p-[15px] shadow-md">
                         <p className="text-body text-primary">
                              FareFlex Revenue Value
                         </p>
                         <p className="pt-[6px] text-title1">
                              {totalDurationTrackerRev}
                         </p>
                    </div>
               </div>
               <div className="mt-[20px] rounded bg-secondary">
                    <table className="w-full table-fixed">
                         <thead className="border-b text-left text-[14px] text-[#78716C]">
                              <tr className="hover:bg-primary-200">
                                   <td className="px-[20px] py-[15px]">
                                        L.G.A.
                                   </td>
                                   <td className="px-[20px] py-[15px]">
                                        Total Revenue
                                   </td>
                                   <td className="px-[20px] py-[15px]">
                                        Tricycle Revenue
                                   </td>
                                   <td className="px-[20px] py-[15px]">
                                        Small Shuttle Revenue
                                   </td>
                                   <td className="px-[20px] py-[15px]">
                                        Big Shuttle Revenue
                                   </td>
                                   <td className="px-[20px] py-[15px]">
                                        FareFlex Revenue
                                   </td>
                              </tr>
                         </thead>
                         <tbody>
                              {lgaRevenueSummary.map((lga, k) => (
                                   <tr
                                        className="cursor-pointer hover:bg-primary-200"
                                        key={k}
                                   >
                                        <td className="border-b px-[20px] py-[15px]">
                                             {lga.lga}
                                        </td>
                                        <td className="border-b px-[20px] py-[15px]">
                                             {lga.totalRev}
                                        </td>
                                        <td className="border-b px-[20px] py-[15px]">
                                             {lga.tricycleRev}
                                        </td>
                                        <td className="border-b px-[20px] py-[15px]">
                                             {" "}
                                             {lga.smallshuttleRev}{" "}
                                        </td>
                                        <td className="border-b px-[20px] py-[15px]">
                                             {" "}
                                             {lga.bigshuttleRev}{" "}
                                        </td>
                                        <td className="border-b px-[20px] py-[15px]">
                                             {lga.trackerRev}
                                        </td>
                                   </tr>
                              ))}
                         </tbody>
                    </table>
               </div>
          </div>
     );
}
