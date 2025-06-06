"use client";
import { loadingSpinner } from "@/lib/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { PenLine } from "lucide-react";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import DeleteAgentButton from "../shared/delete-buttons/delete-agent-button";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
     Dialog,
     DialogContent,
     DialogHeader,
     DialogTitle,
     DialogTrigger
} from "../ui/dialog";
import {
     Form,
     FormControl,
     FormField,
     FormItem,
     FormLabel,
     FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
     Select,
     SelectContent,
     SelectItem,
     SelectTrigger,
     SelectValue,
} from "../ui/select";
import { useToast } from "../ui/use-toast";

export const updateAgentFormSchema = z.object({
     owner_firstName: z
          .string()
          .min(2, {
               message: "firstname must be at least 2 characters.",
          })
          .max(30, {
               message: "firstname must not be longer than 30 characters.",
          }),
     owner_lastName: z
          .string()
          .min(2, {
               message: "lastname must be at least 2 characters.",
          })
          .max(30, {
               message: "lastname must not be longer than 30 characters.",
          }),
     email: z
          .string({
               required_error: "Please enter an email.",
          })
          .email(),
     owner_identification_type: z.string({
          required_error: "Please select a mode of identification",
     }),
     blacklisted: z.boolean().optional(),
     owner_identification_number: z.string({
          required_error: "Please select a mode of identification",
     }),
     address: z
          .string()
          .min(2, {
               message: "Address must be at least 2 characters.",
          })
          .max(30, {
               message: "Address must not be longer than 100 characters.",
          }),
     lga: z.string().optional(),
     city: z.string({
          required_error: "Please enter city.",
     }),
     state: z.string({
          required_error: "Please enter state.",
     }),
     unit: z.string().optional(),
     country: z.string({
          required_error: "Please enter country.",
     }),
     postal_code: z.string().optional(),
     id: z.string(),
     phone: z
          .string({
               required_error: "Please enter phone number.",
          })
          .regex(/^\+234[789][01]\d{8}$/, "Phone format (+2348012345678)")
          .optional(),   
          role: z.string({
          required_error: "Please choose role.",
     }),
});

export type UpdateAgentFormValues = z.infer<typeof updateAgentFormSchema>;

export function UpdateAgentForm({ agent }: { agent: IUserExtended }) {
     const [disabled, setDisabled] = React.useState<boolean>(true);
     const router = useRouter();
     const defaultValues: Partial<UpdateAgentFormValues> = {
          owner_firstName: agent.firstName ?? "",
          owner_lastName: agent.lastName ?? "",
          email: agent.email ?? "",
          phone: agent.phone ?? "",
          role: agent.role ?? "",
          blacklisted: agent.blacklisted ?? false,
          city: agent.address?.city ?? "",
          country: agent.address?.country ?? "Nigeria",
          owner_identification_number: agent.identification?.number ?? "",
          owner_identification_type: agent.identification?.type ?? "NIN",
          lga: agent.address?.lga ?? "" ?? "",
          postal_code: agent.address?.postal_code ?? "",
          state: agent.address?.state ?? "",
          unit: agent.address?.unit ?? "",
          address: agent.address?.text,
          id: agent.id ?? "",
     };

     const [isLoading, setIsLoading] = React.useState<boolean>(false);
     const { toast } = useToast();
     const form = useForm<UpdateAgentFormValues>({
          resolver: zodResolver(updateAgentFormSchema),
          defaultValues,
          mode: "onChange",
     });

     async function onSubmit(data: UpdateAgentFormValues) {
          setIsLoading(true);
          const payload = {
               firstName: data.owner_firstName,
               lastName: data.owner_lastName,
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
                    type: data.owner_identification_type,
                    number: data.owner_identification_number,
               },
               id: data.id,
          };
          try {
               const createAgentResponse = await fetch("/api/create-agent", {
                    method: "PATCH",
                    body: JSON.stringify(payload),
               });
               const result = await createAgentResponse.json();
               if (
                    createAgentResponse.status > 199 &&
                    createAgentResponse.status < 299
               ) {
                    toast({
                         title: "Agent Updated Successfully",
                    });
                    setIsLoading(false);
                    setDisabled(true);
                    router.push("/agents");
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
                                   name="owner_firstName"
                                   control={form.control}
                                   render={({ field }) => (
                                        <FormItem>
                                             <FormLabel>FirstName</FormLabel>
                                             <FormControl>
                                                  <Input
                                                       disabled={disabled}
                                                       placeholder="Firstname"
                                                       {...field}
                                                  />
                                             </FormControl>
                                             <FormMessage />
                                        </FormItem>
                                   )}
                              />
                              <FormField
                                   name="owner_lastName"
                                   control={form.control}
                                   render={({ field }) => (
                                        <FormItem>
                                             <FormLabel>LastName</FormLabel>
                                             <FormControl>
                                                  <Input
                                                       disabled={disabled}
                                                       placeholder="Lastname"
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
                                   name="role"
                                   control={form.control}
                                   render={({ field }) => (
                                        <FormItem>
                                             <FormLabel>Agent Role</FormLabel>
                                             <Select
                                                  disabled
                                                  onValueChange={field.onChange}
                                                  defaultValue={field.value}
                                             >
                                                  <FormControl>
                                                       <SelectTrigger className="h-12">
                                                            <SelectValue placeholder="Select a mean of Identification" />
                                                       </SelectTrigger>
                                                  </FormControl>
                                                  <SelectContent>
                                                       <SelectItem value="AGENT">
                                                            AGENT
                                                       </SelectItem>
                                                       <SelectItem value="GREEN_ENGINE">
                                                            GREEN ENGINE
                                                       </SelectItem>
                                                  </SelectContent>
                                             </Select>
                                             <FormMessage />
                                        </FormItem>
                                   )}
                              />
                              <FormField
                                   name="owner_identification_type"
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
                                   name="owner_identification_number"
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
                                   name="country"
                                   control={form.control}
                                   render={({ field }) => (
                                        <FormItem>
                                             <FormLabel>Country</FormLabel>
                                             <FormControl>
                                                  <Input
                                                       disabled={disabled}
                                                       placeholder="Country"
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
                                                  Blacklist Agent
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
                                        <div className="grid gap-2">
                                             <Button className="flex w-full items-center gap-1.5">
                                                  <DeleteAgentButton
                                                       id={agent.id}
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
