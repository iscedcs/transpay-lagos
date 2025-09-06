"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface CardScannerProps {
  onCardScanned: (cardId: string) => void
}

export function CardScanner({ onCardScanned }: CardScannerProps) {
  const [isNfcSupported, setIsNfcSupported] = useState(false)
  const [isReading, setIsReading] = useState(false)

  useEffect(() => {
    if ("NDEFReader" in window) {
      setIsNfcSupported(true)
    }
  }, [])

  const handleNfcRead = async () => {
    if (!isNfcSupported) return

    setIsReading(true)

    try {
      const ndef = new (window as any).NDEFReader()
      await ndef.scan()

      ndef.addEventListener("reading", ({ message }: any) => {
        const record = message.records[0]
        if (record && record.recordType === "url") {
          const decoder = new TextDecoder()
          const url = decoder.decode(record.data)
          const idMatch = url.match(/id=([^&]+)/)
          if (idMatch && idMatch[1]) {
            onCardScanned(idMatch[1])
          } else {
            throw new Error("Invalid card data")
          }
        } else {
          throw new Error("Invalid card data")
        }
        setIsReading(false)
      })
    } catch (error) {
      console.error("Error reading NFC:", error)
      setIsReading(false)
    }
  }

  if (!isNfcSupported) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          NFC is not supported on this device or browser. Please use a compatible device or browser.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Button onClick={handleNfcRead} disabled={isReading}>
      {isReading ? "Scanning..." : "Scan Ego Card"}
    </Button>
  )
}
