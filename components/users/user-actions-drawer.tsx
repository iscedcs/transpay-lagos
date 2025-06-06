"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
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
import { Mail, Phone, MapPin, Calendar, RotateCcw, UserX } from "lucide-react"
import type { SystemUser } from "@/types/users"

interface UserActionsDrawerProps {
  user: SystemUser | null
  isOpen: boolean
  onClose: () => void
  onSuspendUser: (user: SystemUser) => void
  onResetPassword: (user: SystemUser) => void
}

export function UserActionsDrawer({ user, isOpen, onClose, onSuspendUser, onResetPassword }: UserActionsDrawerProps) {
  const [showSuspendDialog, setShowSuspendDialog] = useState(false)
  const [showResetDialog, setShowResetDialog] = useState(false)

  if (!user) return null

  const getRoleDisplayName = (role: string) => {
    return role
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "super_admin":
        return "destructive"
      case "admin":
        return "default"
      case "lga_admin":
        return "secondary"
      default:
        return "outline"
    }
  }

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

  const handleSuspendUser = () => {
    onSuspendUser(user)
    setShowSuspendDialog(false)
    onClose()
  }

  const handleResetPassword = () => {
    onResetPassword(user)
    setShowResetDialog(false)
    onClose()
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>User Details</SheetTitle>
            <SheetDescription>View and manage user information</SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            {/* User Profile */}
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={`/placeholder.svg?height=64&width=64&text=${user.name.charAt(0)}`} />
                <AvatarFallback className="text-lg">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={getRoleBadgeVariant(user.role)}>{getRoleDisplayName(user.role)}</Badge>
                  <Badge variant={getStatusBadgeVariant(user.status)}>{user.status}</Badge>
                </div>
              </div>
            </div>

            <Separator />

            {/* Contact Information */}
            <div className="space-y-4">
              <h4 className="font-medium">Contact Information</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{user.phone}</span>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Location Information */}
            <div className="space-y-4">
              <h4 className="font-medium">Assignment</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div>{user.stateName || "No state assigned"}</div>
                    {user.lgaName && <div className="text-sm text-muted-foreground">{user.lgaName}</div>}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Account Information */}
            <div className="space-y-4">
              <h4 className="font-medium">Account Information</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm">Created: {user.createdAt.toLocaleDateString()}</div>
                    {user.lastLogin && (
                      <div className="text-sm text-muted-foreground">
                        Last login: {user.lastLogin.toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Actions */}
            <div className="space-y-4">
              <h4 className="font-medium">Actions</h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => setShowResetDialog(true)}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset Password
                </Button>
                <Button
                  variant={user.status === "suspended" ? "default" : "destructive"}
                  className="w-full justify-start"
                  onClick={() => setShowSuspendDialog(true)}
                >
                  <UserX className="mr-2 h-4 w-4" />
                  {user.status === "suspended" ? "Reactivate User" : "Suspend User"}
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

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
            <AlertDialogAction onClick={handleSuspendUser}>
              {user.status === "suspended" ? "Reactivate" : "Suspend"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
    </>
  )
}
