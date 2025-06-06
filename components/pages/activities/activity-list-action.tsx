import ActivityCardGS from "@/components/pages/activities/activity-card-google-style";
import { format } from "date-fns";

export default function ActivityListAction({
     allActivities,
}: {
     allActivities:
          | {
                 id: string;
                 createdAt: Date;
                 updatedAt: Date;
                 deletedAt?: Date | null;
                 name: string;
                 description: string;
                 meta: any;
            }[]
          | undefined;
}) {
     // const start = (Number(page) - 1) * Number(limit);
     // const end = start + Number(limit);

     // const activitiesByDate: Record<string, IActivity[]> | undefined =
     // 	allActivities?.rows.reduce((acc, activity) => {
     // 		const date = new Date(activity.createdAt);
     // 		const dateString = format(date, 'yyyy-MM-dd');

     // 		if (!acc[dateString]) {
     // 			acc[dateString] = [];
     // 		}

     // 		acc[dateString].push(activity);
     // 		return acc;
     // 	}, {} as Record<string, IActivity[]>);

     // Convert the organized data into an array for rendering
     // const activityGroups = activitiesByDate
     // 	? Object.entries(activitiesByDate).map(([date, activities]) => ({
     // 			date,
     // 			activities,
     // 	  }))
     // 	: [];

     // activityGroups.sort(
     // 	(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
     // );
     return (
          <div className="flex flex-col gap-2 px-3 lg:px-5">
               {allActivities ? (
                    allActivities.map((activity, b) => (
                         <ActivityCardGS
                              key={activity.id}
                              name={activity.name}
                              description={activity.description}
                              date={format(new Date(activity.createdAt), "yyyy-MM-dd hh:mm:ss")}
                              link={`/activities/${activity.id}`}
                         />
                    ))
               ) : (
                    <div className="flex items-center justify-center p-4">No Activities Found</div>
               )}
          </div>
     );
}
