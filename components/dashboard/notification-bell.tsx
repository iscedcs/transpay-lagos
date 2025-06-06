"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

export function NotificationBell() {
  return (
    <Button variant="ghost" size="icon" className="relative">
      <Bell className="h-5 w-5" />
      <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
        3
      </span>
    </Button>
  )
}
