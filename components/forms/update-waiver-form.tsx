"use client";
import {
     Select,
     SelectContent,
     SelectGroup,
     SelectItem,
     SelectTrigger,
     SelectValue,
} from "@/components/ui/select";
import { WAIVER_STATUS } from "@/lib/const";
import { loadingSpinner } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Checkbox } from "../ui/checkbox";
import {
     Form,
     FormControl,
     FormField,
     FormItem,
     FormLabel,
     FormMessage
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useToast } from "../ui/use-toast";

const updateWaiverFormSchema = z.object({
     startDate: z.date({ required_error: "Enter Start Date" }),
     endDate: z.date({ required_error: "Enter End Date" }),
     reason: z.string({
          required_error: "Please enter a valid reason.",
     }),
     id: z.string({ required_error: "No vehicle detected" }),
     additionalInfo: z.string(),
     indefinite: z.boolean().default(false).optional(),
     status: z
          .string()
          .refine(
               (value) =>
                    [
                         WAIVER_STATUS.approved,
                         WAIVER_STATUS.cancelled,
                         WAIVER_STATUS.declined,
                         WAIVER_STATUS.pending,
                    ].includes(value as WAIVER_STATUS),
               {
                    message: "Invalid status",
               },
          ),
});

export type updateWaiverFormValues = z.infer<typeof updateWaiverFormSchema>;

