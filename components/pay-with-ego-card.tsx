"use client"

import { useState } from "react"
import { CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CardScanner } from "./card-scanner"
import { PinEntry } from "./pin-entry"
import { PaymentStatus } from "./payment-status"

const DEFAULT_PIN = "1505"
const TRIP_PRICE = Math.round((Math.random() * (4000 - 500) + 500) / 100) * 100 // random amount between 500 and 4000 to the nearest 100
const MAX_ATTEMPTS = 3

export function PayWithEgoCard() {
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "awaiting_pin" | "processing" | "success" | "error">(
    "idle",
  )
  const [cardId, setCardId] = useState("")
  const [attempts, setAttempts] = useState(0)

  const handleCardScanned = (scannedCardId: string) => {
    setCardId(scannedCardId)
    setPaymentStatus("awaiting_pin")
    setAttempts(0)
  }

  const handlePinSubmit = (pin: string) => {
    setPaymentStatus("processing")
    // Simulate payment processing
    setTimeout(() => {
      if (pin === DEFAULT_PIN) {
        setPaymentStatus("success")
      } else {
        const newAttempts = attempts + 1
        setAttempts(newAttempts)
        if (newAttempts >= MAX_ATTEMPTS) {
          setPaymentStatus("error")
        } else {
          setPaymentStatus("awaiting_pin")
        }
      }
    }, 1500)
  }

  const resetPayment = () => {
    setPaymentStatus("idle")
    setCardId("")
    setAttempts(0)
  }

  const getDisplayCardId = (id: string) => {
    if (id.length < 6) return id.toUpperCase()
    return `${id.slice(0, 3)}...${id.slice(-3)}`.toUpperCase()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex gap-2">
          <CreditCard className="h-4 w-4" />
          Pay with Ego Card
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Pay with Ego Card</DialogTitle>
          <DialogDescription>Use your NFC-enabled Ego Card to pay ₦{TRIP_PRICE} for this trip.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {paymentStatus === "idle" && <CardScanner onCardScanned={handleCardScanned} />}
          {paymentStatus === "awaiting_pin" && (
            <>
              <Alert>
                <AlertDescription>Card scanned: {getDisplayCardId(cardId)}</AlertDescription>
              </Alert>
              <PinEntry onPinSubmit={handlePinSubmit} attempts={attempts} maxAttempts={MAX_ATTEMPTS} />
            </>
          )}
          {(paymentStatus === "processing" || paymentStatus === "success" || paymentStatus === "error") && (
            <PaymentStatus
              status={paymentStatus}
              cardId={cardId}
              amount={TRIP_PRICE}
              attempts={attempts}
              maxAttempts={MAX_ATTEMPTS}
            />
          )}
          {(paymentStatus === "success" || paymentStatus === "error") && (
            <Button onClick={resetPayment}>Start Over</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
