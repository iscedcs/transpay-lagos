"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, X } from "lucide-react";
import { STATE_CONFIG } from "@/lib/constants";
import { getAvailableRolesForUser } from "@/lib/auth";
import type { UserFilters as UserFiltersType } from "@/types/users";

interface UserFiltersProps {
  userRole: string;
  userStateId?: string;
  filters: UserFiltersType;
  onFiltersChange: (filters: UserFiltersType) => void;
}

export function UserFilters({
  userRole,
  userStateId,
  filters,
  onFiltersChange,
}: UserFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const availableRoles = getAvailableRolesForUser(userRole);

  const handleFilterChange = (key: keyof UserFiltersType, value: string) => {
    const newFilters = { ...filters };
    if (value === "all" || value === "") {
      delete newFilters[key];
    } else {
      newFilters[key] = value;
    }

    // Reset LGA when state changes
    if (key === "stateId" && newFilters.lgaId) {
      delete newFilters.lgaId;
    }

    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  const getRoleDisplayName = (role: string) => {
    return role
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or phone..."
                value={filters.search || ""}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                  {Object.keys(filters).length}
                </span>
              )}
            </Button>
            {hasActiveFilters && (
              <Button variant="ghost" onClick={clearFilters}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Advanced Filters */}
          {isExpanded && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t">
              {/* Role Filter */}
              <div className="space-y-2">
                <Label>Role</Label>
                <Select
                  value={filters.role || "all"}
                  onValueChange={(value) => handleFilterChange("role", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Roles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    {availableRoles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {getRoleDisplayName(role)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* State Filter */}
              <div className="space-y-2">
                <Label>State</Label>
                <Select
                  value={filters.stateId || userStateId || "all"}
                  onValueChange={(value) =>
                    handleFilterChange("stateId", value)
                  }
                  disabled={userRole === "ADMIN" && !!userStateId} // Admin locked to their state
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All States" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    <SelectItem value="1">{STATE_CONFIG.name}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* LGA Filter */}
              <div className="space-y-2">
                <Label>LGA</Label>
                <Select
                  value={filters.lgaId || "all"}
                  onValueChange={(value) => handleFilterChange("lgaId", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All LGAs" />
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

              {/* Status Filter */}
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={filters.status || "all"}
                  onValueChange={(value) => handleFilterChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
