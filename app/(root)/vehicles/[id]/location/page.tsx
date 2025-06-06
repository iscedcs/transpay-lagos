import { getAllTrackerLocation } from "@/lib/controllers/tracker.controller";
import { getVehicleById } from "@/lib/controllers/vehicle-controller";
import { notFound } from "next/navigation";
import MapView from "./map-view";


interface PageProps {
     params: Promise<{ id: string }>;
}

export default async function LocationPage({
     params,
}: PageProps) {
     const vehicle = await getVehicleById((await params).id);
     const trackerLocation = await getAllTrackerLocation([
          vehicle?.fairFlexImei ?? "",
     ]);

     if (!vehicle) return notFound();
     return (
          <div className="flex flex-col">
               <MapView tracker={trackerLocation[0]} vehicle={vehicle} />
          </div>
     );
}
