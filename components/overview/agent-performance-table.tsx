import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import Link from "next/link"
import type { AgentPerformance } from "@/types/overview"

interface AgentPerformanceTableProps {
  agents: AgentPerformance[]
}

export function AgentPerformanceTable({ agents }: AgentPerformanceTableProps) {
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
        <CardTitle>Agent Performance</CardTitle>
        <CardDescription>Activity summary for field agents and compliance officers</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Agent</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Assigned LGA</TableHead>
              <TableHead>Registrations</TableHead>
              <TableHead>Scans</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="w-[70px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agents.map((agent) => (
              <TableRow key={agent.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={agent.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {agent.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{agent.name}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getRoleBadgeVariant(agent.role)}>{agent.role}</Badge>
                </TableCell>
                <TableCell>{agent.assignedLga}</TableCell>
                <TableCell>
                  <div className="font-medium">{agent.vehiclesRegistered}</div>
                  <div className="text-sm text-muted-foreground">this month</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{agent.scansCompleted}</div>
                  <div className="text-sm text-muted-foreground">this month</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{formatLastActive(agent.lastActive)}</div>
                </TableCell>
                <TableCell>
                  <Link href={`/dashboard/users/${agent.id}`}>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
