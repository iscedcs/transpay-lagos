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
import { Plus, Search, Upload } from "lucide-react";
import { NIGERIAN_STATES } from "@/lib/nigeria-lgas";
import type { LGAFilters } from "@/types/lga";
import { ADMIN_ROLES } from "@/lib/const";

interface PageHeaderProps {
  userRole: string;
  filters: LGAFilters;
  onFiltersChange: (filters: LGAFilters) => void;
  onCreateLGA: () => void;
  onImportLGAs: () => void;
}

export function PageHeader({
  userRole,
  filters,
  onFiltersChange,
  onCreateLGA,
  onImportLGAs,
}: PageHeaderProps) {
  const canCreateLGA = ADMIN_ROLES.includes(userRole);

  const handleSearchChange = (search: string) => {
    onFiltersChange({ ...filters, search: search || undefined });
  };

  const handleStateChange = (stateCode: string) => {
    onFiltersChange({
      ...filters,
      stateCode: stateCode === "all" ? undefined : stateCode,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manage LGAs</h1>
          <p className="text-muted-foreground">
            View and manage Local Government Areas with official boundaries
          </p>
        </div>

        {canCreateLGA && (
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={onImportLGAs}>
              <Upload className="h-4 w-4 mr-2" />
              Import Official LGAs
            </Button>
            <Button onClick={onCreateLGA}>
              <Plus className="h-4 w-4 mr-2" />
              Create Custom LGA
            </Button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search LGAs..."
            value={filters.search || ""}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select
          value={filters.stateCode || "all"}
          onValueChange={handleStateChange}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by state" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All States</SelectItem>
            {Object.entries(NIGERIAN_STATES).map(([code, name]) => (
              <SelectItem key={code} value={code}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
