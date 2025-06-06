import { getAllActivitiesById } from "@/actions/audit-trails";
import ActivityListAction from "@/components/pages/activities/activity-list-action";
import { Card } from "@/components/ui/card";
import { getActivitiesByUser } from "@/lib/controllers/activity.controller";
import { getUser } from "@/lib/controllers/users.controller";
import { notFound } from "next/navigation";

export default async function Activity({ params }: { params: Promise<{ id: string }> }) {
     const agent = await getUser((await params).id);
     if (!agent) return notFound();

     const all_activities = await getActivitiesByUser({ user_id: (await params).id });
     if (!all_activities) return notFound();
     return (
          <div className="mb-8 flex w-full flex-col gap-3 p-2 xs:p-5">
               <div className="mb-20 flex flex-col gap-2">
                    <div className="flex justify-between py-2">
                         <div className="shrink-0 grow-0 text-title1Bold">Activity History</div>
                    </div>
                    <Card className="bg-secondary py-3">
                         <ActivityListAction allActivities={all_activities.rows.map(activity => ({
                              ...activity,
                              createdAt: new Date(activity.createdAt),
                              updatedAt: new Date(activity.updatedAt),
                              deletedAt: activity.deletedAt ? new Date(activity.deletedAt) : null,
                         }))} />
                    </Card>
               </div>
          </div>
     );
}
