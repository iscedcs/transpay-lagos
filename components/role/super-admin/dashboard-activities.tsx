import ActivityCard from "@/components/shared/activity-card";
import { getDashboardActivities } from "@/lib/get-data";

export default async function DashboardActivities() {
     const all_activities = await getDashboardActivities("3");
     return (
          <div className="flex h-full flex-col gap-3 rounded-xl border bg-secondary p-2">
               <div className="px-3 text-2xl">Activities</div>
               <div className="grid gap-3">
                    {all_activities && all_activities.map((activity, k) => <ActivityCard key={k} description={activity.description} name={activity.name} link={`/activities/${activity.id}`} />)}
               </div>
          </div>
     );
}
