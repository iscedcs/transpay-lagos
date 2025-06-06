// import ActivityCardGS from '@/components/pages/activities/activity-card-google-style';
// import { PaginationISCE } from '@/components/shared/pagination-isce';
// import { format } from 'date-fns';

// export default function ActivityList({
// 	allActivities,
// 	page,
// 	limit,
// }: {
// 	allActivities:
// 		| {
// 				rows: IActivity[];
// 				meta: {
// 					total: number;
// 					total_pages: number;
// 					page: number;
// 				};
// 		  }
// 		| undefined;
// 	page: string;
// 	limit: string;
// }) {
// 	const start = (Number(page) - 1) * Number(limit);
// 	const end = start + Number(limit);

// 	// const activitiesByDate: Record<string, IActivity[]> | undefined =
// 	// 	allActivities?.rows.reduce((acc, activity) => {
// 	// 		const date = new Date(activity.createdAt);
// 	// 		const dateString = format(date, 'yyyy-MM-dd');

// 	// 		if (!acc[dateString]) {
// 	// 			acc[dateString] = [];
// 	// 		}

// 	// 		acc[dateString].push(activity);
// 	// 		return acc;
// 	// 	}, {} as Record<string, IActivity[]>);

// 	// Convert the organized data into an array for rendering
// 	// const activityGroups = activitiesByDate
// 	// 	? Object.entries(activitiesByDate).map(([date, activities]) => ({
// 	// 			date,
// 	// 			activities,
// 	// 	  }))
// 	// 	: [];

// 	// activityGroups.sort(
// 	// 	(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
// 	// );
// 	return (
// 		<div className='px-3 lg:px-5 flex flex-col gap-2'>
// 			{allActivities?.rows ? (
// 				allActivities?.rows.map((a, b) => (
// 					<ActivityCardGS
// 						key={b}
// 						id={a.id}
// 						name={a.name}
// 						activity_id={a.id}
// 						time={format(new Date(a.createdAt), 'h:mm a')}
// 						date={format(new Date(a.createdAt), 'MMM dd,')}
// 						description={a.description}
// 						user_id={a.meta ? a.meta.user.id : ''}
// 						user_role={a.meta ? a.meta.user.role : ''}
// 					/>
// 				))
// 			) : (
// 				<div className='p-4 flex items-center justify-center'>
// 					No Activities Found
// 				</div>
// 			)}
// 			{allActivities && allActivities.rows && (
// 				<PaginationISCE
// 					hasNextPage={end < allActivities.meta.total}
// 					hasPrevPage={start > 0}
// 					page={Number(page)}
// 					limit={Number(limit)}
// 					total={allActivities.meta.total}
// 					hrefPrefix='/activities'
// 				/>
// 			)}
// 		</div>
// 	);
// }

// "use client";
// import { getActivities } from "@/actions/audit-trails";
// import { PaginationISCE } from "@/components/shared/pagination-isce";
// import { format } from "date-fns";
// import React, { useEffect, useState } from "react";

// export default function ActivityList() {
//      const [activities, setActivities] = useState<IActivity[]>([]);
//      const [page, setPage] = useState(1);
//      const [limit, setLimit] = useState(15);
//      const [total, setTotal] = useState(0);

//      const start = (page - 1) * limit;
//      const end = start + activities.length;

//      useEffect(() => {
//           async function fetchActivities() {
//                try {
//                     const data = await getActivities(page, limit);
//                     const formattedData = data.map((activity) => ({
//                          ...activity,
//                          createdAt: format(new Date(activity.createdAt), "yyyy-MM-dd hh:mm:ss"),
//                          updatedAt: format(new Date(activity.updatedAt), "yyyy-MM-dd hh:mm:ss"),
//                     }));
//                     setActivities(formattedData);
//                     setTotal(activities.length);
//                } catch (err) {
//                     console.log("Activities not found:", err);
//                } finally {
//                     console.log("Fetching activities complete");
//                }
//           }
//           fetchActivities();
//      }, [page, limit]);

//      const handlePageChange = (newPage: number) => {
//           setPage(newPage);
//      };

//      return (
//           <div>
//                {activities.map((activity) => (
//                     <div className="mt-[20px]" key={activity.id}>
//                          <p>{activity.name}</p>
//                          <p>{activity.description}</p>
//                          <p>{activity.createdAt}</p>
//                     </div>
//                ))}

//                {total > 0 && (
//                     <PaginationISCE
//                          hasNextPage={end < total}
//                          hasPrevPage={start > 0}
//                          page={page}
//                          limit={limit}
//                          total={total}
//                          onPageChange={handlePageChange} // Handle pagination click
//                          hrefPrefix="/activities"
//                     />
//                )}
//           </div>
//      );
// }
"use client";

import { PaginationISCE } from "@/components/shared/pagination-isce";
import { getAllActivities } from "@/lib/controllers/activity.controller";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import ActivityCardGS from "./activity-card-google-style";
import { auth } from "@/auth";

interface ActivityListProps {
     allActivities: IActivity[];
     meta: { total: number; total_pages: number; page: number };
     page: number;
     limit: number;
 }

export default function ActivityList({ allActivities,meta, page, limit }: ActivityListProps) {

     const total = meta.total || 0;
     const start = (Number(page) - 1) * Number(limit);
     const end = start + Number(limit);

     return (
          <div className="w-full">
               <h1 className="text-center text-[30px] font-bold md:text-left">All Activities ({total})</h1>
               <div className="mt-[20px] grid grid-cols-1 gap-3 md:grid-cols-2">
                    {allActivities.length > 0 ? (
                       allActivities?.map((activity: IActivity) => (
                              <ActivityCardGS
                                   key={activity.id}
                                   name={activity.name}
                                   description={activity.description}
                                   date={format(new Date(activity.createdAt), "yyyy-MM-dd hh:mm:ss")}
                                   link={`/activities/${activity.id}`}
                              />
                         ))
                    ): (
                         <div className="flex items-center justify-center p-4">
                              No Activities Found
                         </div>
                    )}
               </div>
               {total > 0 ? <PaginationISCE hasNextPage={end < total} hasPrevPage={page > 1} page={page} limit={limit} total={total} hrefPrefix="/activities" /> : ""}
          </div>
     );
}
