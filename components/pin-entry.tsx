"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

interface PinEntryProps {
  onPinSubmit: (pin: string) => void
  attempts: number
  maxAttempts: number
}

export function PinEntry({ onPinSubmit, attempts, maxAttempts }: PinEntryProps) {
  const [pin, setPin] = useState("")

  const handleSubmit = () => {
    onPinSubmit(pin)
    setPin("")
  }

  return (
    <div className="grid gap-4">
      <Label htmlFor="pin-otp">Enter your 4-digit PIN</Label>
      <InputOTP
        maxLength={4}
        value={pin}
        onChange={setPin}
        id="pin-otp"
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
      <p className="text-sm text-muted-foreground">
        Attempts remaining: {maxAttempts - attempts}
      </p>
      <Button onClick={handleSubmit} disabled={pin.length !== 4}>
        Submit PIN
      </Button>
    </div>
  )
}
