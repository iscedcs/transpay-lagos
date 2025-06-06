"use client";

import { useState, useEffect, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { ActivityItem } from "@/components/activity-item";
import { ActivityPagination } from "@/components/activity-pagination";
import {
  getActivities,
  type Activity,
  type ActivityFilters,
} from "@/actions/activities";
import { CalendarIcon, Filter, RefreshCw, Search, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ActivityIcon } from "lucide-react";
import { toast } from "sonner";

interface ActivitiesContentProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export function ActivitiesContent({ searchParams }: ActivitiesContentProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  // Filter states
  const [filters, setFilters] = useState<ActivityFilters>({
    page: 1,
    limit: 20,
    search: "",
    activityType: "",
    dateFrom: "",
    dateTo: "",
  });
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [showFilters, setShowFilters] = useState(false);

  const activityTypes = [
    "VEHICLE_CREATED",
    "VEHICLE_UPDATED",
    "VEHICLE_DELETED",
    "USER_CREATED",
    "USER_UPDATED",
    "USER_DELETED",
    "LGA_CREATED",
    "LGA_UPDATED",
    "LGA_DELETED",
    "PAYMENT_MADE",
    "PAYMENT_FAILED",
    "LOGIN_SUCCESS",
    "LOGIN_FAILED",
    "PASSWORD_CHANGED",
  ];

  const fetchActivities = async (newFilters: ActivityFilters) => {
    setLoading(true);
    try {
      const response = await getActivities(newFilters);
      setActivities(response.rows);
      setTotalPages(response.meta.total_pages);
      setCurrentPage(response.meta.page);
      setTotal(response.meta.total);
    } catch (error) {
      toast.error("Error", {
        description: "Failed to fetch activities",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities(filters);
  }, []);

  const handleFilterChange = (
    key: keyof ActivityFilters,
    value: string | number
  ) => {
    const newFilters = { ...filters, [key]: value, page: 1 };
    setFilters(newFilters);
    startTransition(() => {
      fetchActivities(newFilters);
    });
  };

  const handleDateFilter = () => {
    const newFilters = {
      ...filters,
      dateFrom: dateFrom ? format(dateFrom, "yyyy-MM-dd") : "",
      dateTo: dateTo ? format(dateTo, "yyyy-MM-dd") : "",
      page: 1,
    };
    setFilters(newFilters);
    startTransition(() => {
      fetchActivities(newFilters);
    });
  };

  const clearFilters = () => {
    const clearedFilters = {
      page: 1,
      limit: 20,
      search: "",
      activityType: "",
      dateFrom: "",
      dateTo: "",
    };
    setFilters(clearedFilters);
    setDateFrom(undefined);
    setDateTo(undefined);
    startTransition(() => {
      fetchActivities(clearedFilters);
    });
  };

  const handlePageChange = (page: number) => {
    const newFilters = { ...filters, page };
    setFilters(newFilters);
    startTransition(() => {
      fetchActivities(newFilters);
    });
  };

  const refreshActivities = () => {
    startTransition(() => {
      fetchActivities(filters);
    });
    toast.success("Refreshed", {
      description: "Activities have been refreshed",
    });
  };

  const hasActiveFilters =
    filters.search ||
    filters.activityType ||
    filters.dateFrom ||
    filters.dateTo;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>
              {total > 0
                ? `Showing ${activities.length} of ${total} activities`
                : "No activities found"}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className={cn(hasActiveFilters && "border-primary")}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <Badge
                  variant="outline"
                  className="ml-2 h-5 w-5 rounded-full p-0 text-xs"
                >
                  !
                </Badge>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={refreshActivities}
              disabled={isPending}
            >
              <RefreshCw
                className={cn("mr-2 h-4 w-4", isPending && "animate-spin")}
              />
              Refresh
            </Button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="space-y-4 pt-4 border-t">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* Search */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search activities..."
                    value={filters.search}
                    onChange={(e) =>
                      handleFilterChange("search", e.target.value)
                    }
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Activity Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Activity Type</label>
                <Select
                  value={filters.activityType}
                  onValueChange={(value) =>
                    handleFilterChange("activityType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All types</SelectItem>
                    {activityTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.replace(/_/g, " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date From */}
              <div className="space-y-2">
                <label className="text-sm font-medium">From Date</label>
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
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateFrom}
                      onSelect={setDateFrom}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Date To */}
              <div className="space-y-2">
                <label className="text-sm font-medium">To Date</label>
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
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateTo}
                      onSelect={setDateTo}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button onClick={handleDateFilter} size="sm">
                  Apply Filters
                </Button>
                {hasActiveFilters && (
                  <Button variant="outline" size="sm" onClick={clearFilters}>
                    <X className="mr-2 h-4 w-4" />
                    Clear All
                  </Button>
                )}
              </div>
              {hasActiveFilters && (
                <div className="flex items-center space-x-2">
                  {filters.search && (
                    <Badge variant="outline">Search: {filters.search}</Badge>
                  )}
                  {filters.activityType && (
                    <Badge variant="outline">
                      Type: {filters.activityType.replace(/_/g, " ")}
                    </Badge>
                  )}
                  {filters.dateFrom && (
                    <Badge variant="outline">
                      From: {format(new Date(filters.dateFrom), "MMM dd")}
                    </Badge>
                  )}
                  {filters.dateTo && (
                    <Badge variant="outline">
                      To: {format(new Date(filters.dateTo), "MMM dd")}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-muted rounded-full" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                  <div className="h-6 w-16 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : activities.length > 0 ? (
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={activity.id}>
                <ActivityItem activity={activity} />
                {index < activities.length - 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            ))}

            {totalPages > 1 && (
              <div className="pt-4">
                <ActivityPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <ActivityIcon className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No activities found</h3>
            <p className="text-muted-foreground">
              {hasActiveFilters
                ? "Try adjusting your filters to see more activities."
                : "Activities will appear here as they happen."}
            </p>
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters} className="mt-4">
                Clear Filters
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
