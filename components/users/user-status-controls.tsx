"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Settings, RotateCcw, UserX, Trash2 } from "lucide-react"
import type { SystemUser } from "@/types/users"
import type { UserPermissions } from "@/lib/user-permissions"

interface UserStatusControlsProps {
  user: SystemUser
  permissions: UserPermissions
  onResetPassword: () => void
  onSuspend: () => void
  onDelete?: () => void
}

export function UserStatusControls({
  user,
  permissions,
  onResetPassword,
  onSuspend,
  onDelete,
}: UserStatusControlsProps) {
  const [showSuspendDialog, setShowSuspendDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showResetDialog, setShowResetDialog] = useState(false)

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "suspended":
        return "destructive"
      case "pending":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const handleSuspend = () => {
    onSuspend()
    setShowSuspendDialog(false)
  }

  const handleDelete = () => {
    if (onDelete) {
      onDelete()
      setShowDeleteDialog(false)
    }
  }

  const handleResetPassword = () => {
    onResetPassword()
    setShowResetDialog(false)
  }

  // Don't show controls if user has no permissions
  if (!permissions.canResetPassword && !permissions.canSuspend && !permissions.canDelete) {
    return null
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Account Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Account Status</div>
              <div className="text-sm text-muted-foreground">Current user status</div>
            </div>
            <Badge variant={getStatusBadgeVariant(user.status)}>{user.status}</Badge>
          </div>

          <div className="space-y-2">
            {permissions.canResetPassword && (
              <Button variant="outline" className="w-full justify-start" onClick={() => setShowResetDialog(true)}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset Password
              </Button>
            )}

            {permissions.canSuspend && (
              <Button
                variant={user.status === "suspended" ? "default" : "destructive"}
                className="w-full justify-start"
                onClick={() => setShowSuspendDialog(true)}
              >
                <UserX className="mr-2 h-4 w-4" />
                {user.status === "suspended" ? "Reactivate User" : "Suspend User"}
              </Button>
            )}

            {permissions.canDelete && onDelete && (
              <Button variant="destructive" className="w-full justify-start" onClick={() => setShowDeleteDialog(true)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete User
              </Button>
            )}
          </div>

          <div className="text-xs text-muted-foreground">
            Actions are logged and may require additional confirmation.
          </div>
        </CardContent>
      </Card>

      {/* Reset Password Dialog */}
      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset Password</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reset the password for {user.name}? They will receive an email with instructions
              to set a new password.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleResetPassword}>Reset Password</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Suspend User Dialog */}
      <AlertDialog open={showSuspendDialog} onOpenChange={setShowSuspendDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{user.status === "suspended" ? "Reactivate User" : "Suspend User"}</AlertDialogTitle>
            <AlertDialogDescription>
              {user.status === "suspended"
                ? `Are you sure you want to reactivate ${user.name}? They will regain access to the system.`
                : `Are you sure you want to suspend ${user.name}? They will lose access to the system.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSuspend}>
              {user.status === "suspended" ? "Reactivate" : "Suspend"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete User Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently delete {user.name}? This action cannot be undone and will remove all
              associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
