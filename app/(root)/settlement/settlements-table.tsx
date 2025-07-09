import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, Eye, Download, RefreshCw } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Settlement } from "./types"

interface SettlementsTableProps {
  settlements: Settlement[]
}

export function SettlementsTable({ settlements }: SettlementsTableProps) {
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "default"
      case "PENDING":
        return "secondary"
      case "FAILED":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (settlements.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <h3 className="text-lg font-semibold">No settlements found</h3>
            <p className="text-muted-foreground">Try adjusting your search filters</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settlement Records</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Settlement ID</TableHead>
              <TableHead>LGA</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>State Share</TableHead>
              <TableHead>IRS Share</TableHead>
              <TableHead>LGA Share</TableHead>
              <TableHead>ISCE Share</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {settlements.map((settlement) => (
              <TableRow key={settlement.id}>
                <TableCell className="font-mono text-sm">{settlement.id.slice(0, 8)}...</TableCell>
                <TableCell className="font-medium">{settlement.lgaName}</TableCell>
                <TableCell className="font-medium">{formatCurrency(settlement.totalAmount)}</TableCell>
                <TableCell>{formatCurrency(settlement.stateShare)}</TableCell>
                <TableCell>{formatCurrency(settlement.irsShare)}</TableCell>
                <TableCell>{formatCurrency(settlement.lgaShare)}</TableCell>
                <TableCell>{formatCurrency(settlement.isceShare)}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(settlement.status)}>{settlement.status}</Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{formatDate(settlement.createdAt)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-2" />
                        Download Receipt
                      </DropdownMenuItem>
                      {settlement.status === "FAILED" && (
                        <DropdownMenuItem>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Retry Settlement
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
