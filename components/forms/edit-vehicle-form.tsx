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

export default function VehicleInfoForm({ vehicle }: { vehicle: IVehicle }) {
     const vehicleFormSchema = z.object({
          category: z
               .string({
                    required_error: "Please enter a valid Category.",
               })
               .refine((value) => VEHICLE_CATEGORIES.includes(value), {
                    message: "Invalid means of identification.",
               }),
          color: z
               .string({
                    required_error: "Please enter a valid Color.",
               })
               .min(3, { message: "Colors have at least three characters." }),
          image: z
               .string({
                    required_error: "Please add image.",
               })
               .min(5, { message: "Must be a valid Image link" }),
          plateNumber: z
               .string({
                    required_error: "Enter your plate number.",
               })
               .min(5, {
                    message: "Plate numbers have at least five(5) characters.",
               }),
          status: z.string({
               required_error: "Choose Status",
          }),
     });

     type VehicleFormValues = z.infer<typeof vehicleFormSchema>;

     const defaultValues: Partial<VehicleFormValues> = {
          category: "",
          color: "",
          image: "",
          plateNumber: "",
          status: "waived",
     };
     const form = useForm<VehicleFormValues>({
          resolver: zodResolver(vehicleFormSchema),
          mode: "onChange",
     });

     const onSubmit = (data: VehicleFormValues) => {};

     return (
          <Form {...form}>
               <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
               >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                         <FormField
                              control={form.control}
                              name="category"
                              render={({ field }) => (
                                   <FormItem>
                                        <FormLabel className="pl-4 text-title1Bold">
                                             {" "}
                                             Vehicle Category
                                        </FormLabel>

                                        <Select
                                             defaultValue={field.value}
                                             disabled
                                        >
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
                              name="color"
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
                                                  disabled
                                             />
                                        </FormControl>
                                   </FormItem>
                              )}
                         />
                         <FormField
                              name="plateNumber"
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
                                                  disabled
                                             />
                                        </FormControl>
                                   </FormItem>
                              )}
                         />

                         {/* <FormField
						name='ownersName'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-title1Bold pl-4'>
									Owners Name
								</FormLabel>

								<FormControl>
									<Input
										className='relative text-body flex  items-center h-14 rounded-2xl'
										{...field}
										type='text'
										placeholder='Enter Owners Name'
										required
										disabled
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						name='ownersPhone'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-title1Bold pl-4'>
									Owners Number
								</FormLabel>

								<FormControl>
									<Input
										className='relative text-body flex  items-center h-14 rounded-2xl'
										{...field}
										type='text'
										placeholder='Enter Owners Phone Number'
										required
										disabled
									/>
								</FormControl>
							</FormItem>
						)}
					/> */}
                    </div>
                    <div className="flex items-center justify-center gap-6 text-title1Bold">
                         <Button
                              variant={"outline"}
                              size="lg"
                              type="button"
                              asChild
                              className="rounded-normal w-28 p-4 py-2"
                         >
                              <Link href={`/vehicles/${vehicle.plateNumber}`}>
                                   Back
                              </Link>
                         </Button>
                         <Button
                              variant={"default"}
                              size="lg"
                              type="button"
                              className="rounded-normal w-28 p-4 py-2"
                         >
                              Update Vehicle
                         </Button>
                    </div>
               </form>
          </Form>
     );
}
