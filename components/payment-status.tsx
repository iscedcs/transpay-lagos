import { Alert, AlertDescription } from "@/components/ui/alert"

interface PaymentStatusProps {
  status: "processing" | "success" | "error"
  cardId: string
  amount: number
  attempts: number
  maxAttempts: number
}

export function PaymentStatus({ status, cardId, amount, attempts, maxAttempts }: PaymentStatusProps) {
  const getDisplayCardId = (id: string) => {
    if (id.length < 6) return id.toUpperCase()
    return `${id.slice(0, 3)}...${id.slice(-3)}`.toUpperCase()
  }

  if (status === "processing") {
    return (
      <Alert>
        <AlertDescription>Processing payment...</AlertDescription>
      </Alert>
    )
  }

  if (status === "success") {
    return (
      <Alert>
        <AlertDescription>
          Payment of ₦{amount} successful for card {getDisplayCardId(cardId)}!
        </AlertDescription>
      </Alert>
    )
  }

  if (status === "error") {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          {attempts >= maxAttempts
            ? `Maximum attempts reached. Payment failed for card ${getDisplayCardId(cardId)}.`
            : "Error processing payment. Please try again."}
        </AlertDescription>
      </Alert>
    )
  }

  return null
}

