import { verifyVehicleByAsin } from "@/lib/controllers/vehicle-controller";
import React from "react";


interface PageProps {
	params: Promise<{ id: string }>;
}
export default async function SearchPage({
     params,
}: PageProps) {
     // const { role } = await getSSession();
     const vehicle = await verifyVehicleByAsin((await params).id);
     return <pre className="w-full">{JSON.stringify(vehicle, null, 5)}</pre>;
}
