// components/StepTwo.tsx
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";
import Image from "next/image";

const FormSchema = z.object({
  pin: z.string().min(4, {
    message: "Your Second Level PIN must be 4 characters.",
  }),
});

interface StepTwoProps {
  onSubmit: (pin: string) => void;
}

export default function StepTwo({ onSubmit }: StepTwoProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  function handleSubmit(data: z.infer<typeof FormSchema>) {
    onSubmit(data.pin);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="text-center flex flex-col items-center justify-start">
        <Link href={"/"} className="mt-16 mb-10 w-56 mx-auto">
          <span
            className="text-[#D4A017] font-bold text-3xl tracking-wide"
            style={{ textShadow: "1px 1px 2px #2C1C00" }}>
            LASITRAS
          </span>
          {/* <Image
            src={"/logo.png"}
            height={50}
            width={200}
            className='shrink-0'
            alt={`Transpay Logo`}
          /> */}
        </Link>
        <h1 className="text-2xl lg:text-4xl mb-5">Administrative Access</h1>
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter Your Second Level Pin</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={4}
                  render={({ slots }) => (
                    <InputOTPGroup>
                      {slots.map((slot, index) => (
                        <InputOTPSlot index={0} key={index} {...slot} />
                      ))}
                    </InputOTPGroup>
                  )}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The last four digits of your phone.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-10 w-full max-w-sm" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
