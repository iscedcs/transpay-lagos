import { AddFareFlexForm } from "@/components/forms/add-fareflex-form";
import { getVehicleSummary } from "@/lib/controllers/vehicle-controller";
import { notFound } from "next/navigation";

interface PageProps {
     params: Promise<{ plate: string }>;
}
export default async function AddTrackerPage({
     params,
}:PageProps) {
     const vehicle = await getVehicleSummary((await params).plate);
     if (!vehicle) return notFound();
     return (
          <div className="mx-auto grid min-h-[60svh] w-full max-w-sm place-items-center rounded-2xl bg-secondary/50 shadow-inner">
               <AddFareFlexForm vehicleId={vehicle.id} />
          </div>
     );
}
