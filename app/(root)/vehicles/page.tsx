import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { VehiclesContent } from "@/components/vehicles/vehicle-content";

export default function VehiclesPage() {
  return (
    <Suspense
      fallback={
        <div className="p-5 space-y-4 ">
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        </div>
      }
    >
      <VehiclesContent />
    </Suspense>
  );
}
