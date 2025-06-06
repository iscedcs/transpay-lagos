"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../ui/use-toast";
import {
     Form,
     FormControl,
     FormField,
     FormItem,
     FormLabel,
     FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import React from "react";
import { loadingSpinner } from "@/lib/icons";
import { NextResponse } from "next/server";
import DeleteAdminButton from "../shared/delete-buttons/delete-admin-button";
import { Checkbox } from "../ui/checkbox";
import {
     Select,
     SelectContent,
     SelectItem,
     SelectTrigger,
     SelectValue,
} from "../ui/select";
import { useRouter } from "next/navigation";
import { PenLine } from "lucide-react";
import {
     Dialog,
     DialogContent,
     DialogHeader,
     DialogTitle,
     DialogTrigger,
} from "../ui/dialog";

export const updateAdminFormSchema = z.object({
     firstName: z
          .string()
          .min(2, {
               message: "Username must be at least 2 characters.",
          })
          .max(30, {
               message: "Username must not be longer than 30 characters.",
          }),
     lastName: z
          .string()
          .min(2, {
               message: "Username must be at least 2 characters.",
          })
          .max(30, {
               message: "Username must not be longer than 30 characters.",
          }),
     email: z
          .string({
               required_error: "Please enter an email.",
          })
          .email(),
     id_type: z.string({
          required_error: "Please select a mode of identification",
     }),
     blacklisted: z.boolean().optional(),
     id_number: z.string({
          required_error: "Please select a mode of identification",
     }),
     address: z
          .string()
          .min(2, {
               message: "Address must be at least 2 characters.",
          })
          .max(100, {
               message: "Address must not be longer than 100 characters.",
          }),
     lga: z.string({
          required_error: "Please enter LGA.",
     }),
     city: z.string({
          required_error: "Please enter city.",
     }),
     state: z.string({
          required_error: "Please enter state.",
     }),
     unit: z.string({
          required_error: "Please enter unit.",
     }),
     country: z.string({
          required_error: "Please enter country.",
     }),
     postal_code: z.string(),
     id: z.string(),
     phone: z
          .string({
               required_error: "Please enter phone number.",
          })
          .regex(/^\+234[789][01]\d{8}$/, "Phone format (+2348012345678)"),
     role: z.string({
          required_error: "Please choose role.",
     }),
});

export type UpdateAdminFormValues = z.infer<typeof updateAdminFormSchema>;

export function UpdateAdminForm({ admin }: { admin: IUserExtended }) {
     const [disabled, setDisabled] = React.useState<boolean>(true);
     const router = useRouter();
     const defaultValues: Partial<UpdateAdminFormValues> = {
          firstName: admin.firstName ?? "",
          lastName: admin.lastName ?? "",
          email: admin.email ?? "",
          phone: admin.phone ?? "",
          role: admin.role ?? "",
          blacklisted: admin.blacklisted ?? undefined,
          city: admin.address?.city ?? "",
          country: admin.address?.country ?? "",
          id_number: admin.identification?.number ?? "",
          id_type: admin.identification?.type ?? "",
          lga: admin.address?.lga ?? "" ?? "",
          postal_code: admin.address?.postal_code ?? "",
          state: admin.address?.state ?? "",
          unit: admin.address?.unit ?? "",
          address: admin.address?.text ?? "",
          id: admin.id ?? "",
     };

     const [isLoading, setIsLoading] = React.useState<boolean>(false);
     const { toast } = useToast();
     const form = useForm<UpdateAdminFormValues>({
          resolver: zodResolver(updateAdminFormSchema),
          defaultValues,
          mode: "onChange",
     });

     async function onSubmit(data: UpdateAdminFormValues) {
          setIsLoading(true);
          const payload = {
               firstName: data.firstName,
               lastName: data.lastName,
               email: data.email,
               phone: data.phone,
               role: data.role,
               blacklisted: data.blacklisted,
               address: {
                    text: data.address,
                    lga: data.lga,
                    city: data.city,
                    state: data.state,
                    unit: data.unit,
                    country: data.country,
                    postal_code: data.postal_code,
               },
               identification: {
                    type: data.id_type,
                    number: data.id_number,
               },
               id: data.id,
          };
          try {
               const createAdminResponse = await fetch("/api/create-admin", {
                    method: "PATCH",
                    body: JSON.stringify(payload),
               });
               const result = await createAdminResponse.json();
               if (
                    createAdminResponse.status > 199 &&
                    createAdminResponse.status < 299
               ) {
                    toast({
                         title: "Admin Updated Successfully",
                    });
                    setIsLoading(false);
                    setDisabled(true);
                    router.push("/admins");
                    return NextResponse.json(result);
               } else {
                    setIsLoading(false);
                    toast({
                         title: "Not Updated",
                    });
                    return null;
               }
          } catch (error) {
               setIsLoading(false);
          }
     }

     return (
          <>
               <Form {...form}>
                    <form
                         onSubmit={form.handleSubmit(onSubmit)}
                         className="mb-20 flex flex-col gap-5"
                    >
                         <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                              <FormField
                                   name="firstName"
                                   control={form.control}
                                   render={({ field }) => (
                                        <FormItem>
                                             <FormLabel>Name</FormLabel>
                                             <FormControl>
                                                  <Input
                                                       disabled={disabled}
                                                       placeholder="FirstName"
                                                       {...field}
                                                  />
                                             </FormControl>
                                             <FormMessage />
                                        </FormItem>
                                   )}
                              />
                              <FormField
                                   name="lastName"
                                   control={form.control}
                                   render={({ field }) => (
                                        <FormItem>
                                             <FormLabel>Name</FormLabel>
                                             <FormControl>
                                                  <Input
                                                       disabled={disabled}
                                                       placeholder="LastName"
                                                       {...field}
                                                  />
                                             </FormControl>
                                             <FormMessage />
                                        </FormItem>
                                   )}
                              />
                              <FormField
                                   name="phone"
                                   control={form.control}
                                   render={({ field }) => (
                                        <FormItem>
                                             <FormLabel>Phone Number</FormLabel>
                                             <FormControl>
                                                  <Input
                                                       disabled={disabled}
                                                       placeholder="Enter phone number"
                                                       {...field}
                                                  />
                                             </FormControl>
                                             <FormMessage />
                                        </FormItem>
                                   )}
                              />
                              <FormField
                                   name="email"
                                   control={form.control}
                                   render={({ field }) => (
                                        <FormItem>
                                             <FormLabel>
                                                  Email Address
                                             </FormLabel>
                                             <FormControl>
                                                  <Input
                                                       disabled
                                                       placeholder="Email"
                                                       {...field}
                                                  />
                                             </FormControl>
                                             <FormMessage />
                                        </FormItem>
                                   )}
                              />
                              <FormField
                                   name="id_type"
                                   control={form.control}
                                   render={({ field }) => (
                                        <FormItem>
                                             <FormLabel>
                                                  Means of Identification
                                             </FormLabel>
                                             <Select
                                                  onValueChange={field.onChange}
                                                  defaultValue={field.value}
                                                  disabled={disabled}
                                             >
                                                  <FormControl>
                                                       <SelectTrigger className="h-12">
                                                            <SelectValue placeholder="Select a mean of Identification" />
                                                       </SelectTrigger>
                                                  </FormControl>
                                                  <SelectContent>
                                                       <SelectItem value="NIN">
                                                            NIN
                                                       </SelectItem>
                                                       <SelectItem value="BVN">
                                                            BVN
                                                       </SelectItem>
                                                       <SelectItem value="PVC">
                                                            Voters Card
                                                       </SelectItem>
                                                  </SelectContent>
                                             </Select>
                                             <FormMessage />
                                        </FormItem>
                                   )}
                              />
                              <FormField
                                   name="id_number"
                                   control={form.control}
                                   render={({ field }) => (
                                        <FormItem>
                                             <FormLabel>
                                                  Identification Number
                                             </FormLabel>
                                             <FormControl>
                                                  <Input
                                                       disabled={disabled}
                                                       placeholder="Enter identification number"
                                                       {...field}
                                                  />
                                             </FormControl>
                                             <FormMessage />
                                        </FormItem>
                                   )}
                              />
                              <FormField
                                   name="address"
                                   control={form.control}
                                   render={({ field }) => (
                                        <FormItem>
                                             <FormLabel>Address</FormLabel>
                                             <FormControl>
                                                  <Input
                                                       disabled={disabled}
                                                       placeholder="Street"
                                                       {...field}
                                                  />
                                             </FormControl>
                                             <FormMessage />
                                        </FormItem>
                                   )}
                              />
                              <FormField
                                   name="unit"
                                   control={form.control}
                                   render={({ field }) => (
                                        <FormItem>
                                             <FormLabel>Unit</FormLabel>
                                             <FormControl>
                                                  <Input
                                                       disabled={disabled}
                                                       placeholder="Unit"
                                                       {...field}
                                                  />
                                             </FormControl>
                                             <FormMessage />
                                        </FormItem>
                                   )}
                              />
                              <FormField
                                   name="city"
                                   control={form.control}
                                   render={({ field }) => (
                                        <FormItem>
                                             <FormLabel>City</FormLabel>
                                             <FormControl>
                                                  <Input
                                                       disabled={disabled}
                                                       placeholder="City"
                                                       {...field}
                                                  />
                                             </FormControl>
                                             <FormMessage />
                                        </FormItem>
                                   )}
                              />
                              <FormField
                                   name="postal_code"
                                   control={form.control}
                                   render={({ field }) => (
                                        <FormItem>
                                             <FormLabel>Postal Code</FormLabel>
                                             <FormControl>
                                                  <Input
                                                       disabled={disabled}
                                                       placeholder="Postal Code"
                                                       {...field}
                                                  />
                                             </FormControl>
                                             <FormMessage />
                                        </FormItem>
                                   )}
                              />
                              <FormField
                                   name="lga"
                                   control={form.control}
                                   render={({ field }) => (
                                        <FormItem>
                                             <FormLabel>LGA</FormLabel>
                                             <FormControl>
                                                  <Input
                                                       disabled={disabled}
                                                       placeholder="LGA"
                                                       {...field}
                                                  />
                                             </FormControl>
                                             <FormMessage />
                                        </FormItem>
                                   )}
                              />
                         </div>
                         <FormField
                              name="blacklisted"
                              control={form.control}
                              render={({ field }) => (
                                   <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                             <Checkbox
                                                  disabled={disabled}
                                                  checked={field.value}
                                                  onCheckedChange={
                                                       field.onChange
                                                  }
                                             />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                             <FormLabel>
                                                  Blacklist Admin
                                             </FormLabel>
                                        </div>
                                   </FormItem>
                              )}
                         />

                         <div className="">
                              {!disabled && (
                                   <Button className="w-32" type="submit">
                                        {isLoading
                                             ? loadingSpinner
                                             : "Save Changes"}
                                   </Button>
                              )}
                         </div>
                    </form>
               </Form>
               {disabled && (
                    <div className="flex items-center justify-between gap-5">
                         <Button
                              className="flex w-32 items-center gap-1.5"
                              onClick={() => setDisabled(false)}
                              type="button"
                         >
                              <PenLine className="w4 h-4" />
                              Edit
                         </Button>
                         <Dialog>
                              <DialogTrigger asChild>
                                   <Button className="flex w-32 items-center gap-1.5">
                                        Delete
                                   </Button>
                              </DialogTrigger>
                              <DialogContent className="space-y-2">
                                   <DialogHeader className="mx-auto items-center justify-center">
                                        <DialogTitle>
                                             Do you wish to continue with this:
                                        </DialogTitle>
                                   </DialogHeader>
                                   <>
                                        <div className="grid">
                                             <Button className="flex w-full items-center gap-1.5">
                                                  <DeleteAdminButton
                                                       id={admin.id}
                                                  />
                                                  Yes
                                             </Button>
                                        </div>
                                   </>
                              </DialogContent>
                         </Dialog>
                    </div>
               )}
          </>
     );
}
