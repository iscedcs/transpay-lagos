import ActivityList from "@/components/pages/activities/activity-list";
import { Card } from "@/components/ui/card";
import { getAllActivities } from "@/lib/controllers/activity.controller";

export default async function Activity() {
     const session = { user: { access_token: "your_access_token_here" } }; // Replace with actual session data
     const all_activities = await getAllActivities({ user: { access_token: session.user.access_token } });
     return (
          <div className="mb-8 flex h-[90svh] w-full flex-col gap-3 p-2 xs:p-5">
               <div className="mb-20 flex flex-col gap-2">
                    <div className="flex justify-between py-2">
                         <div className="shrink-0 grow-0 text-title1Bold">Activity History</div>
                    </div>
                    <Card className="bg-secondary">
                         <ActivityList 
                              limit={20} 
                              page={1} 
                              allActivities={all_activities?.rows} 
                              meta={{
                                   total: all_activities?.rows.length || 0,
                                   total_pages: Math.ceil((all_activities?.rows?.length || 0) / 20),
                                   page: 1
                              }} 
                         />
                    </Card>
               </div>
          </div>
     );
}
