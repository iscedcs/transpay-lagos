"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, RotateCcw, UserX, Trash2 } from "lucide-react";
import type { SystemUser } from "@/types/users";
import type { UserPermissions } from "@/lib/user-permissions";

interface UserProfileHeaderProps {
  user: SystemUser;
  permissions: UserPermissions;
  onEdit?: () => void;
  onResetPassword: () => void;
  onSuspend: () => void;
  onDelete?: () => void;
}

export function UserProfileHeader({
  user,
  permissions,
  onEdit,
  onResetPassword,
  onSuspend,
  onDelete,
}: UserProfileHeaderProps) {
  const getRoleDisplayName = (role: string) => {
    return role
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "super_admin":
        return "destructive";
      case "admin":
        return "default";
      case "lga_admin":
        return "secondary";
      case "lga_agent":
        return "outline";
      case "lga_compliance":
        return "outline";
      default:
        return "secondary";
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "suspended":
        return "destructive";
      case "pending":
        return "secondary";
      default:
        return "secondary";
    }
  };

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={`/placeholder.svg?height=64&width=64&text=${user.name.charAt(
                0
              )}`}
            />
            <AvatarFallback className="text-lg">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant={getRoleBadgeVariant(user.role)}>
                {getRoleDisplayName(user.role)}
              </Badge>
              <Badge variant={getStatusBadgeVariant(user.status)}>
                {user.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              User ID: {user.id}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {permissions.canEdit && (
            <Button onClick={onEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {permissions.canResetPassword && (
                <DropdownMenuItem onClick={onResetPassword}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset Password
                </DropdownMenuItem>
              )}
              {permissions.canSuspend && (
                <DropdownMenuItem
                  onClick={onSuspend}
                  className={
                    user.status === "suspended"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  <UserX className="mr-2 h-4 w-4" />
                  {user.status === "suspended" ? "Reactivate" : "Suspend"}
                </DropdownMenuItem>
              )}
              {permissions.canDelete && onDelete && (
                <DropdownMenuItem onClick={onDelete} className="text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete User
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
