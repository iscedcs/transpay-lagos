"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Car, ExternalLink, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Transaction } from "@/types/transactions"

interface VehicleSummaryMiniCardProps {
  transaction: Transaction
}

export function VehicleSummaryMiniCard({ transaction }: VehicleSummaryMiniCardProps) {
  const router = useRouter()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="h-5 w-5" />
          Vehicle Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Plate Number</p>
            <p className="text-lg font-mono font-bold">{transaction.vehiclePlateNumber}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/dashboard/vehicles/${transaction.vehicleId}`)}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View Vehicle
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Vehicle ID</p>
            <p className="text-sm font-mono">{transaction.vehicleId}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Location</p>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-muted-foreground" />
              <p className="text-sm">{transaction.lgaName}</p>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground">
            Click "View Vehicle" to see complete vehicle details, owner information, and transaction history.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
