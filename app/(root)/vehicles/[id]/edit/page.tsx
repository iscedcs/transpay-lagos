import { auth } from "@/auth";
import { AdminVehicleUpdateForm } from "@/components/forms/admin-vehicle-update-form";
import { UpdateVehicleForm } from "@/components/forms/update-vehicle-form";
import { ADMIN_ROLES } from "@/lib/const";
import { getVehicleById } from "@/lib/controllers/vehicle-controller";
import { Role } from "@prisma/client";
import { notFound, redirect } from "next/navigation";

export const revalidate = 0;

export default async function VehicleInformationPage({ params }: { params: Promise<{ id: string }> }) {
     const session = await auth();
     if (!session) {
          redirect("/signin");
     }
     const vehicle = await getVehicleById((await params).id);
     if (!vehicle) {
          notFound();
     }

     const isAdmin = ADMIN_ROLES.includes(session.user.role as Role[number]);

     return (
          <div className="mb-8 flex w-full flex-col gap-3 p-2 xs:p-5">
               <div className="flex items-center justify-between">
                    <h1 className="py-2 text-title1Bold">Edit Vehicle</h1>
               </div>
               {isAdmin ? <AdminVehicleUpdateForm vehicle={vehicle} /> : <UpdateVehicleForm vehicle={vehicle} />}
          </div>
     );
}
