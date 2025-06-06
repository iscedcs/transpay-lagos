"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, FileText } from "lucide-react"
import { toast } from "sonner"
import type { ReportIssue, ScanLocation } from "@/types/scan"
import { reportIssue } from "@/lib/scan-data"

interface ReportIssueFormProps {
  vehicleId: string
  location: ScanLocation
  onClose: () => void
}

export function ReportIssueForm({ vehicleId, location, onClose }: ReportIssueFormProps) {
  const [issueType, setIssueType] = useState<ReportIssue["issueType"]>()
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const issueTypes = [
    { value: "damaged_sticker", label: "Damaged QR Code/Sticker" },
    { value: "fake_sticker", label: "Suspected Fake Sticker" },
    { value: "suspicious_activity", label: "Suspicious Activity" },
    { value: "other", label: "Other Issue" },
  ]

  const handleSubmit = async () => {
    if (!issueType || !description.trim()) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)
    try {
      const report: ReportIssue = {
        vehicleId,
        issueType,
        description: description.trim(),
        location,
      }

      const response = await reportIssue(report)

      if (response.success) {
        toast.success(`Issue reported successfully. Report ID: ${response.reportId}`)
        onClose()
      }
    } catch (error) {
      toast.error("Failed to submit report. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Report Vehicle Issue
              </CardTitle>
              <CardDescription>Report any issues with this vehicle or its documentation</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="issue-type">Issue Type *</Label>
            <Select value={issueType} onValueChange={(value) => setIssueType(value as ReportIssue["issueType"])}>
              <SelectTrigger>
                <SelectValue placeholder="Select issue type" />
              </SelectTrigger>
              <SelectContent>
                {issueTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Provide detailed information about the issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div className="text-xs text-muted-foreground">
            <p>Vehicle ID: {vehicleId}</p>
            <p>
              Location: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
            </p>
          </div>

          <div className="flex gap-2 pt-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !issueType || !description.trim()}
              className="flex-1"
            >
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
