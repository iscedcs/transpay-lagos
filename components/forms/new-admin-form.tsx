"use client";
import { loadingSpinner, successIcon } from "@/lib/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { NextResponse } from "next/server";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useToast } from "../ui/use-toast";
import CONFIG from "@/config";

export const adminFormSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "firstname must be at least 2 characters.",
    })
    .max(30, {
      message: "firstname must not be longer than 30 characters.",
    }),
  lastName: z
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
  id_type: z.string({
    required_error: "Please select a mode of identification",
  }),
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
  phone: z
    .string({
      required_error: "Please enter phone number.",
    })
    .regex(/^\+234[789][01]\d{8}$/, "Phone format (+2348012345678)"),
  role: z.string({
    required_error: "Please choose role.",
  }),
  password: z.string().refine((password) => {
    return (
      password.length >= 8
      // &&
      // /[A-Z]/.test(password) &&
      // /\d/.test(password)
    );
  }, "The password must contain at least one uppercase letter and one number and be at least 8 characters long."),
  confirmPassword: z.string().min(8),
});

type AdminFormValues = z.infer<typeof adminFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<AdminFormValues> = {
  role: "ADMIN",
  state: "Anambra",
  country: "Nigeria",
  id_type: "NIN",
};
export function AdminForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();
  const form = useForm<AdminFormValues>({
    resolver: zodResolver(adminFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: AdminFormValues) {
    const createAdminPayload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      phone: data.phone,
      role: data.role,
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
    };
    setIsLoading(true);
    try {
      const createAdminResponse = await fetch("/api/create-admin", {
        method: "POST",
        body: JSON.stringify(createAdminPayload),
      });
      const result = await createAdminResponse.json();
      if (
        createAdminResponse.status > 199 &&
        createAdminResponse.status < 299
      ) {
        toast({
          title: "Admin Created Successfully",
        });
        setIsLoading(false);
        setOpen(true);
        return NextResponse.json(result);
      } else {
        setIsLoading(false);
        toast({
          title: "Admin NOT Created",
        });
        return null;
      }
    } catch (error) {
      setIsLoading(false);
    }
  }

  return (
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
                <FormLabel>Firstname</FormLabel>
                <FormControl>
                  <Input placeholder="FirstName" {...field} />
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
                <FormLabel>Lastname</FormLabel>
                <FormControl>
                  <Input placeholder="LastName" {...field} />
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
                <FormLabel>Admin Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select a mean of Identification" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ADMIN">ADMIN</SelectItem>
                    <SelectItem value="AIRS_ADMIN">AIRS ADMIN</SelectItem>
                    <SelectItem value="GREEN_ENGINE">GREEN ENGINE</SelectItem>
                    <SelectItem value="SECURITY">SECURITY</SelectItem>
                  </SelectContent>
                </Select>
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
                  <Input placeholder="Enter phone number" {...field} />
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
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
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
                <FormLabel>Means of Identification</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select a mean of Identification" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="NIN">NIN</SelectItem>
                    <SelectItem value="BVN">BVN</SelectItem>
                    <SelectItem value="PVC">Voters Card</SelectItem>
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
                <FormLabel>Identification Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter identification number" {...field} />
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
                  <Input placeholder="Street" {...field} />
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
                  <Input placeholder="Unit" {...field} />
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
                  <Input placeholder="City" {...field} />
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
                  <Input placeholder="Postal Code" {...field} />
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select LGA" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CONFIG.lgas.map((lga, k) => (
                      <SelectItem key={k} value={lga}>
                        {lga}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="confirmPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-center gap-5">
          <Button
            className="w-28 border-primary text-primary"
            variant="outline"
            asChild
          >
            <Link href="/admins">Cancel</Link>
          </Button>
          <Button className="w-28" type="submit">
            {isLoading ? loadingSpinner : "Add Admin"}
          </Button>
        </div>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent className="bg-secondary">
            <div className="mx-auto w-60 flex-col">
              <div className="mb-5 flex flex-col items-center gap-5">
                <div className="h-20 w-20 text-awesome-foreground">
                  {successIcon}
                </div>
                <div className="text-xl">Admin Account Created</div>
              </div>
              <div className="mb-5 flex flex-col text-center">
                <div>E-mail: {form.getValues("email")}</div>
                <div>Password: {form.getValues("password")}</div>
              </div>
              <div className="flex flex-col gap-3">
                <AlertDialogAction asChild className="rounded-xl">
                  <Link href={`/admins`}>View Admins</Link>
                </AlertDialogAction>
                <AlertDialogCancel className="rounded-xl">
                  New Admin
                </AlertDialogCancel>
              </div>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </Form>
  );
}
