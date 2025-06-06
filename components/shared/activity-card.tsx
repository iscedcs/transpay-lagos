import { unslugify } from "@/lib/utils";
import Link from "next/link";

export default function ActivityCard({ name, time, date, id, description }: IActivityCard) {
     return (
          <Link href={`/activities/${id}`} className="grid rounded-lg px-3 py-1 hover:bg-primary-500/30">
               <div className="truncate text-ellipsis text-sm">{unslugify(name)}</div>
               <div className="line-clamp-2 truncate text-ellipsis text-xs">{description}</div>
               {date && (
                    <div className="flex justify-between text-xs">
                         <div className="">{date}</div>
                         <div className="">{time}</div>
                    </div>
               )}
          </Link>
     );
}
