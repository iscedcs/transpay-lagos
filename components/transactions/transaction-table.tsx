"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, ArrowUpDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import type { Transaction, TransactionFilters } from "@/types/transactions"

interface TransactionTableProps {
  transactions: Transaction[]
  filters: TransactionFilters
  onFiltersChange: (filters: TransactionFilters) => void
}

export function TransactionTable({ transactions, filters, onFiltersChange }: TransactionTableProps) {
  const router = useRouter()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Success
          </Badge>
        )
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    const typeColors = {
      payment: "bg-blue-100 text-blue-800",
      fee: "bg-purple-100 text-purple-800",
      fine: "bg-red-100 text-red-800",
      route_fee: "bg-orange-100 text-orange-800",
      refund: "bg-gray-100 text-gray-800",
    }

    return (
      <Badge variant="outline" className={typeColors[type as keyof typeof typeColors]}>
        {type.replace("_", " ").toUpperCase()}
      </Badge>
    )
  }

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount)
  }

  const handleSort = (column: "timestamp" | "amount") => {
    const newOrder = filters.sortBy === column && filters.sortOrder === "desc" ? "asc" : "desc"
    onFiltersChange({
      ...filters,
      sortBy: column,
      sortOrder: newOrder,
    })
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No transactions found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Reference</TableHead>
            <TableHead>Vehicle Plate</TableHead>
            <TableHead className="text-right">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort("amount")}
                className="h-auto p-0 font-semibold"
              >
                Amount
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>LGA</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort("timestamp")}
                className="h-auto p-0 font-semibold"
              >
                Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">{transaction.reference}</TableCell>
              <TableCell>
                <Button
                  variant="link"
                  className="h-auto p-0 font-medium"
                  onClick={() => router.push(`/dashboard/vehicles/${transaction.vehicleId}`)}
                >
                  {transaction.vehiclePlateNumber}
                </Button>
              </TableCell>
              <TableCell className="text-right font-medium">{formatAmount(transaction.amount)}</TableCell>
              <TableCell>{getTypeBadge(transaction.type)}</TableCell>
              <TableCell>{getStatusBadge(transaction.status)}</TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{transaction.lgaName}</div>
                  <div className="text-sm text-muted-foreground">{transaction.stateName}</div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{format(new Date(transaction.timestamp), "MMM dd, yyyy")}</div>
                  <div className="text-sm text-muted-foreground">
                    {format(new Date(transaction.timestamp), "HH:mm")}
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" onClick={() => router.push(`/transactions/${transaction.id}`)}>
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
