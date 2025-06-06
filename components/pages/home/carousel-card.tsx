import { BUS_IMAGE_SAMPLE } from "@/lib/const";
import Image from "next/image";
import React from "react";

export default function CarouselCard({
     isActive = false,
     image = BUS_IMAGE_SAMPLE,
}: {
     isActive?: boolean;
     image?: string;
}) {
     return (
          <div
               className={`${
                    isActive ? "w-[80%]" : "w-[10%]"
               } flex flex-col justify-end transition-all duration-1000`}
          >
               <Image
                    src={image}
                    alt=""
                    height={300}
                    width={1200}
                    className={`${
                         isActive ? "h-full" : "h-[95%]"
                    } w-full rounded object-cover object-top transition-all duration-1000 md:rounded-2xl`}
               />
          </div>
     );
}
