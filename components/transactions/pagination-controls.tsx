"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { TransactionFilters } from "@/types/transactions"

interface PaginationControlsProps {
  filters: TransactionFilters
  total: number
  onFiltersChange: (filters: TransactionFilters) => void
}

export function PaginationControls({ filters, total, onFiltersChange }: PaginationControlsProps) {
  const page = filters.page || 1
  const limit = filters.limit || 10
  const totalPages = Math.ceil(total / limit)
  const startItem = (page - 1) * limit + 1
  const endItem = Math.min(page * limit, total)

  const handlePageChange = (newPage: number) => {
    onFiltersChange({
      ...filters,
      page: newPage,
    })
  }

  const handleLimitChange = (newLimit: string) => {
    onFiltersChange({
      ...filters,
      limit: Number.parseInt(newLimit),
      page: 1, // Reset to first page when changing limit
    })
  }

  if (total === 0) return null

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <p className="text-sm text-muted-foreground">
          Showing {startItem} to {endItem} of {total} results
        </p>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select value={limit.toString()} onValueChange={handleLimitChange}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent side="top">
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">
            Page {page} of {totalPages}
          </p>
          <div className="flex items-center space-x-1">
            <Button variant="outline" size="sm" onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
