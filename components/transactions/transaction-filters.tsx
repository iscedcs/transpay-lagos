"use client";

import { useState, useEffect } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Filter, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { TransactionFilters } from "@/types/transactions";
import { getMe } from "@/actions/users";

interface TransactionFiltersProps {
  filters: TransactionFilters;
  onFiltersChange: (filters: TransactionFilters) => void;
  showStateFilter?: boolean;
  showLgaFilter?: boolean;
  lockedLga?: string;
}

export function TransactionFilters({
  filters,
  onFiltersChange,
  showStateFilter = true,
  showLgaFilter = true,
  lockedLga,
}: TransactionFiltersProps) {
  const [user, setUser] = useState<any>(null);
  const [states, setStates] = useState<any[]>([]);
  const [lgas, setLgas] = useState<any[]>([]);
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await getMe();
      setUser(currentUser);
    };
    loadUser();
  }, []);

  // useEffect(() => {
  //   const loadStates = async () => {
  //     const statesData = await getStates();
  //     setStates(statesData);
  //   };
  //   if (showStateFilter) {
  //     loadStates();
  //   }
  // }, [showStateFilter]);

  // useEffect(() => {
  //   const loadLGAs = async () => {
  //     if (filters.stateId) {
  //       const lgasData = await getLGAsByState(filters.stateId);
  //       setLgas(lgasData);
  //     } else {
  //       setLgas([]);
  //     }
  //   };
  //   if (showLgaFilter && !lockedLga) {
  //     loadLGAs();
  //   }
  // }, [filters.stateId, showLgaFilter, lockedLga]);

  const handleFilterChange = (key: keyof TransactionFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };

    // Reset page when filters change
    if (key !== "page") {
      newFilters.page = 1;
    }

    onFiltersChange(newFilters);
  };

  const handleDateRangeChange = () => {
    if (dateFrom && dateTo) {
      handleFilterChange("dateRange", {
        from: dateFrom.toISOString(),
        to: dateTo.toISOString(),
      });
    } else {
      handleFilterChange("dateRange", undefined);
    }
  };

  const clearFilters = () => {
    setDateFrom(undefined);
    setDateTo(undefined);
    onFiltersChange({
      page: 1,
      limit: filters.limit,
    });
  };

  const hasActiveFilters =
    filters.type ||
    filters.status ||
    filters.stateId ||
    filters.lgaId ||
    filters.search ||
    filters.dateRange;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filters
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Plate number, reference..."
              value={filters.search || ""}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>

          {/* Transaction Type */}
          <div className="space-y-2">
            <Label>Transaction Type</Label>
            <Select
              value={filters.type || ""}
              onValueChange={(value) =>
                handleFilterChange("type", value || undefined)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                <SelectItem value="payment">Payment</SelectItem>
                <SelectItem value="fee">Fee</SelectItem>
                <SelectItem value="fine">Fine</SelectItem>
                <SelectItem value="route_fee">Route Fee</SelectItem>
                <SelectItem value="refund">Refund</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={filters.status || ""}
              onValueChange={(value) =>
                handleFilterChange("status", value || undefined)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* State Filter */}
          {showStateFilter && user?.role !== "lga_admin" && (
            <div className="space-y-2">
              <Label>State</Label>
              <Select
                value={filters.stateId || ""}
                onValueChange={(value) =>
                  handleFilterChange("stateId", value || undefined)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All states" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All states</SelectItem>
                  {states.map((state) => (
                    <SelectItem key={state.id} value={state.id}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* LGA Filter */}
          {showLgaFilter && !lockedLga && user?.role === "super_admin" && (
            <div className="space-y-2">
              <Label>LGA</Label>
              <Select
                value={filters.lgaId || ""}
                onValueChange={(value) =>
                  handleFilterChange("lgaId", value || undefined)
                }
                disabled={!filters.stateId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All LGAs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All LGAs</SelectItem>
                  {lgas.map((lga) => (
                    <SelectItem key={lga.id} value={lga.id}>
                      {lga.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Date From */}
          <div className="space-y-2">
            <Label>From Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateFrom && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFrom ? format(dateFrom, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateFrom}
                  onSelect={(date) => {
                    setDateFrom(date);
                    if (date && dateTo) {
                      handleDateRangeChange();
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Date To */}
          <div className="space-y-2">
            <Label>To Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateTo && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateTo ? format(dateTo, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateTo}
                  onSelect={(date) => {
                    setDateTo(date);
                    if (dateFrom && date) {
                      handleDateRangeChange();
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Sort Options */}
          <div className="space-y-2">
            <Label>Sort By</Label>
            <Select
              value={`${filters.sortBy || "timestamp"}-${
                filters.sortOrder || "desc"
              }`}
              onValueChange={(value) => {
                const [sortBy, sortOrder] = value.split("-");
                handleFilterChange("sortBy", sortBy);
                handleFilterChange("sortOrder", sortOrder);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="timestamp-desc">Newest First</SelectItem>
                <SelectItem value="timestamp-asc">Oldest First</SelectItem>
                <SelectItem value="amount-desc">Highest Amount</SelectItem>
                <SelectItem value="amount-asc">Lowest Amount</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
