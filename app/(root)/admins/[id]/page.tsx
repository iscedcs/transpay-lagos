import { auth } from "@/auth";
import { UpdateAdminForm } from "@/components/forms/update-admin-form";
import ActivityList from "@/components/pages/activities/activity-list";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getAllActivities } from "@/lib/controllers/activity.controller";
import { getUser } from "@/lib/controllers/users.controller";
import { addIcon } from "@/lib/icons";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
     const admin = await getUser((await params).id);
     return {
          title: `Transpay Admin - ${admin?.firstName.toLocaleUpperCase()}`,
     };
}

export default async function SingularAdmin({ params }: { params: Promise<{ id: string }> }) {
     const session = await auth();
     const user = session?.user 
     const all_activities = user
          ? await getAllActivities({ user: { access_token: user.access_token } })
          : [];
     const admin = await getUser((await params).id);

     if (!admin) return notFound();
     else
          return (
               <div className="flex h-full w-full flex-col gap-5 p-3 xs:p-5">
                    <div className="flex flex-col gap-3 xs:gap-5">
                         <div className="space-y-6">
                              <div className="flex h-12 w-full shrink-0 items-center overflow-hidden rounded-2xl bg-primary text-white">
                                   <div className="h-12 w-12 bg-black p-3">{addIcon}</div>
                                   <div className="pl-1">PERSONAL INFORMATION</div>
                              </div>
                              <UpdateAdminForm admin={admin} />
                         </div>
                         <div className="mb-20 flex flex-col gap-2">
                              <div className="flex justify-between py-2">
                                   <div className="shrink-0 grow-0 text-title1Bold">Recent Activities</div>
                                   <Button asChild variant="link">
                                        <Link href={`/admins/${admin.id}/activities`}>See all</Link>
                                   </Button>
                              </div>
                              <div>
                                   <Card className="bg-secondary">
                                        <ActivityList allActivities={Array.isArray(all_activities) ? [] : all_activities?.rows || []} meta={Array.isArray(all_activities) ? { total: 0, total_pages: 0, page: 1 } : all_activities?.meta || { total: 0, total_pages: 0, page: 1 }} page={1} limit={5} />
                                   </Card>
                              </div>
                         </div>
                    </div>
               </div>
          );
}
