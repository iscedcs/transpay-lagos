import { getGroupById } from "@/actions/groups";
import EditVehicleDialogDrawer from "@/app/(root)/vehicles/[id]/admin-edit/edit-vehicle-dialog-drawer";
import { auth } from "@/auth";
import { DeleteVehicleButton } from "@/components/delete-vehicle-from-group-button";
import { AddVehicleToGroup } from "@/components/ui/add-vehicle-to-group";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RequestSticker from "@/components/ui/request-sticker";
import { getVehicleById } from "@/lib/controllers/vehicle-controller";
import { formatAddress } from "@/lib/utils";
import { Role } from "@prisma/client";
import { AlertCircle, Group, Truck, User, Wallet } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";


interface PageProps {
     params: Promise<{ id: string }>;
     compId: string;
}
export default async function Component({
      params,
     }:PageProps) {
     const role = (await auth())?.user.role;
     const vehicle = await getVehicleById((await params).id);
     if (!vehicle) return notFound();
     const vehicleGroup = await getGroupById(vehicle?.groupId)
     const formatDate = (dateString: string) => {
          return new Date(dateString).toLocaleString();
     };

     return (
          <div className="p-4">
               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Card>
                         <CardHeader>
                              <CardTitle className="flex items-center">
                                   <Truck className="mr-2" />
                                   Vehicle Information
                              </CardTitle>
                         </CardHeader>
                         <CardContent>
                              <dl className="grid grid-cols-2 gap-4">
                                   <div>
                                        <dt className="font-semibold">Plate Number</dt>
                                        <dd>{vehicle?.plateNumber}</dd>
                                   </div>
                                   <div>
                                        <dt className="font-semibold">Category</dt>
                                        <dd>{vehicle?.category}</dd>
                                   </div>
                                   <div>
                                        <dt className="font-semibold">Status</dt>
                                        <dd>
                                             <Badge variant={vehicle?.status === "ACTIVE" ? "default" : "destructive"}>{vehicle?.status}</Badge>
                                        </dd>
                                   </div>
                                   <div>
                                        <dt className="font-semibold">Blacklisted</dt>
                                        <dd>{vehicle?.blacklisted ? "Yes" : "No"}</dd>
                                   </div>
                                   <div>
                                        <dt className="font-semibold">T-Code</dt>
                                        <dd>{vehicle?.tCode}</dd>
                                   </div>
                                   <div>
                                        <dt className="font-semibold">Security Code</dt>
                                        <dd>{vehicle?.securityCode}</dd>
                                   </div>
                                   <div>
                                        <dt className="font-semibold">Created At</dt>
                                        <dd>{formatDate(String(vehicle?.createdAt))}</dd>
                                   </div>
                              </dl>
                         </CardContent>
                    </Card>

                    <Card>
                         <CardHeader>
                              <CardTitle className="flex items-center">
                                   <User className="mr-2" />
                                   Owner Information
                              </CardTitle>
                         </CardHeader>
                         <CardContent>
                              <dl className="grid grid-cols-2 gap-4">
                                   <div>
                                        <dt className="font-semibold">Name</dt>
                                        {/* @ts-ignore  */}
                                        {`${vehicle?.owner.firstName || "N/A"} ${vehicle?.owner.lastName || ""}`.trim()}
                                   </div>
                                   <div>
                                        <dt className="font-semibold">Phone</dt>
                                        <dd>{vehicle?.owner.phone || "N/A"}</dd>
                                   </div>
                                   <div>
                                        <dt className="font-semibold">Gender</dt>
                                        <dd>{vehicle.owner.gender || "N/A"}</dd>
                                   </div>
                                   <div>
                                        <dt className="font-semibold">Marital Status</dt>
                                        <dd>{vehicle.owner.marital_status || "N/A"}</dd>
                                   </div>
                                   <div>
                                        <dt className="font-semibold">Email</dt>
                                        {/* @ts-ignore  */}
                                        <dd>{vehicle?.owner.email || "N/A"}</dd>
                                   </div>
                                   <div>
                                        <dt className="font-semibold">Address</dt>
                                        {/* @ts-ignore  */}
                                        <dd>{formatAddress(vehicle?.owner.address) || "N/A"}</dd>
                                   </div>
                              </dl>
                         </CardContent>
                    </Card>

                    <Card>
                         <CardHeader>
                              <CardTitle className="flex items-center">
                                   <Wallet className="mr-2" />
                                   Wallet Information
                              </CardTitle>
                         </CardHeader>
                         <CardContent>
                              <dl className="grid grid-cols-2 gap-4">
                                   <div>
                                        <dt className="font-semibold">Amount Owed</dt>
                                        <dd>₦{Number(vehicle?.wallet?.amount_owed || 0)}</dd>
                                   </div>
                                   <div>
                                        <dt className="font-semibold">Net Total</dt>
                                        <dd>₦{Number(vehicle?.wallet?.net_total || 0)}</dd>
                                   </div>
                                   <div>
                                        <dt className="font-semibold">CVOF Balance</dt>
                                        <dd>₦{Number(vehicle?.wallet?.cvof_balance || 0 )}</dd>
                                   </div>
                                   <div>
                                        <dt className="font-semibold">CVOF Owing</dt>
                                        <dd>₦{Number(vehicle?.wallet?.cvof_owing || 0)}</dd>
                                   </div>
                                   <div>
                                        <dt className="font-semibold">Sticker Balance</dt>
                                        <dd>₦{Number(vehicle?.wallet?.isce_balance || 0)}</dd>
                                   </div>
                                   {role === Role.SUPERADMIN && (
                                        <Button asChild variant={"outline"}>
                                             <Link href={`/vehicles/${vehicle.id}/wallet`}>View Wallet</Link>
                                        </Button>
                                   )}
                              </dl>
                         </CardContent>
                    </Card>

                    <Card>
                         <CardHeader>
                              <CardTitle className="flex items-center">
                                   <AlertCircle className="mr-2" />
                                   Actions
                              </CardTitle>
                         </CardHeader>
                         <CardContent>
                              <div className="flex flex-col gap-4">
                                   <EditVehicleDialogDrawer vehicle={vehicle} />
                                   <RequestSticker id={(await params).id} />
                                   <Button variant="outline" className="w-full">
                                        Manage FareFlex
                                   </Button>
                              </div>
                         </CardContent>
                    </Card>

                    <Card>
                         <CardHeader>
                              <CardTitle className="flex items-center">
                                   <Group className="mr-2" />
                                   Vehicle Group
                              </CardTitle>
                              <CardDescription>{vehicleGroup?.groupName ?? "Vehicle does not belong to any group"}</CardDescription>
                         </CardHeader>
                         <CardContent>
                              <div className="flex flex-col gap-4">{vehicle.groupId ? <DeleteVehicleButton vehicle={vehicle} /> : <AddVehicleToGroup vehicleId={vehicle.id} />}</div>
                         </CardContent>
                    </Card>
                    
                    {/* <Card>
                         <CardHeader>
                              <CardTitle className="flex items-center">Payment History</CardTitle>
                              <div className="pt-[10px] ">
                                   <Table className="rounded-[10px]" >
                                        <TableHeader>
                                             <TableRow>
                                                  <TableHead>Date</TableHead>
                                                  <TableHead>Amount</TableHead>
                                             </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                             {paymentHistory.map((a, b) => (
                                                  <TableRow key={b}>
                                                       <TableCell>{formatDate(a.transaction_createdAt)}</TableCell>
                                                       <TableCell>{a.transaction_amount}</TableCell>
                                                  </TableRow>
                                             ))}
                                        </TableBody>
                                   </Table>
                              </div>
                         </CardHeader>
                    </Card> */}
               </div>
          </div>
     );
}