// This can come from your database or API.
export function UpdateWaiverForm({ waiver }: { waiver: IWaiver }) {
     const defaultValues: Partial<updateWaiverFormValues> = {
          status: waiver.status,
          id: waiver.vehicle_id,
          startDate: new Date(waiver.startDate),
          endDate: new Date(waiver.endDate),
          reason: waiver.reason,
          indefinite: waiver.endDate === "9999-01-01T00:00:00.000Z",
          additionalInfo: waiver.additionalInfo,
     };
     const router = useRouter();
     const [isLoading, setIsLoading] = React.useState<boolean>(false);
     const { toast } = useToast();

     const form = useForm<updateWaiverFormValues>({
          resolver: zodResolver(updateWaiverFormSchema),
          defaultValues,
          mode: "onChange",
     });

     const isIndefinite = form.getValues("indefinite");
     async function onSubmit(data: updateWaiverFormValues) {
          setIsLoading(true);
          const payload = {
               id: data.id,
               status: data.status,
               reason: data.reason,
               startDate: format(data.startDate, "yyyy-MM-dd"),
               endDate: isIndefinite
                    ? format(new Date("9999-01-01"), "yyyy-MM-dd")
                    : format(data.endDate, "yyyy-MM-dd"),
          };
          try {
               const createWaiverResponse = await fetch("/api/create-waiver", {
                    method: "PUT",
                    body: JSON.stringify(payload),
               });
               const result = await createWaiverResponse.json();
               if (
                    createWaiverResponse.status > 199 &&
                    createWaiverResponse.status < 299
               ) {
                    toast({
                         title: "Waiver Approved",
                    });
                    setIsLoading(false);
                    form.reset();
                    router.refresh();
                    return NextResponse.json(result);
               } else {
                    setIsLoading(false);
                    toast({
                         title: "Waiver NOT Approved",
                    });
                    form.reset();
                    return null;
               }
          } catch (error: any) {
               setIsLoading(false);
               form.reset();
               toast({ title: "Waiver Not Approved" });
          }
     }

     return (
          <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="">
                    <div className="mb-10 grid grid-cols-1 gap-5 text-start">
                         <FormField
                              control={form.control}
                              name="startDate"
                              render={({ field }) => (
                                   <FormItem className="flex flex-col">
                                        <FormLabel>Start Date</FormLabel>
                                        <Popover>
                                             <PopoverTrigger asChild>
                                                  <FormControl>
                                                       <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                 "w-full pl-3 text-left font-normal",
                                                                 !field.value &&
                                                                      "text-muted-foreground",
                                                            )}
                                                       >
                                                            {field.value ? (
                                                                 format(
                                                                      field.value,
                                                                      "PPP",
                                                                 )
                                                            ) : (
                                                                 <span>
                                                                      Pick a
                                                                      date
                                                                 </span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                       </Button>
                                                  </FormControl>
                                             </PopoverTrigger>
                                             <PopoverContent
                                                  className="w-auto p-0"
                                                  align="start"
                                             >
                                                  <Calendar
                                                       mode="single"
                                                       selected={field.value}
                                                       onSelect={field.onChange}
                                                       disabled={(date) =>
                                                            date >
                                                                 addDays(
                                                                      new Date(),
                                                                      7,
                                                                 ) ||
                                                            date <= new Date()
                                                       }
                                                  />
                                             </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                   </FormItem>
                              )}
                         />

                         <FormField
                              control={form.control}
                              name="indefinite"
                              render={({ field }) => (
                                   <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                                        <FormControl>
                                             <Checkbox
                                                  checked={field.value}
                                                  onCheckedChange={
                                                       field.onChange
                                                  }
                                             />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                             <FormLabel>
                                                  Apply indefinitely
                                             </FormLabel>
                                        </div>
                                   </FormItem>
                              )}
                         />

                         {!isIndefinite && (
                              <FormField
                                   control={form.control}
                                   name="endDate"
                                   render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                             <FormLabel>End Date</FormLabel>
                                             <Popover>
                                                  <PopoverTrigger asChild>
                                                       <FormControl>
                                                            <Button
                                                                 variant={
                                                                      "outline"
                                                                 }
                                                                 className={cn(
                                                                      "w-full pl-3 text-left font-normal",
                                                                      !field.value &&
                                                                           "text-muted-foreground",
                                                                 )}
                                                            >
                                                                 {field.value ? (
                                                                      format(
                                                                           field.value,
                                                                           "PPP",
                                                                      )
                                                                 ) : (
                                                                      <span>
                                                                           Pick
                                                                           a
                                                                           date
                                                                      </span>
                                                                 )}
                                                                 <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                       </FormControl>
                                                  </PopoverTrigger>
                                                  <PopoverContent
                                                       className="w-auto p-0"
                                                       align="start"
                                                  >
                                                       <Calendar
                                                            mode="single"
                                                            selected={
                                                                 field.value
                                                            }
                                                            onSelect={
                                                                 field.onChange
                                                            }
                                                            disabled={(date) =>
                                                                 // date >
                                                                 // 	addDays(
                                                                 // 		form.getValues(
                                                                 // 			'startDate'
                                                                 // 		),
                                                                 // 		5
                                                                 // 	) ||
                                                                 date <=
                                                                 form.getValues(
                                                                      "startDate",
                                                                 )
                                                            }
                                                       />
                                                  </PopoverContent>
                                             </Popover>
                                             <FormMessage />
                                        </FormItem>
                                   )}
                              />
                         )}

                         <FormField
                              control={form.control}
                              name="status"
                              render={({ field }) => (
                                   <FormItem>
                                        <FormLabel>Reason</FormLabel>
                                        <Select
                                             onValueChange={field.onChange}
                                             defaultValue={field.value}
                                        >
                                             <FormControl>
                                                  <SelectTrigger>
                                                       <SelectValue
                                                            className="uppercase"
                                                            placeholder="Choose a reason"
                                                       />
                                                  </SelectTrigger>
                                             </FormControl>
                                             <SelectContent>
                                                  <SelectGroup>
                                                       {[
                                                            WAIVER_STATUS.approved,
                                                            WAIVER_STATUS.cancelled,
                                                            WAIVER_STATUS.declined,
                                                            WAIVER_STATUS.pending,
                                                       ].map((status, key) => (
                                                            <SelectItem
                                                                 key={key}
                                                                 value={status}
                                                                 className="uppercase"
                                                            >
                                                                 {status}
                                                            </SelectItem>
                                                       ))}
                                                  </SelectGroup>
                                             </SelectContent>
                                        </Select>
                                        <FormMessage />
                                   </FormItem>
                              )}
                         />
                    </div>
                    <div className="grid">
                         <Button
                              className=""
                              type="submit"
                              // disabled
                         >
                              {isLoading ? loadingSpinner : "Update Waiver"}
                         </Button>
                    </div>
               </form>
          </Form>
     );
}
