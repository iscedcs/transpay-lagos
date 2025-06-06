"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Ban,
  CheckCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Vehicle } from "@prisma/client";
import { toast } from "sonner";

interface VehicleActionButtonsProps {
  vehicle: Vehicle;
  onVehicleUpdate?: () => void;
}

export function VehicleActionButtons({
  vehicle,
  onVehicleUpdate,
}: VehicleActionButtonsProps) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showBlacklistDialog, setShowBlacklistDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = () => {
    router.push(`/vehicles/${vehicle.id}/edit`);
  };

  const handleView = () => {
    router.push(`/vehicles/${vehicle.id}`);
  };

  const handleBlacklist = async () => {
    setIsLoading(true);
    try {
      //   await toggleVehicleBlacklist(vehicle.id, !vehicle.blacklisted);
      toast.success("Success", {
        description: `Vehicle ${
          vehicle.blacklisted ? "removed from blacklist" : "blacklisted"
        } successfully`,
      });
      onVehicleUpdate?.();
    } catch (error) {
      toast("Error", {
        description:
          error instanceof Error
            ? error.message
            : "Failed to update vehicle status",
      });
    } finally {
      setIsLoading(false);
      setShowBlacklistDialog(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      //   await deleteVehicle(vehicle.id);
      toast.success("Success", {
        description: "Vehicle deleted successfully",
      });
      onVehicleUpdate?.();
    } catch (error) {
      toast.error("Error", {
        description:
          error instanceof Error ? error.message : "Failed to delete vehicle",
      });
    } finally {
      setIsLoading(false);
      setShowDeleteDialog(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleView}>
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Vehicle
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowBlacklistDialog(true)}>
            {vehicle.blacklisted ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Remove Blacklist
              </>
            ) : (
              <>
                <Ban className="mr-2 h-4 w-4" />
                Blacklist Vehicle
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className="text-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Vehicle
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              vehicle with plate number <strong>{vehicle.plateNumber}</strong>{" "}
              and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading ? "Deleting..." : "Delete Vehicle"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Blacklist Confirmation Dialog */}
      <AlertDialog
        open={showBlacklistDialog}
        onOpenChange={setShowBlacklistDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {vehicle.blacklisted
                ? "Remove from Blacklist"
                : "Blacklist Vehicle"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {vehicle.blacklisted
                ? `This will remove vehicle ${vehicle.plateNumber} from the blacklist and restore its access to the system.`
                : `This will blacklist vehicle ${vehicle.plateNumber} and restrict its access to the system.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleBlacklist} disabled={isLoading}>
              {isLoading
                ? "Processing..."
                : vehicle.blacklisted
                ? "Remove from Blacklist"
                : "Blacklist Vehicle"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
