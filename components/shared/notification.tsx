import { notificationIcon } from "@/lib/icons";
import Link from "next/link";
import ActivityList from "../pages/activities/activity-list";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { getAllActivities } from "@/lib/controllers/activity.controller";

export async function Notification() {
     const session = { user: { access_token: "your_access_token_here" } }; // Replace with actual session data
     const all_activities = await getAllActivities({ user: { access_token: session.user.access_token } });
     return (
          <DropdownMenu>
               <DropdownMenuTrigger asChild>
                    <div className="h-8 w-8 text-primary">{notificationIcon}</div>
               </DropdownMenuTrigger>
               <DropdownMenuContent className="w-72" align="end">
                    <DropdownMenuLabel className="font-normal">
                         <Link href={"/activities"} className="text-sm font-medium leading-none">
                              All Activities
                         </Link>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                         <ActivityList 
                              limit={20} 
                              page={1} 
                              allActivities={all_activities?.rows} 
                              meta={{
                                   total: all_activities?.meta?.total || 0,
                                   total_pages: all_activities?.meta?.total_pages || 0,
                                   page: 1
                              }} 
                         />
                    </DropdownMenuGroup>
               </DropdownMenuContent>
          </DropdownMenu>
     );
}
