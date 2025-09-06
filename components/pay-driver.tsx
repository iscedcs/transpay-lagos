"use client"

import { useState } from "react"
import { CreditCard, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card } from "./ui/card"
import { PayWithEgoCard } from "./pay-with-ego-card"

export function PayDriver() {
  const [paymentMethod, setPaymentMethod] = useState("ussd")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-2">
          <CreditCard className="h-4 w-4" />
          Pay Driver
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Pay Driver</DialogTitle>
          <DialogDescription>Choose a payment method to pay the driver.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <RadioGroup className="text-primary" value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ussd" id="ussd" />
                <CreditCard className="h-4 w-4" />
                <Label htmlFor="ussd">USSD</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ego-card" id="ego-card" />
                <CreditCard className="h-4 w-4" />
                <Label htmlFor="ego-card">Pay with Ego Card</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                <Smartphone className="h-4 w-4" />
                <Label htmlFor="bank-transfer">Bank Transfer</Label>
              </div>
          </RadioGroup>

          {paymentMethod === "ussd" && (
            <Card className="grid gap-2 p-4 bg-muted">
              <Label htmlFor="ussd-code">USSD Code</Label>
              <Input id="ussd-code" value="*123*4567#" readOnly />
              <p className="text-sm text-muted-foreground">Dial this code on your phone to complete the payment.</p>
            </Card>
          )}

          {paymentMethod === "ego-card" && (
            <PayWithEgoCard />
          )}

          {paymentMethod === "bank-transfer" && (
            <Card className="grid gap-2 p-4 bg-muted">
              <p className="font-medium">Account Details:</p>
              <p>Bank: Ego Bank</p>
              <p>Account Number: 1234567890</p>
              <p>Account Name: Vehicle Owner Name</p>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
