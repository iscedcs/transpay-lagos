"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { Activity } from "@/actions/activities";
import {
  Car,
  User,
  MapPin,
  CreditCard,
  Shield,
  ChevronDown,
  Clock,
  ExternalLink,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ActivityItemProps {
  activity: Activity;
}

export function ActivityItem({ activity }: ActivityItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getActivityIcon = (name: string) => {
    if (name.includes("VEHICLE")) return Car;
    if (name.includes("USER")) return User;
    if (name.includes("LGA")) return MapPin;
    if (name.includes("PAYMENT")) return CreditCard;
    if (name.includes("LOGIN") || name.includes("PASSWORD")) return Shield;
    return Clock;
  };

  const getActivityColor = (name: string) => {
    if (name.includes("CREATED"))
      return "text-green-600 bg-green-50 border-green-200";
    if (name.includes("UPDATED"))
      return "text-blue-600 bg-blue-50 border-blue-200";
    if (name.includes("DELETED"))
      return "text-red-600 bg-red-50 border-red-200";
    if (name.includes("FAILED")) return "text-red-600 bg-red-50 border-red-200";
    if (name.includes("SUCCESS"))
      return "text-green-600 bg-green-50 border-green-200";
    return "text-gray-600 bg-gray-50 border-gray-200";
  };

  const getActivityBadgeVariant = (
    name: string
  ): "default" | "secondary" | "destructive" | "outline" => {
    if (name.includes("CREATED") || name.includes("SUCCESS")) return "default";
    if (name.includes("UPDATED")) return "secondary";
    if (name.includes("DELETED") || name.includes("FAILED"))
      return "destructive";
    return "outline";
  };

  const Icon = getActivityIcon(activity.name);
  const colorClass = getActivityColor(activity.name);

  return (
    <div className="group">
      <div className="flex items-start space-x-4">
        {/* Icon */}
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
            colorClass
          )}
        >
          <Icon className="h-5 w-5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                {activity.description}
              </p>
              <Badge variant={getActivityBadgeVariant(activity.name)}>
                {activity.name.replace(/_/g, " ")}
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(activity.createdAt), {
                  addSuffix: true,
                })}
              </span>
              {(activity.vehicleId || activity.meta) && (
                <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          isOpen && "rotate-180"
                        )}
                      />
                    </Button>
                  </CollapsibleTrigger>
                </Collapsible>
              )}
            </div>
          </div>

          <div className="mt-1 flex items-center space-x-4 text-sm text-muted-foreground">
            <span>ID: {activity.id.slice(0, 8)}...</span>
            {activity.userId && (
              <span>User: {activity.userId.slice(0, 8)}...</span>
            )}
            <span>{new Date(activity.createdAt).toLocaleString()}</span>
          </div>

          {/* Expandable Details */}
          {(activity.vehicleId || activity.meta) && (
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
              <CollapsibleContent className="mt-3">
                <Card className="bg-muted/30">
                  <CardContent className="p-4 space-y-3">
                    {activity.vehicleId && (
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Vehicle ID</p>
                          <p className="text-sm text-muted-foreground font-mono">
                            {activity.vehicleId}
                          </p>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <a href={`/vehicles/${activity.vehicleId}`}>
                            <ExternalLink className="mr-2 h-3 w-3" />
                            View
                          </a>
                        </Button>
                      </div>
                    )}

                    {activity.meta && (
                      <div>
                        <p className="text-sm font-medium mb-2">
                          Additional Details
                        </p>
                        <pre className="text-xs bg-background p-3 rounded border overflow-x-auto">
                          {JSON.stringify(activity.meta, null, 2)}
                        </pre>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="text-xs text-muted-foreground">
                        Created: {new Date(activity.createdAt).toLocaleString()}
                      </div>
                      {activity.updatedAt !== activity.createdAt && (
                        <div className="text-xs text-muted-foreground">
                          Updated:{" "}
                          {new Date(activity.updatedAt).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </CollapsibleContent>
            </Collapsible>
          )}
        </div>
      </div>
    </div>
  );
}
