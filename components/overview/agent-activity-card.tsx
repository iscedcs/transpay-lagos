import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, Activity } from "lucide-react"
import Link from "next/link"
import type { AgentPerformance } from "@/types/overview"

interface AgentActivityCardProps {
  agents: AgentPerformance[]
}

export function AgentActivityCard({ agents }: AgentActivityCardProps) {
  const formatLastActive = (date: Date) => {
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

  const getRoleBadgeVariant = (role: string) => {
    return role.includes("Compliance") ? "secondary" : "default"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Agent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {agents.map((agent) => (
            <div key={agent.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={agent.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {agent.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{agent.name}</div>
                  <Badge variant={getRoleBadgeVariant(agent.role)} className="text-xs">
                    {agent.role}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">
                  {agent.scansCompleted} scans • {agent.vehiclesRegistered} regs
                </div>
                <div className="text-xs text-muted-foreground">Last seen {formatLastActive(agent.lastActive)}</div>
              </div>
              <Link href={`/dashboard/users/${agent.id}`}>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View User
                </Button>
              </Link>
            </div>
          ))}
          {agents.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">No agents found in this LGA.</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
