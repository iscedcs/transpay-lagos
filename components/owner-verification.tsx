"use client"

import { useState } from "react"
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface OwnerVerificationProps {
    onVerificationSuccess: () => void,
    security_code?: string|null
}

export function OwnerVerification({ onVerificationSuccess, security_code }: OwnerVerificationProps) {
  const [showOwnerForm, setShowOwnerForm] = useState(false)
  const [securityCode, setSecurityCode] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)

  const handleVerification = () => {
    setIsVerifying(true)
    // Simulate verification process
    setTimeout(() => {
      onVerificationSuccess()
      setIsVerifying(false)
      setShowOwnerForm(false)
    }, 1500)
  }

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <Lock className="h-4 w-4" />
        <h3 className="font-semibold">Are you the vehicle owner?</h3>
      </div>

      {!showOwnerForm ? (
        <Button variant="outline" onClick={() => setShowOwnerForm(true)} className="w-full">
          Enter Security Code
        </Button>
      ) : (
        <div className="grid gap-4">
          <div>
            <Label htmlFor="security-code">Enter your Security Code</Label>
            <Input
              id="security-code"
              value={securityCode}
              onChange={(e) => setSecurityCode(e.target.value)}
              placeholder="Enter your Security Code"
              className="mt-1"
            />
          </div>
          <Button onClick={handleVerification} disabled={isVerifying}>
            {isVerifying ? "Verifying..." : "Verify Security Code"}
          </Button>
        </div>
      )}
    </div>
  )
}
