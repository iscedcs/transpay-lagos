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
import Link from "next/link";
import {
     AlertDialog,
     AlertDialogAction,
     AlertDialogCancel,
     AlertDialogContent,
} from "../ui/alert-dialog";
import React from "react";
import { loadingSpinner, successIcon } from "@/lib/icons";
import { Checkbox } from "../ui/checkbox";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const agentFormSchema = z.object({
     email: z
          .string({
               required_error: "Please enter an email.",
          })
          .email(),
     password: z.string().refine((password) => {
          return (
               password.length >= 8
               // && /[A-Z]/.test(password) &&
               // /\d/.test(password)
          );
     }, "The password must contain at least one uppercase letter and one number and be at least 8 characters long."),
});

type AgentFormValues = z.infer<typeof agentFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<AgentFormValues> = {
     email: "",
     password: "",
};

export function AuthLoginForm() {
     const [isLoading, setIsLoading] = React.useState<boolean>(false);
     const router = useRouter();

     const [open, setOpen] = React.useState(false);
     const { toast } = useToast();
     const form = useForm<AgentFormValues>({
          resolver: zodResolver(agentFormSchema),
          defaultValues,
          mode: "onChange",
     });

     async function onSubmit(data: AgentFormValues) {
          setIsLoading(true);
          try {
               const signInResponse = await signIn("credentials", {
                    email: data.email,
                    password: data.password,
                    redirect: true,
                    callbackUrl: "/dashboard",
               });

               const result = signInResponse;

               if (signInResponse?.ok === false) {
                    toast({
                         title: "Invalid Credentials:",
                         description: "Check your email or password",
                    });
                    setIsLoading(false);
                    return null;
               } else {
                    router.push("/dashboard");
                    toast({
                         title: "Successful Sign in",
                    });
                    setIsLoading(false);
                    return signInResponse;
               }
          } catch (error: any) {
               toast({
                    title: "Check Internet",
                    description: "An error occurred during api connection.",
               });
               setIsLoading(false);
               throw new Error(
                    error?.message ||
                         "An error occurred during api connection.",
               );
          }
     }

     return (
          <Form {...form}>
               <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mb-5 flex flex-col gap-5"
               >
                    <div className="grid gap-5">
                         <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                   <FormItem>
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                             <Input
                                                  placeholder="Email"
                                                  {...field}
                                             />
                                        </FormControl>
                                        <FormMessage />
                                   </FormItem>
                              )}
                         />
                         <FormField
                              control={form.control}
                              name="password"
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
                         <div className="flex items-center space-x-2">
                              <Checkbox id="remember" />
                              <label
                                   htmlFor="remember"
                                   className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                   Remember Me
                              </label>
                         </div>
                    </div>
                    <div className="grid gap-2">
                         <Button disabled={isLoading} type="submit">
                              {isLoading ? loadingSpinner : "Login"}
                         </Button>
                         <div className="flex items-center text-xs md:text-base">
                              Forgot your password?{" "}
                              <Link href="/reset-password">
                                   Reset your Password
                              </Link>
                         </div>
                    </div>

                    <AlertDialog open={open} onOpenChange={setOpen}>
                         <AlertDialogContent className="bg-secondary">
                              <div className="mx-auto w-60 flex-col">
                                   <div className="mb-5 flex flex-col items-center gap-5">
                                        <div className="h-20 w-20 text-awesome-foreground">
                                             {successIcon}
                                        </div>
                                        <div className="text-xl">
                                             Agent Account Created
                                        </div>
                                   </div>
                                   <div className="mb-5 flex flex-col whitespace-nowrap text-left">
                                        <div className="">
                                             Email: {form.getValues().email}
                                        </div>
                                        <div className="">
                                             Password:{" "}
                                             {form.getValues().password}
                                        </div>
                                   </div>
                                   <div className="flex flex-col gap-3">
                                        <AlertDialogAction
                                             asChild
                                             className="rounded-xl"
                                        >
                                             <Link href={`/agents/agentId`}>
                                                  View Account
                                             </Link>
                                        </AlertDialogAction>
                                        <AlertDialogCancel
                                             asChild
                                             className="rounded-xl"
                                        >
                                             <Link href={`/agents`}>
                                                  Dashboard
                                             </Link>
                                        </AlertDialogCancel>
                                   </div>
                              </div>
                         </AlertDialogContent>
                    </AlertDialog>
               </form>
          </Form>
     );
}
