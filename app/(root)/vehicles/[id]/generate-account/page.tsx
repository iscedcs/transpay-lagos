import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getVehicleById } from "@/actions/vehicles";
import GenerateAccountContent from "@/components/generate-account-content";

interface GenerateAccountPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: GenerateAccountPageProps): Promise<Metadata> {
  try {
    const result = await getVehicleById(params.id);
    if (!result.success) {
      return {
        title: "Vehicle Not Found | Vehicle Management System",
      };
    }

    const vehicle = result.data;
    return {
      title: `Generate Account - ${vehicle.plateNumber} | Vehicle Management System`,
      description: `Create virtual account for vehicle ${vehicle.plateNumber} owned by ${vehicle.owner?.firstName} ${vehicle.owner?.lastName}`,
      keywords: [
        "virtual account",
        "vehicle payment",
        "account generation",
        vehicle.plateNumber,
      ],
      openGraph: {
        title: `Generate Account - ${vehicle.plateNumber}`,
        description: `Create virtual account for vehicle ${vehicle.plateNumber}`,
        type: "website",
      },
    };
  } catch (error) {
    return {
      title: "Generate Account | Vehicle Management System",
    };
  }
}

export default async function GenerateAccountPage({
  params,
}: GenerateAccountPageProps) {
  try {
    const result = await getVehicleById(params.id);

    if (!result.success) {
      notFound();
    }

    const vehicle = result.data;

    return <GenerateAccountContent vehicle={vehicle} />;
  } catch (error) {
    console.log("Error fetching vehicle:", error);
    notFound();
  }
}
