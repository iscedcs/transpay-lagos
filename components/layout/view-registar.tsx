import { getVehicleRegistrarCreated, getVehicleRegistrarUpdated } from "@/actions/audit-trails";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export default async function ViewRegistrar({
     image,
     name,
     description,
     id,
     tCode,
     plateNumber,
}: {
     image?: string;
     name: string;
     description: string;
     id: string;
     tCode: string;
     plateNumber: string;
}) {
     const audit_created = await getVehicleRegistrarCreated(plateNumber);
     const audit_updated = await getVehicleRegistrarUpdated(plateNumber);
     return (
          <>
               <Dialog>
                    <DialogTrigger asChild>
                         <div className="h-[300px] w-full p-1.5 md:p-2.5">
                              <Card className="h-full overflow-hidden bg-secondary shadow-md transition-all hover:shadow-xl">
                                   <CardHeader className="h-[160px] w-full overflow-hidden p-0">
                                        <Image src={image || "/tricycle.jpg"} alt={name} height={140} width={278} className="h-full w-full object-cover object-center" />
                                   </CardHeader>
                                   <CardContent className="p-3">
                                        <div className="flex flex-col gap-1.5">
                                             <div className="text-bodyBold uppercase">{name}</div>
                                             <div className="text-captionBold md:text-bodyBold">{description}</div>
                                        </div>
                                   </CardContent>
                              </Card>
                         </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                         <DialogHeader>
                              <DialogTitle>Vehicle Registrar</DialogTitle>
                         </DialogHeader>
                         <Tabs>
                              <TabsList>
                                   <TabsTrigger value="created">Created By</TabsTrigger>
                                   <TabsTrigger value="updated">Updated By</TabsTrigger>
                              </TabsList>
                              <TabsContent value="created">
                                   {/* @ts-ignore */}
                                   {!audit_created?.meta?.user.name ? (
                                        <p className="text-center">No Information</p>
                                   ) : (
                                        <div className="grid items-center gap-4">
                                             <div className="flex items-center justify-between gap-3">
                                                  <div className="font-bold">Name:</div>
                                                  {
                                                       //@ts-ignore
                                                       audit_created?.meta?.user.name
                                                  }
                                             </div>
                                             <div className="flex items-center justify-between gap-3">
                                                  <div className="font-bold">Email:</div>
                                                  {
                                                       //@ts-ignore
                                                       audit_created?.meta?.user.email
                                                  }
                                             </div>
                                             <div className="flex items-center justify-between gap-3">
                                                  <div className="font-bold">Date:</div>
                                                  {String(audit_updated?.createdAt)}
                                             </div>
                                             <div className="flex items-center justify-between gap-3">
                                                  <div className="font-bold">Action:</div>
                                                  {audit_created?.name.split("_").join(" ")}
                                             </div>
                                        </div>
                                   )}
                              </TabsContent>
                              <TabsContent value="updated">
                                   {/* @ts-ignore */}
                                   {!audit_updated?.meta?.user.name ? (
                                        <p className="text-center">No Information</p>
                                   ) : (
                                        <div className="grid items-center gap-4">
                                             <div className="flex items-center justify-between gap-3">
                                                  <div className="font-bold">Name:</div>
                                                  {
                                                       //@ts-ignore
                                                       audit_updated?.meta?.user.name
                                                  }
                                             </div>
                                             <div className="flex items-center justify-between gap-3">
                                                  <div className="font-bold">Email:</div>
                                                  {
                                                       //@ts-ignore
                                                       audit_updated?.meta?.user.email
                                                  }
                                             </div>
                                             <div className="flex items-center justify-between gap-3">
                                                  <div className="font-bold">Date:</div>
                                                  {format(audit_updated?.updatedAt!, "MMM dd, h:mm a")}
                                             </div>
                                             <div className="flex items-center justify-between gap-3">
                                                  <div className="font-bold">Action:</div>
                                                  {audit_updated?.name.split("_").join(" ")}
                                             </div>
                                        </div>
                                   )}
                              </TabsContent>
                         </Tabs>
                         {/* <div className="grid gap-4 py-4">
                              <div className="grid items-center gap-4">
                                   {!audit && "No Agent Found"}
                                   <div className="flex items-center justify-between gap-3">
                                        <div className="font-bold">Name:</div>
                                        {
                                             //@ts-ignore
                                             audit?.meta?.user.name
                                        }
                                   </div>
                                   <div className="flex items-center justify-between gap-3">
                                        <div className="font-bold">Email:</div>
                                        {
                                             //@ts-ignore
                                             audit?.meta?.user.email
                                        }
                                   </div>
                                   <div className="flex items-center justify-between gap-3">
                                        <div className="font-bold">Date:</div>
                                        {format(audit?.createdAt!, "MMM dd, h:mm a")}
                                   </div>
                                   <div className="flex items-center justify-between gap-3">
                                        <div className="font-bold">Action:</div>
                                        {audit?.name.split("_").join(" ")}
                                   </div>
                              </div>
                         </div> */}
                    </DialogContent>
               </Dialog>
          </>
     );
}
