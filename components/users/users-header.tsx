"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAvailableRolesForUser } from "@/lib/auth"

interface UsersHeaderProps {
  userRole: string
  onAddUser: () => void
  selectedRole: string
  onRoleChange: (role: string) => void
}

export function UsersHeader({ userRole, onAddUser, selectedRole, onRoleChange }: UsersHeaderProps) {
  const availableRoles = getAvailableRolesForUser(userRole)

  const getRoleDisplayName = (role: string) => {
    return role
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <p className="text-muted-foreground">View and manage system users</p>
      </div>

      <div className="flex items-center gap-4">
        <Tabs value={selectedRole} onValueChange={onRoleChange}>
          <TabsList>
            <TabsTrigger value="all">All Roles</TabsTrigger>
            {availableRoles.map((role) => (
              <TabsTrigger key={role} value={role}>
                {getRoleDisplayName(role)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <Button onClick={onAddUser}>
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>
    </div>
  )
}
