'use client'

import { MoreVertical } from 'lucide-react'
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Vehicle {
  id: string
  owner: string
  plateNumber: string
  status: string
  category: string
  groupId: string
}

interface Group {
  id: string
  name: string
}

// Sample data - replace with your API data
const groups: Group[] = [
  { id: "1", name: "Group A" },
  { id: "2", name: "Group B" },
  { id: "3", name: "Group C" },
]

const vehicles: Vehicle[] = [
  {
    id: "1",
    owner: "Ibrahim Iliya",
    plateNumber: "GBD752VL",
    status: "ACTIVE",
    category: "TRICYCLE",
    groupId: "1"
  },
  {
    id: "2",
    owner: "CHINONSO GARBA",
    plateNumber: "AGU772ZW",
    status: "ACTIVE",
    category: "TRICYCLE",
    groupId: "1"
  },
  {
    id: "3",
    owner: "JOSEPH AKPELU",
    plateNumber: "GDD614ZN",
    status: "ACTIVE",
    category: "TRUCKS",
    groupId: "2"
  },
  {
    id: "4",
    owner: "Kosarachukwu Ngwuta",
    plateNumber: "UWN174QN",
    status: "ACTIVE",
    category: "TRICYCLE",
    groupId: "3"
  },
  {
    id: "5",
    owner: "CHIDIEBERE NWAFOR",
    plateNumber: "ALD681UA",
    status: "ACTIVE",
    category: "TRICYCLE",
    groupId: "2"
  },
]

export default function GroupedVehiclesTable() {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)

  const filteredVehicles = selectedGroup
    ? vehicles.filter(vehicle => vehicle.groupId === selectedGroup)
    : vehicles

  return (
    <div className="w-full">
      <div className="flex space-y-3 items-center justify-between mb-4">
      <div className="inline-flex h-10 w-full items-end justify-start border-b border-primary bg-background text-muted-foreground">
        <h2 className="inline-flex items-center justify-center whitespace-nowrap border-primary px-3 py-1.5 text-sm font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b-2 data-[state=active]:text-foreground data-[state=active]:shadow-sm">Vehicles by Group</h2>
        </div>
        <div className="flex gap-2">
          <select
            className="border rounded p-2"
            value={selectedGroup || ''}
            onChange={(e) => setSelectedGroup(e.target.value || null)}
          >
            <option value="">All Groups</option>
            {groups.map(group => (
              <option key={group.id} value={group.id}>{group.name}</option>
            ))}
          </select>
         
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Group</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Plate Number</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredVehicles.map(vehicle => {
            const group = groups.find(g => g.id === vehicle.groupId)
            return (
              <TableRow key={vehicle.id}>
                <TableCell>{group?.name || 'N/A'}</TableCell>
                <TableCell>{vehicle.owner}</TableCell>
                <TableCell>{vehicle.plateNumber}</TableCell>
                <TableCell>{vehicle.status}</TableCell>
                <TableCell>{vehicle.category}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Move to Another Group</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Remove from Group
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

