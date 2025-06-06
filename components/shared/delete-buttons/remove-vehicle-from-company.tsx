"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

import { loadingSpinner } from "@/lib/icons";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function RemoveVehicleFromCompany({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const onClick = async () => {
    setIsLoading(true);
    try {
      const url = "/api/add-vehicle-to-company";
      const response = await fetch(url, {
        method: "PATCH",
        body: JSON.stringify({
          id,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        toast.error("Vehicle was not able to be removed from the company", {
          description:
            "There was a problem removing this vehicle from the company.p",
        });
      } else {
        setIsLoading(false);
        router.refresh();
        toast.success("Vehicle has been removed from the company", {
          description: "Vehicle removed successfully.",
        });
      }
    } catch (e) {
      toast.error("Something went wrong", {
        description:
          "There was a problem removing this vehicle from the company.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <p className={`${className} flex gap-3`} onClick={onClick}>
        <Trash2 className=" w-5 h-5" />
        {isLoading ? loadingSpinner : "Remove Vehicle"}
      </p>
    </div>
  );
}
