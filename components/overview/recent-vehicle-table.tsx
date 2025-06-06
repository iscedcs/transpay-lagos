import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import Link from "next/link"

interface RecentVehicle {
  id: string
  plateNumber: string
  registeredDate: Date
  ownerName: string
  status: string
}

interface RecentVehicleTableProps {
  vehicles: RecentVehicle[]
}

export function RecentVehicleTable({ vehicles }: RecentVehicleTableProps) {
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Compliant":
        return "default"
      case "Pending":
        return "secondary"
      case "Overdue":
        return "destructive"
      default:
        return "outline"
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
      Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
      "day",
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Vehicles</CardTitle>
        <CardDescription>Latest vehicle registrations in this LGA</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Plate Number</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Registered</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[70px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell className="font-medium">{vehicle.plateNumber}</TableCell>
                <TableCell>{vehicle.ownerName}</TableCell>
                <TableCell>{formatDate(vehicle.registeredDate)}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(vehicle.status)}>{vehicle.status}</Badge>
                </TableCell>
                <TableCell>
                  <Link href={`/dashboard/vehicles/${vehicle.id}`}>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {vehicles.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">No recent vehicles found.</div>
        )}
      </CardContent>
    </Card>
  )
}
