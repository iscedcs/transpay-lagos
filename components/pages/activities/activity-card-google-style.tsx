import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

export default function ActivityCardGS({ name, description, date, link }: IActivityCard) {
     return (
          <Card className="p-[20px]">
               <h1 className="text-[20px] pb-2 font-bold">{name}</h1>
               <hr />
               <p className="italic pt-2 text-[#6f6f6f]">{description}</p>
               <div className="flex justify-between mt-2 items-center">
               <p className=" bg-primary-200 text-[11px] py-2 px-5 rounded-full " >{date}</p>
               <Button asChild variant={"default"} >
                    <Link href={link}>View Details</Link>
               </Button>

               </div>
          </Card>
     );
}
