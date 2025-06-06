"use client";
import { VEHICLE_CATEGORIES } from "@/lib/const";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import {
     Select,
     SelectContent,
     SelectItem,
     SelectTrigger,
     SelectValue,
} from "../ui/select";

const driverFormSchema = z.object({
     colour: z.string({
          description: "Enter your vehicle colour.",
     }),
     heavyVehicle: z
          .string()
          .refine((value) => VEHICLE_CATEGORIES.includes(value), {
               message: "Invalid means of identification.",
          }),
     vehiclePlateNumber: z.string(),
});

type DriverFormValues = z.infer<typeof driverFormSchema>;

export default function DriverForm2() {
     const form = useForm<DriverFormValues>({
          resolver: zodResolver(driverFormSchema),
          mode: "onChange",
     });

     const onSubmit = (data: DriverFormValues) => {};

     return (
          <Form {...form}>
               <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
               >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                         <FormField
                              control={form.control}
                              name="heavyVehicle"
                              render={({ field }) => (
                                   <FormItem>
                                        <FormLabel className="pl-4 text-title1Bold">
                                             {" "}
                                             Vehicle Category
                                        </FormLabel>

                                        <Select defaultValue={field.value}>
                                             <FormControl>
                                                  <SelectTrigger className="relative flex h-14 items-center rounded-2xl text-body">
                                                       <SelectValue placeholder="Select a means of identification" />
                                                  </SelectTrigger>
                                             </FormControl>
                                             <SelectContent>
                                                  {VEHICLE_CATEGORIES.map(
                                                       (cat, i) => (
                                                            <SelectItem
                                                                 value={cat}
                                                                 key={i}
                                                            >
                                                                 {cat
                                                                      .split(
                                                                           "_",
                                                                      )
                                                                      .join(
                                                                           " ",
                                                                      )}
                                                            </SelectItem>
                                                       ),
                                                  )}
                                             </SelectContent>
                                        </Select>
                                   </FormItem>
                              )}
                         />

                         <FormField
                              name="colour"
                              control={form.control}
                              render={({ field }) => (
                                   <FormItem>
                                        <FormLabel className="pl-4 text-title1Bold">
                                             Colour
                                        </FormLabel>

                                        <FormControl>
                                             <Input
                                                  className="relative flex h-14 items-center rounded-2xl text-body"
                                                  {...field}
                                                  type="text"
                                                  placeholder="colour"
                                                  required
                                             />
                                        </FormControl>
                                   </FormItem>
                              )}
                         />
                         <FormField
                              name="vehiclePlateNumber"
                              control={form.control}
                              render={({ field }) => (
                                   <FormItem>
                                        <FormLabel className="pl-4 text-title1Bold">
                                             Vehicle Plate Number
                                        </FormLabel>

                                        <FormControl>
                                             <Input
                                                  className="relative flex h-14 items-center rounded-2xl text-body"
                                                  {...field}
                                                  type="text"
                                                  placeholder="Plate Number"
                                                  required
                                             />
                                        </FormControl>
                                   </FormItem>
                              )}
                         />
                    </div>
                    <div className="flex items-center justify-center gap-6 text-title1Bold">
                         <Button
                              variant={"outline"}
                              size="lg"
                              type="button"
                              asChild
                              className="rounded-normal w-28 p-4 py-2"
                         >
                              <Link href={"/vehicles/new-vehicle"}>Back</Link>
                         </Button>
                         <Button
                              variant={"default"}
                              size="lg"
                              type="button"
                              asChild
                              className="rounded-normal w-28 p-4 py-2"
                         >
                              <Link
                                   href={
                                        "/vehicles/new-vehicle/drivers-license"
                                   }
                              >
                                   Next
                              </Link>
                         </Button>
                    </div>
               </form>
          </Form>
     );
}
