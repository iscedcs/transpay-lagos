import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MailIcon, PhoneCall } from "lucide-react";
import Image from "next/image";

export default function MaintenancePage() {
     return (
          <>
               <div className="mx-auto grid h-[100svh] w-full max-w-2xl place-items-center p-4 text-center">
                    <div className="flex flex-col items-center justify-center">
                         <Image src={"/logo.png"} height={30} width={150} className="mb-10 shrink-0" alt="Transpay Logo" />
                         <h1 className="mb-5 text-2xl font-bold">System Update in Progress!</h1>
                         <div className="mb-5">
                              {`Our system is currently undergoing updates to elevate your TransPay experience. As a result, access to the TransPay platform is momentarily paused.`}
                         </div>
                         <h2 className="text-xl font-bold">{`What's Happening`}</h2>
                         <ol className="mb-5 text-center">
                              <li>
                                   <span>{` We're making improvements behind the scenes for a seamless experience.`}</span>{" "}
                              </li>
                              {/* <li>
                                   <span className="font-bold">Estimated Downtime: </span>
                                   <span>{`We're working diligently and anticipate completing the updates shortly. Thank you for your patience.`}</span>{" "}
                              </li> */}
                         </ol>
                         <h2 className="text-xl font-bold">What You Can Do</h2>
                         <ol className="mb-5 text-center">
                              <li>
                                   <span>{`Exciting changes are in the works. We'll be back online soon.`}</span>{" "}
                              </li>
                         </ol>
                         <h2 className="mb-3 text-xl font-bold">Need Assistance?</h2>
                         <div className="mb-5 flex flex-wrap items-center justify-center gap-2">
                              <a href={"sms:+2348163453826"} className={cn(buttonVariants(), "gap-2")}>
                                   <MailIcon /> SMS
                              </a>
                              <a href={"tel:+2348163453826"} className={cn(buttonVariants(), "gap-2")}>
                                   <PhoneCall /> Call
                              </a>
                              {/* <a href={"whatsapp://send?phone=2348163453826"} className={cn(buttonVariants(), "gap-2")}>
                                   <WhatsAppIcon /> WhatsApp
                              </a> */}
                         </div>
                         <div className="">We appreciate your cooperation as we work to make your TransPay experience even better!</div>
                    </div>
               </div>
          </>
     );
}
