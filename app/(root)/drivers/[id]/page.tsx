import { UpdateDriverForm } from "@/components/forms/update-driver-form";
import { Button } from "@/components/ui/button";
import { getDrivers } from "@/lib/controllers/driver-controller";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}
export async function generateMetadata({ params }: PageProps) {
  const id = (await params).id;
  const drivers = await getDrivers();

  const resolvedParams = await params;
  const driver = drivers?.find(
    (singleDriver) => singleDriver.driver_id == resolvedParams.id
  );
  return {
    title: `LASITRAS | Driver - ${driver?.firstname} ${driver?.lastname}`,
  };
}
export default async function DriversPage({ params }: PageProps) {
  const drivers = await getDrivers();
  const resolvedParams = await params;
  const driver = drivers?.find(
    (singleDriver) => singleDriver.driver_id == resolvedParams.id
  );
  if (!driver) return notFound();

  return (
    <div className="p-5 w-full flex flex-col gap-5 ">
      <div className="flex justify-between">
        <div className="uppercase">{`Driver ${driver?.firstname} ${driver?.lastname}`}</div>
        <Button asChild>
          <Link href={`${driver.driver_id}/add-license`}>Add License</Link>
        </Button>
      </div>
      <UpdateDriverForm driver={driver} />
    </div>
  );
}
