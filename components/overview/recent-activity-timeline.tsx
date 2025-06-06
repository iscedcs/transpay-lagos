import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Car, Scan, CreditCard, UserPlus, QrCode } from "lucide-react"
import type { RecentActivity } from "@/types/overview"

interface RecentActivityTimelineProps {
  activities: RecentActivity[]
}

export function RecentActivityTimeline({ activities }: RecentActivityTimelineProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "registration":
        return <Car className="h-4 w-4" />
      case "scan":
        return <Scan className="h-4 w-4" />
      case "payment":
        return <CreditCard className="h-4 w-4" />
      case "account":
        return <UserPlus className="h-4 w-4" />
      case "sticker":
        return <QrCode className="h-4 w-4" />
      default:
        return <Car className="h-4 w-4" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "registration":
        return "bg-blue-500"
      case "scan":
        return "bg-green-500"
      case "payment":
        return "bg-emerald-500"
      case "account":
        return "bg-purple-500"
      case "sticker":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest system activities and events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={activity.id} className="flex items-start gap-4">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-white ${getActivityColor(activity.type)}`}
              >
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium">{activity.description}</p>
                  {activity.plateNumber && (
                    <Badge variant="outline" className="text-xs">
                      {activity.plateNumber}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Avatar className="h-4 w-4">
                    <AvatarFallback className="text-xs">
                      {activity.userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span>{activity.userName}</span>
                  <span>•</span>
                  <span>{formatTimeAgo(activity.timestamp)}</span>
                </div>
              </div>
            </div>
          ))}
          {activities.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">No recent activity found.</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
