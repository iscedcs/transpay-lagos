import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, AlertTriangle } from "lucide-react"
import Link from "next/link"
import type { TopDefaulter } from "@/types/overview"

interface TopDefaultersListProps {
  defaulters: TopDefaulter[]
}

export function TopDefaultersList({ defaulters }: TopDefaultersListProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Overdue":
        return "destructive"
      case "Non-Compliant":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          Top Defaulters
        </CardTitle>
        <CardDescription>Vehicles with most missed scans or overdue levies</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {defaulters.map((defaulter) => (
            <div key={defaulter.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="font-medium text-lg">{defaulter.plateNumber}</div>
                  <Badge variant={getStatusBadgeVariant(defaulter.status)}>{defaulter.status}</Badge>
                </div>
                <div className="text-sm text-muted-foreground mb-1">Owner: {defaulter.ownerName}</div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-red-600 font-medium">Amount Owed: {formatCurrency(defaulter.amountOwed)}</span>
                  <span className="text-muted-foreground">{defaulter.daysMissed} days missed</span>
                </div>
              </div>
              <Link href={`/dashboard/vehicles/${defaulter.id}`}>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
              </Link>
            </div>
          ))}
          {defaulters.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">No defaulters found. Great compliance!</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
