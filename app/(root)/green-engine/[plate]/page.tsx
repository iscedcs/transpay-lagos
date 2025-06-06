import { Button } from "@/components/ui/button";
import { getVehicleSummary } from "@/lib/controllers/vehicle-controller";
import Link from "next/link";
import { notFound } from "next/navigation";


interface PageProps {
     params: Promise<{ plate: string }>;
}
export default async function GreenVehicleInfoPage({
     params,
}: PageProps) {
     const vehicle = await getVehicleSummary((await params).plate);
     if (!vehicle) return notFound();
     const hasFareFlex =
          vehicle.tracker.terminal_id !== null ||
          vehicle.tracker.terminal_id === "";
     return (
          <div>
               <div className="flex w-full flex-col justify-between gap-1 text-center">
                    <div className="text-sm">
                         <div className="uppercase">{`Vehicle Owner`}</div>
                         <div className="text-xl font-bold">
                              {vehicle.owner.firstName}{" "}{vehicle.owner.lastName}
                         </div>
                    </div>
                    <div className="mb-10 text-sm uppercase">
                         <div className="">Plate number</div>
                         <div className="text-xl font-bold">
                              {vehicle.plateNumber}
                         </div>
                    </div>
                    {hasFareFlex ? (
                         <div className="text-sm uppercase">
                              <div className="mb-2">FareFlex ID</div>
                              <div className="text-xl font-bold">
                                   {vehicle.tracker.terminal_id}
                              </div>
                         </div>
                    ) : (
                         <div className="text-sm uppercase">
                              <div className="mb-2">No FareFlex Found</div>
                              <Link
                                   href={`/green-engine/${vehicle.plateNumber.toLowerCase()}/add`}
                              >
                                   <Button
                                        variant={"secondary"}
                                        className="shadow-md transition-all hover:shadow-xl"
                                   >
                                        Add FareFlex
                                   </Button>
                              </Link>
                         </div>
                    )}
               </div>
          </div>
     );
}
