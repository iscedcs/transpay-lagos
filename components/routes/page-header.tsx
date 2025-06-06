"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import { STATE_CONFIG } from "@/lib/constants";
import type { RouteFilters } from "@/types/routes";
import { ADMIN_ROLES } from "@/lib/const";

interface PageHeaderProps {
  userRole: string;
  userLgaId: string | null;
  filters: RouteFilters;
  onFiltersChange: (filters: RouteFilters) => void;
  onAssignRoute: () => void;
}

export function PageHeader({
  userRole,
  userLgaId,
  filters,
  onFiltersChange,
  onAssignRoute,
}: PageHeaderProps) {
  const canAssignRoute = ADMIN_ROLES.includes(userRole);

  const handleSearchChange = (search: string) => {
    onFiltersChange({ ...filters, search: search || undefined });
  };

  const handleStateChange = (stateId: string) => {
    onFiltersChange({
      ...filters,
      stateId: stateId === "all" ? undefined : stateId,
    });
  };

  const handleLGAChange = (lgaId: string) => {
    onFiltersChange({ ...filters, lgaId: lgaId === "all" ? undefined : lgaId });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Vehicle Routes</h1>
          <p className="text-muted-foreground">
            {userRole === "lga_admin" || userRole === "lga_agent"
              ? "View and manage routes passing through your LGA"
              : "Define and manage commercial vehicle routes"}
          </p>
        </div>

        {canAssignRoute && (
          <Button onClick={onAssignRoute}>
            <Plus className="h-4 w-4 mr-2" />
            Assign Route
          </Button>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by vehicle plate or ID..."
            value={filters.search || ""}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select
          value={filters.stateId || "all"}
          onValueChange={handleStateChange}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by state" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All States</SelectItem>
            <SelectItem value="1">{STATE_CONFIG.name}</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.lgaId || "all"} onValueChange={handleLGAChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by LGA" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All LGAs</SelectItem>
            {STATE_CONFIG.lgas.map((lga) => (
              <SelectItem key={lga.id} value={lga.id}>
                {lga.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
