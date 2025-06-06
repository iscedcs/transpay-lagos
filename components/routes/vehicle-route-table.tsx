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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Edit, Trash2, ArrowRight } from "lucide-react";
import type { VehicleRoute } from "@/types/routes";
import { ADMIN_ROLES } from "@/lib/const";

interface VehicleRouteTableProps {
  routes: VehicleRoute[];
  userRole: string;
  userLgaId: string | null;
  onViewRoute: (route: VehicleRoute) => void;
  onEditRoute: (route: VehicleRoute) => void;
  onDeleteRoute: (route: VehicleRoute) => void;
}

export function VehicleRouteTable({
  routes,
  userRole,
  userLgaId,
  onViewRoute,
  onEditRoute,
  onDeleteRoute,
}: VehicleRouteTableProps) {
  const canEdit = (route: VehicleRoute) => {
    if (ADMIN_ROLES.includes(userRole)) return true;
    if (userRole === "lga_admin" && userLgaId) {
      return route.steps.some((step) => step.lgaId === userLgaId);
    }
    return false;
  };

  const canDelete = (route: VehicleRoute) => {
    return ADMIN_ROLES.includes(userRole);
  };

  const getVehicleCategoryBadgeVariant = (category: string) => {
    switch (category) {
      case "bus":
        return "default";
      case "taxi":
        return "secondary";
      case "truck":
        return "outline";
      default:
        return "secondary";
    }
  };

  const renderRouteSteps = (steps: VehicleRoute["steps"]) => {
    const sortedSteps = [...steps].sort((a, b) => a.order - b.order);
    return (
      <div className="flex items-center gap-1 flex-wrap">
        {sortedSteps.map((step, index) => (
          <div key={step.id} className="flex items-center gap-1">
            <span className="text-sm font-medium">{step.lgaName}</span>
            {index < sortedSteps.length - 1 && (
              <ArrowRight className="h-3 w-3 text-muted-foreground" />
            )}
          </div>
        ))}
      </div>
    );
  };

  const getLGAPositionForUser = (route: VehicleRoute, userLgaId: string) => {
    const step = route.steps.find((s) => s.lgaId === userLgaId);
    if (!step) return null;
    return `Step ${step.order} of ${route.totalLGAs}`;
  };

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vehicle</TableHead>
            <TableHead>Route</TableHead>
            <TableHead>Total LGAs</TableHead>
            {(userRole === "lga_admin" || userRole === "lga_agent") && (
              <TableHead>Position</TableHead>
            )}
            <TableHead>Created</TableHead>
            <TableHead className="w-[70px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {routes.map((route) => (
            <TableRow key={route.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{route.vehiclePlate}</div>
                  <div className="text-sm text-muted-foreground">
                    {route.vehicleOwner}
                  </div>
                  <Badge
                    variant={getVehicleCategoryBadgeVariant(
                      route.vehicleCategory
                    )}
                    className="mt-1"
                  >
                    {route.vehicleCategory}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-md">{renderRouteSteps(route.steps)}</div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{route.totalLGAs} LGAs</Badge>
              </TableCell>
              {(userRole === "lga_admin" || userRole === "lga_agent") && (
                <TableCell>
                  {userLgaId && getLGAPositionForUser(route, userLgaId) && (
                    <Badge variant="secondary">
                      {getLGAPositionForUser(route, userLgaId)}
                    </Badge>
                  )}
                </TableCell>
              )}
              <TableCell>{route.createdAt.toLocaleDateString()}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onViewRoute(route)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    {canEdit(route) && (
                      <DropdownMenuItem onClick={() => onEditRoute(route)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Route
                      </DropdownMenuItem>
                    )}
                    {canDelete(route) && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => onDeleteRoute(route)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Route
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
