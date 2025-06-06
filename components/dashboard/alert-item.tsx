"use client"

import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface AlertItemProps {
  actionLabel?: string
  dismissible?: boolean
  onAction?: () => void
  onDismiss?: () => void
}

export function AlertItem({ actionLabel, dismissible, onAction, onDismiss }: AlertItemProps) {
  return (
    <div className="flex items-center gap-2">
      {actionLabel && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
      {dismissible && (
        <Button variant="ghost" size="sm" onClick={onDismiss}>
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
