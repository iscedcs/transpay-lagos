import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, Building, UserCheck, Eye, Car } from "lucide-react"

export function UserRoleLegend() {
  const roles = [
    {
      role: "super_admin",
      label: "Super Admin",
      color: "bg-red-500",
      icon: Shield,
      description: "Full system access",
    },
    {
      role: "admin",
      label: "Admin",
      color: "bg-blue-500",
      icon: Users,
      description: "State-level management",
    },
    {
      role: "lga_admin",
      label: "LGA Admin",
      color: "bg-green-500",
      icon: Building,
      description: "LGA management",
    },
    {
      role: "lga_agent",
      label: "LGA Agent",
      color: "bg-yellow-500",
      icon: UserCheck,
      description: "Field operations",
    },
    {
      role: "lga_compliance",
      label: "LGA Compliance",
      color: "bg-purple-500",
      icon: Eye,
      description: "Compliance monitoring",
    },
    {
      role: "vehicle_owner",
      label: "Vehicle Owner",
      color: "bg-gray-500",
      icon: Car,
      description: "Vehicle management",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Role Legend</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {roles.map((role) => {
          const IconComponent = role.icon
          return (
            <div key={role.role} className="flex items-center gap-2 text-sm">
              <div className={`w-3 h-3 rounded-full ${role.color}`} />
              <IconComponent className="h-3 w-3" />
              <span className="font-medium">{role.label}</span>
              <span className="text-muted-foreground text-xs">- {role.description}</span>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
