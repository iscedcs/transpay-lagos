"use client";
import React from "react";
import { toast } from "sonner";
import { useState } from "react";
import { ArchiveRestore, Trash2 } from "lucide-react";
import { string } from "zod";
import { useRouter } from "next/navigation";

export default function RestoreCompanyButton({ id }: { id: string }) {
  const [restored, setIsRestored] = useState(false);
  const router = useRouter();

  const restoreClick = async () => {
    setIsRestored(false);
    try {
      const url = "/api/restore-company";
      const response = await fetch(url, {
        method: "PATCH",
        body: JSON.stringify({
          id,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        toast.error("Company could not be restored", {
          description: "There was a problem with restoring this company.",
        });
      } else {
        router.push("/companies");
        toast.success("Company restored successfully", {
          description: "Ths commpany has been restored successfully.",
        });
        setIsRestored(!restored);
        router.refresh();
      }
    } catch (e) {
      toast.error("Something went wrong", {
        description: "There was a problem with restoring this company.",
      });
    } finally {
      setIsRestored(!restored);
    }
  };
  return (
    <div className="text-destructive-foreground">
      <p
        onClick={restoreClick}
        className=" cursor-pointer flex gap-3 items-center"
      >
        <ArchiveRestore className="h-4 w-4" />
        {restored ? " Restoring Company " : "Restore Company"}
      </p>
    </div>
  );
}
