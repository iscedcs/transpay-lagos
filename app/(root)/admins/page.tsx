import { auth } from "@/auth";
import { PaginationISCE } from "@/components/shared/pagination-isce";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { adminsColumns } from "@/components/ui/table/columns";
import { DataTable } from "@/components/ui/table/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUsers } from "@/lib/controllers/users.controller";
import { addIcon } from "@/lib/icons";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Admins({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
     const resolvedSearchParams = await searchParams; 
     const page = resolvedSearchParams["page"] ?? "1";
     const limit = resolvedSearchParams["limit"] ?? "15";
     const admins = await getUsers({ role: "ADMIN" });

     const session = await auth();
     
     if (!session?.user) {
          return redirect("/sign-in")
     }

     if (!admins || !admins.meta) {
          return <Skeleton className="h-10  w-full grid mx-auto bg-slate-950"/>; 
     }

     const start = (Number(page) - 1) * Number(limit);
     const end = start + Number(limit);
     const totalPages = admins.meta.total_pages;
     
     return (
          <div className="flex h-full w-full flex-col p-5">
               <div className="flex items-center justify-between font-bold uppercase">
                    <div className="shrink-0 grow-0">Admins</div>
                    <div className="shrink-0 grow-0">
                         <Button className="justify-start rounded-xl bg-primary-800 text-white" asChild variant={"default"}>
                              <Link href={"/admins/new-admin"} className="shrink-0 whitespace-nowrap">
                                   <div className="mr-2 h-4 w-4 shrink-0">{addIcon}</div>
                                   New Admin
                              </Link>
                         </Button>
                    </div>
               </div>
               <div className="flex flex-col gap-5">
                    <Tabs defaultValue="all" className="w-full">
                         <TabsList>
                              <TabsTrigger className="" value="all">
                                   All Admins
                              </TabsTrigger>
                         </TabsList>
                         <TabsContent value="all">
                         <DataTable
                         showSearch
                         searchWith="name"
                         searchWithPlaceholder="Search with name"
                         showColumns
                         columns={adminsColumns}
                         data={admins.rows}
                         />
                         {totalPages > 1 && (

                          <PaginationISCE
                         hasNextPage={end < admins.meta.total}
                         hasPrevPage={start > 0}
                         page={Number(page)}
                         limit={Number(limit)}
                         total={admins.meta.total}
                         hrefPrefix="/admins"
                         />
                         )}
                         </TabsContent>
                    </Tabs>
               </div>
          </div>
     );
}
