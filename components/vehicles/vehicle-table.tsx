"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Eye,
  Edit,
  QrCode,
  Ban,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import type { Vehicle } from "@/types/vehicles";
import { ADMIN_ROLES } from "@/lib/const";

interface VehicleTableProps {
  vehicles: Vehicle[];
  userRole: string;
  onViewVehicle: (vehicle: Vehicle) => void;
  onEditVehicle: (vehicle: Vehicle) => void;
  onUpdateSticker: (vehicle: Vehicle) => void;
  onToggleBlacklist: (vehicle: Vehicle) => void;
}

export function VehicleTable({
  vehicles,
  userRole,
  onViewVehicle,
  onEditVehicle,
  onUpdateSticker,
  onToggleBlacklist,
}: VehicleTableProps) {
  const canEdit = ADMIN_ROLES.includes(userRole);
  const canBlacklist = ADMIN_ROLES.includes(userRole);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "default";
      case "INACTIVE":
        return "secondary";
      case "SUSPENDED":
        return "destructive";
      case "PENDING_VERIFICATION":
        return "outline";
      default:
        return "outline";
    }
  };

  const getComplianceBadgeVariant = (status: string) => {
    switch (status) {
      case "compliant":
        return "default";
      case "non_compliant":
        return "destructive";
      case "grace_period":
        return "secondary";
      case "expired":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getComplianceIcon = (status: string) => {
    switch (status) {
      case "compliant":
        return <CheckCircle className="h-3 w-3" />;
      case "non_compliant":
      case "expired":
        return <Ban className="h-3 w-3" />;
      case "grace_period":
        return <AlertTriangle className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vehicle</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Compliance</TableHead>
            <TableHead>LGA</TableHead>
            <TableHead>QR Code</TableHead>
            <TableHead>Last Payment</TableHead>
            <TableHead className="w-[70px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicles.map((vehicle) => (
            <TableRow key={vehicle.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={vehicle.image || "/placeholder.svg"}
                      alt={vehicle.plateNumber}
                    />
                    <AvatarFallback>
                      {vehicle.plateNumber.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{vehicle.plateNumber}</div>
                    <div className="text-sm text-muted-foreground">
                      {vehicle.type} • {vehicle.color}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">
                    {vehicle.owner.firstName} {vehicle.owner.lastName}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {vehicle.owner.phone}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{vehicle.category}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusBadgeVariant(vehicle.status)}>
                    {vehicle.status}
                  </Badge>
                  {vehicle.blacklisted && (
                    <Badge variant="destructive" className="text-xs">
                      Blacklisted
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  {getComplianceIcon(vehicle.complianceStatus)}
                  <Badge
                    variant={getComplianceBadgeVariant(
                      vehicle.complianceStatus
                    )}
                  >
                    {vehicle.complianceStatus.replace("_", " ")}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  {vehicle.lgaName || "Not assigned"}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {vehicle.barcode ? (
                    <Badge variant="default" className="text-xs">
                      <QrCode className="h-3 w-3 mr-1" />
                      Linked
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs">
                      No QR
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  {vehicle.lastPayment
                    ? vehicle.lastPayment.toLocaleDateString()
                    : "No payment"}
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onViewVehicle(vehicle)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    {canEdit && (
                      <DropdownMenuItem onClick={() => onEditVehicle(vehicle)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Vehicle
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => onUpdateSticker(vehicle)}>
                      <QrCode className="mr-2 h-4 w-4" />
                      Update QR Code
                    </DropdownMenuItem>
                    {canBlacklist && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => onToggleBlacklist(vehicle)}
                          className={
                            vehicle.blacklisted
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          <Ban className="mr-2 h-4 w-4" />
                          {vehicle.blacklisted
                            ? "Remove from Blacklist"
                            : "Add to Blacklist"}
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
