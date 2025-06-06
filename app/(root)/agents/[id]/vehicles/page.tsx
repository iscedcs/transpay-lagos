import { allVehiclesByAgentId } from "@/actions/vehicles";
import { auth } from "@/auth";
import { agentVehiclesColumns } from "@/components/ui/table/columns";
import { DataTable } from "@/components/ui/table/data-table";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
};

export default async function RegisteredVehiclesPage({ 
     params 
}: PageProps) {
     const session = await auth();    
     const id = (await params).id
     if (!session) return redirect("/sign-in");

     const vehiclesAudit = await allVehiclesByAgentId(id);
     const vehicles = vehiclesAudit.success?.data.vehicles.map((vehicle) => vehicle.meta.vehicle);

     return (
          <div className="flex h-full w-full flex-col gap-5 p-3 xs:p-5">
               <Link href={`/agents/${id}`} className="flex items-center">
                    <ChevronLeftIcon className="mr3 h-4 w-4" /> <span>Go Back</span>
               </Link>
               <div className="mb-10 flex flex-col gap-5">
                    <DataTable 
                    showSearch 
                    searchWith="plateNumber" 
                    searchWithPlaceholder="Search with plate number" showColumns 
                    showPagination 
                    columns={agentVehiclesColumns} 
                    data={vehicles ?? []} />
               </div>
          </div>
     );
}
