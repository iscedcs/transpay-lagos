import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Car, Scan, CreditCard, AlertTriangle } from "lucide-react"

interface ActivityItem {
  id: string
  type: "registration" | "scan" | "payment" | "violation" | "login"
  description: string
  timestamp: Date
  location?: string
}

interface UserActivityLogProps {
  userId: string
  userLgaId?: string
  viewerLgaId?: string
  isLgaAdmin?: boolean
}

export function UserActivityLog({ userId, userLgaId, viewerLgaId, isLgaAdmin }: UserActivityLogProps) {
  // Mock activity data - filter by LGA for LGA Admin
  const mockActivities: ActivityItem[] = [
    {
      id: "1",
      type: "login",
      description: "Logged into the system",
      timestamp: new Date("2024-01-15T10:30:00"),
      location: "Ikeja LGA",
    },
    {
      id: "2",
      type: "registration",
      description: "Registered vehicle LAG-123-ABC",
      timestamp: new Date("2024-01-15T09:15:00"),
      location: "Ikeja LGA",
    },
    {
      id: "3",
      type: "scan",
      description: "Scanned 15 vehicles for compliance",
      timestamp: new Date("2024-01-14T16:45:00"),
      location: "Ikeja LGA",
    },
    {
      id: "4",
      type: "payment",
      description: "Processed payment for vehicle LAG-456-DEF",
      timestamp: new Date("2024-01-14T14:20:00"),
      location: "Lagos Island LGA",
    },
    {
      id: "5",
      type: "violation",
      description: "Reported non-compliance violation",
      timestamp: new Date("2024-01-13T11:30:00"),
      location: "Victoria Island LGA",
    },
  ]

  // Filter activities for LGA Admin - only show activities in their LGA
  const filteredActivities = isLgaAdmin
    ? mockActivities.filter((activity) => activity.location?.includes(viewerLgaId === "1" ? "Ikeja" : "Unknown"))
    : mockActivities

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "registration":
        return <Car className="h-4 w-4" />
      case "scan":
        return <Scan className="h-4 w-4" />
      case "payment":
        return <CreditCard className="h-4 w-4" />
      case "violation":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getActivityBadgeVariant = (type: string) => {
    switch (type) {
      case "registration":
        return "default"
      case "scan":
        return "secondary"
      case "payment":
        return "outline"
      case "violation":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Recent Activity
          {isLgaAdmin && (
            <Badge variant="outline" className="ml-2">
              LGA Scope
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredActivities.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No recent activity found
              {isLgaAdmin && " in your LGA"}
            </div>
          ) : (
            filteredActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border">
                <div className="mt-1">{getActivityIcon(activity.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={getActivityBadgeVariant(activity.type)}>{activity.type}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {activity.timestamp.toLocaleDateString()} at {activity.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm">{activity.description}</p>
                  {activity.location && (
                    <p className="text-xs text-muted-foreground mt-1">Location: {activity.location}</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
