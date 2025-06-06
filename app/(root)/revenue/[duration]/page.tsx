import DurationRevenueSummary from "@/components/layout/durationrevenuesummary";
import { DURATIONREVENUESUMMARY } from "@/lib/const";

export default function Duration() {
     return (
          <div className="">
               {/* {params.duration} */}
               {DURATIONREVENUESUMMARY.map((value, k) => (
                    <DurationRevenueSummary
                         key={k}
                         duration={value.duration}
                         totalDurationTricycleRev={
                              value.totalDurationTricycleRev
                         }
                         totalDurationSmallShuttleRev={
                              value.totalDurationSmallShuttleRev
                         }
                         totalDurationBigShuttleRev={
                              value.totalDurationBigShuttleRev
                         }
                         totalDurationTrackerRev={value.totalDurationTrackerRev}
                         lgaRevenueSummary={value.lgaRevenueSummary}
                    />
               ))}
          </div>
     );
}
