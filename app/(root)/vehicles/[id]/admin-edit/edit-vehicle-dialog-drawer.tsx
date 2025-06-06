"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { VEHICLE_CATEGORIES } from "@/lib/const";
import { zodResolver } from "@hookform/resolvers/zod";
import { Vehicle } from "@prisma/client";
import { AlertCircle, Car, Edit, User, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const vehicleSchema = z.object({
     plateNumber: z.string().min(1, "Plate number is required"),
     category: z.string().min(1, "Category is required"),
     color: z.string().nullable(),
     type: z.string().nullable(),
     vin: z.string().nullable(),
     barcode: z.string().nullable(),
     owner_gender: z.enum(["MALE", "FEMALE", "OTHER"], { required_error: "Owner gender is required" }),
     owner_marital_status: z.enum(["SINGLE", "MARRIED", "DIVORCED", "WIDOWED"], { required_error: "Owner marital status is required" }),
     fairFlexImei: z.string().nullable(),
     asinNumber: z.string(),
     tCode: z.string().min(1, "T-code is required"),
     blacklisted: z.boolean(),
     status: z.enum(["ACTIVE", "INACTIVE", "CLEARED", "OWING"]),
     owner_firstName: z.string(),
     owner_lastName: z.string(),
     owner_text: z.string(),
     owner_email: z.string().email().nullable(),
     owner_phone: z.string().min(1, "Owner phone is required"),
     owner_lga: z.string().optional(),
     owner_city: z.string().optional(),
     owner_state: z.string().optional(),
     owner_unit: z.string().optional(),
     owner_country: z.string().optional(),
     owner_postal_code: z.string().optional(),
     
});

type VehicleFormData = z.infer<typeof vehicleSchema>;

function EditVehicleForm({ vehicle, onClose }: { vehicle: Vehicle; onClose: () => void }) {
     const [isSubmitting, setIsSubmitting] = useState(false);
     const router = useRouter();

     const form = useForm<VehicleFormData>({
       resolver: zodResolver(vehicleSchema),
       defaultValues: {
         plateNumber: vehicle.plateNumber ?? "",
         category: vehicle.category ?? "OTHERS",
         color: vehicle.color || "",
         type: vehicle.type || "",
         vin: vehicle.vin || "",
         fairFlexImei: vehicle.fairFlexImei || "",
         blacklisted: vehicle.blacklisted,
         status: vehicle.status || "ACTIVE",
         // @ts-expect-error
         owner_firstName: String(vehicle?.owner?.firstName) || "",
         // @ts-expect-error
         owner_lastName: String(vehicle?.owner?.lastName) || "",
         //@ts-expect-error
         owner_email: String(vehicle?.owner?.email) || "",
         //@ts-expect-error
         owner_phone: String(vehicle?.owner?.phone) || "",
         //@ts-expect-error
         owner_text: String(vehicle?.owner?.address?.text) || "",
         //@ts-expect-error
         owner_gender: vehicle?.owner?.gender || "MALE", // Default value
         //@ts-expect-error
         owner_marital_status: vehicle?.owner?.marital_status || "SINGLE",
       },
     });

     async function onSubmit(data: VehicleFormData) {
          setIsSubmitting(true);
          try {
               const updateVehicleResponse = await fetch("/api/create-vehicle", {
                    method: "PUT",
                    body: JSON.stringify({
                         id: vehicle.id,
                         category: data.category,
                         plateNumber: data.plateNumber,
                         asinNumber: data.asinNumber?.trim() !== "" ? data.asinNumber : "NULL",
                         tCode: data.tCode?.trim() !== "" ? data.tCode : "NULL",
                         color: data.color,
                         image: vehicle.image,
                         status: data.status,
                         type: data.type || "",
                         vin: data.vin,
                         // trackerId: vehicle.trackerId,
                         fairFlexImei: vehicle.fairFlexImei,
                         blacklisted: data.blacklisted,
                         owner: {
                              firstName: data.owner_firstName,
                              lastName: data.owner_lastName,
                              phone: data.owner_phone,
                              address: {
                                   text: data.owner_text,
                                   lga: data.owner_lga || "",
                                   city: data.owner_city || "",
                                   state: data.owner_state || "",
                                   unit: data.owner_unit || "",
                                   country: data.owner_country || "",
                                   postal_code: data.owner_postal_code || "",
                              },
                              gender: data.owner_gender,
                              marital_status: data.owner_marital_status,
                              // whatsapp: data.owner_whatsapp,
                              // email: data.owner_email,
                              // valid_id: data.owner_valid_id,
                              // nok_name: data.owner_nok_name,
                              // nok_phone: data.owner_nok_phone || "",
                              // nok_relationship: data.owner_nok_relationship,
                              // identification: {
                              //      type: data.owner_identification_type,
                              //      number: data.owner_identification_number,
                              //    },
                         },
                    }),
               });
               const result = await updateVehicleResponse.json();
               if (updateVehicleResponse.ok) {
                    toast({
                         title: "Vehicle Updated Successfully",
                    });
                    setIsSubmitting(false);
                    router.refresh();
                    return NextResponse.json(result);
               } else {
                    setIsSubmitting(false);
                    toast({
                         title: result.error.message[0] ?? "Vehicle NOT Updated",
                    });
                    return null;
               }
          } catch (error) {
               setIsSubmitting(false);
               toast({
                    title: "Vehicle NOT Updated",
               });
          }
     }

     return (
          <form onSubmit={form.handleSubmit(onSubmit)}>
               <Card className="border-0 p-0 shadow-none">
                    <CardHeader className="p-6">
                         <CardTitle>Edit Vehicle</CardTitle>
                         <CardDescription>Update the information for this vehicle</CardDescription>
                    </CardHeader>
                    <CardContent className="px-6">
                         <Tabs defaultValue="vehicle" className="w-full">
                              <TabsList className="grid w-full grid-cols-3">
                                   <TabsTrigger value="vehicle">
                                        <Car className="mr-2 h-4 w-4" />
                                        Vehicle Details
                                   </TabsTrigger>
                                   <TabsTrigger value="owner">
                                        <User className="mr-2 h-4 w-4" />
                                        Owner Details
                                   </TabsTrigger>
                                   <TabsTrigger value="other">
                                        <Wallet className="mr-2 h-4 w-4" />
                                        Other Details
                                   </TabsTrigger>
                              </TabsList>
                              <TabsContent value="vehicle">
                                   <div className="grid gap-4 py-4">
                                        <div className="grid gap-4 md:grid-cols-2">
                                             <div className="space-y-2">
                                                  <Label htmlFor="plateNumber">Plate Number</Label>
                                                  <Input id="plateNumber" {...form.register("plateNumber")} />
                                                  {form.formState.errors.plateNumber && <p className="text-sm text-red-500">{form.formState.errors.plateNumber.message}</p>}
                                             </div>
                                             <div className="space-y-2">
                                                  <Label htmlFor="category">Category</Label>
                                                  <Select onValueChange={(value) => form.setValue("category", value)} defaultValue={vehicle.category ?? "BUS_INTERSTATE"}>
                                                       <SelectTrigger>
                                                            <SelectValue placeholder="Select category" />
                                                       </SelectTrigger>
                                                       <SelectContent>
                                                            {VEHICLE_CATEGORIES.map((v, i) => (
                                                                 <SelectItem key={i} value={v}>
                                                                      {v.split("_").join(" ")}
                                                                 </SelectItem>
                                                            ))}
                                                       </SelectContent>
                                                  </Select>
                                             </div>
                                        </div>
                                        <div className="grid gap-4 md:grid-cols-2">
                                             <div className="space-y-2">
                                                  <Label htmlFor="color">Color</Label>
                                                  <Input id="color" {...form.register("color")} />
                                             </div>
                                             <div className="space-y-2">
                                                  <Label htmlFor="type">Type</Label>
                                                  <Input id="type" {...form.register("type")} />
                                             </div>
                                        </div>
                                        <div className="grid gap-4 md:grid-cols-2">
                                             <div className="space-y-2">
                                                  <Label htmlFor="vin">VIN</Label>
                                                  <Input id="vin" {...form.register("vin")} />
                                             </div>
                                             <div className="space-y-2">
                                                  <Label htmlFor="barcode">Barcode</Label>
                                                  <Input id="barcode" {...form.register("barcode")} />
                                             </div>
                                        </div>
                                   </div>
                              </TabsContent>
                              <TabsContent value="owner">
                                   <div className="grid gap-4 py-4">
                                        <div className="grid gap-4 md:grid-cols-2">
                                             <div className="space-y-2">
                                                  <Label htmlFor="owner_firstName">Owner Firstname</Label>
                                                  <Input id="owner_firstName" {...form.register("owner_firstName")} />
                                                  {form.formState.errors.owner_firstName && <p className="text-sm text-red-500">{form.formState.errors.owner_firstName.message}</p>}
                                             </div>
                                             <div className="space-y-2">
                                                  <Label htmlFor="owner_lastName">Owner Lastname</Label>
                                                  <Input id="owner_lastName" {...form.register("owner_lastName")} />
                                                  {form.formState.errors.owner_lastName && <p className="text-sm text-red-500">{form.formState.errors.owner_lastName.message}</p>}
                                             </div>
                                             <div className="space-y-2">
                                                  <Label htmlFor="owner_phone">Owner Phone</Label>
                                                  <Input id="owner_phone" {...form.register("owner_phone")} />
                                                  {form.formState.errors.owner_phone && <p className="text-sm text-red-500">{form.formState.errors.owner_phone.message}</p>}
                                             </div>
                                        </div>
                                        <div className="grid gap-4 md:grid-cols-2">
                                             <div className="space-y-2">
                                                  <Label htmlFor="owner_email">Owner Email</Label>
                                                  <Input id="owner_email" type="email" {...form.register("owner_email")} />
                                                  {form.formState.errors.owner_email && <p className="text-sm text-red-500">{form.formState.errors.owner_email.message}</p>}
                                             </div>
                                             <div className="space-y-2">
                                                  <Label htmlFor="owner_text">Owner Address</Label>
                                                  <Input id="owner_text" {...form.register("owner_text")} />
                                             </div>
                                        </div>
                                        <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                              <Label htmlFor="owner_marital_status">Owner Marital Status</Label>
<Select onValueChange={(value) => form.setValue("owner_marital_status", value as "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED")} defaultValue={"SINGLE" as "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED"}>
                                                  <SelectTrigger>
                                                      <SelectValue placeholder="Select marital status" />
                                                  </SelectTrigger>
                                                  <SelectContent>
                                                      <SelectItem value="SINGLE">Single</SelectItem>
                                                      <SelectItem value="MARRIED">Married</SelectItem>
                                                      <SelectItem value="DIVORCED">Divorced</SelectItem>
                                                      <SelectItem value="WIDOWED">Widowed</SelectItem>
                                                  </SelectContent>
                                              </Select>
                                              {form.formState.errors.owner_marital_status && <p className="text-sm text-red-500">{form.formState.errors.owner_marital_status.message}</p>}
                                          </div>
                                             <div className="space-y-2">
                                              <Label htmlFor="owner_gender">Owner Gender</Label>
 <Select onValueChange={(value) => form.setValue("owner_gender", value as "MALE" | "FEMALE" | "OTHER")} defaultValue={(vehicle?.ownerId ? "MALE" : "FEMALE") as "MALE" | "FEMALE" | "OTHER"}>
                                                  <SelectTrigger>
                                                      <SelectValue placeholder="Select gender" />
                                                  </SelectTrigger>
                                                  <SelectContent>
                                                      <SelectItem value="MALE">Male</SelectItem>
                                                      <SelectItem value="FEMALE">Female</SelectItem>
                                                      <SelectItem value="OTHER">Other</SelectItem>
                                                  </SelectContent>
                                              </Select>
                                              {form.formState.errors.owner_gender && <p className="text-sm text-red-500">{form.formState.errors.owner_gender.message}</p>}
                                          </div>
                                        </div>
                                   </div>
                              </TabsContent>
                              <TabsContent value="other">
                                   <div className="grid gap-4 py-4">
                                        <div className="grid gap-4 md:grid-cols-2">
                                             <div className="space-y-2">
                                                  <Label htmlFor="asinNumber">ASIN Number</Label>
                                                  <Input id="asinNumber" {...form.register("asinNumber")} />
                                             </div>
                                             <div className="space-y-2">
                                                  <Label htmlFor="tCode">T-Code</Label>
                                                  <Input id="tCode" {...form.register("tCode")} />
                                                  {form.formState.errors.tCode && <p className="text-sm text-red-500">{form.formState.errors.tCode.message}</p>}
                                             </div>
                                             <div className="space-y-2">
                                                  <Label htmlFor="fairFlexImei">FairFlex IMEI</Label>
                                                  <Input id="fairFlexImei" {...form.register("fairFlexImei")} />
                                             </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                             <Checkbox id="blacklisted" checked={form.watch("blacklisted")} onCheckedChange={(checked) => form.setValue("blacklisted", checked as boolean)} />
                                             <Label htmlFor="blacklisted">Blacklisted</Label>
                                        </div>
                                        <div className="space-y-2">
                                             <Label htmlFor="status">Status</Label>
                                             <Select onValueChange={(value) => form.setValue("status", value as "ACTIVE" | "INACTIVE")} defaultValue={vehicle.status}>
                                                  <SelectTrigger>
                                                       <SelectValue placeholder="Select status" />
                                                  </SelectTrigger>
                                                  <SelectContent>
                                                       <SelectItem value="ACTIVE">Active</SelectItem>
                                                       <SelectItem value="INACTIVE">Inactive</SelectItem>
                                                  </SelectContent>
                                             </Select>
                                        </div>
                                   </div>
                              </TabsContent>
                         </Tabs>
                    </CardContent>
                    <CardFooter className="flex justify-between p-6">
                         <Button variant="outline" onClick={onClose}>
                              Cancel
                         </Button>
                         <Button type="submit" disabled={isSubmitting}>
                              {isSubmitting && <AlertCircle className="mr-2 h-4 w-4 animate-spin" />}
                              {isSubmitting ? "Updating..." : "Update Vehicle"}
                         </Button>
                    </CardFooter>
               </Card>
          </form>
     );
}

export default function EditVehicleDialogDrawer({ vehicle }: { vehicle: any }) {
     const [open, setOpen] = useState(false);
     const [isMobile, setIsMobile] = useState(false);

     useEffect(() => {
          const checkScreenSize = () => {
               setIsMobile(window.innerWidth < 768);
          };

          checkScreenSize();
          window.addEventListener("resize", checkScreenSize);

          return () => window.removeEventListener("resize", checkScreenSize);
     }, []);

     const handleClose = () => setOpen(false);

     if (isMobile) {
          return (
               <Drawer open={open} onOpenChange={setOpen}>
                    <DrawerTrigger asChild>
                         <Button>
                              <Edit className="mr-2 h-4 w-4" /> Edit Vehicle
                         </Button>
                    </DrawerTrigger>
                    <DrawerContent className="max-h-[80vh]">
                         <div className="mx-auto h-full w-full max-w-2xl overflow-y-auto">
                              <EditVehicleForm vehicle={vehicle} onClose={handleClose} />
                         </div>
                    </DrawerContent>
               </Drawer>
          );
     }

     return (
          <Dialog open={open} onOpenChange={setOpen}>
               <DialogTitle className="text-lg font-bold">Edit Vehicle</DialogTitle>
               <DialogTrigger asChild>
                    <Button>
                         <Edit className="mr-2 h-4 w-4" /> Edit Vehicle
                    </Button>
               </DialogTrigger>
               <DialogContent className="sm:max-w-2xl">
                    <EditVehicleForm vehicle={vehicle} onClose={handleClose} />
               </DialogContent>
          </Dialog>
     );
}
