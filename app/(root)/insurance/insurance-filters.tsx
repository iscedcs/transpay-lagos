"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, X, Plus } from "lucide-react"

export function InsuranceFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [plan, setPlan] = useState(searchParams.get("plan") || "ALL_PLANS")
  const [status, setStatus] = useState(searchParams.get("status") || "ALL_STATUS")
  const [eligibility, setEligibility] = useState(searchParams.get("eligibility") || "ALL_ELIGIBILITY")
  const [lgaId, setLgaId] = useState(searchParams.get("lgaId") || "ALL_LGAS")

  const updateFilters = () => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams)

      if (search) params.set("search", search)
      else params.delete("search")

      if (plan !== "ALL_PLANS") params.set("plan", plan)
      else params.delete("plan")

      if (status !== "ALL_STATUS") params.set("status", status)
      else params.delete("status")

      if (eligibility !== "ALL_ELIGIBILITY") params.set("eligibility", eligibility)
      else params.delete("eligibility")

      if (lgaId !== "ALL_LGAS") params.set("lgaId", lgaId)
      else params.delete("lgaId")

      params.set("page", "1")

      router.push(`?${params.toString()}`)
    })
  }

  const clearFilters = () => {
    setSearch("")
    setPlan("ALL_PLANS")
    setStatus("ALL_STATUS")
    setEligibility("ALL_ELIGIBILITY")
    setLgaId("ALL_LGAS")
    startTransition(() => {
      router.push(window.location.pathname)
    })
  }

  const hasActiveFilters =
    search ||
    plan !== "ALL_PLANS" ||
    status !== "ALL_STATUS" ||
    eligibility !== "ALL_ELIGIBILITY" ||
    lgaId !== "ALL_LGAS"

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by plate number, owner name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                  onKeyDown={(e) => e.key === "Enter" && updateFilters()}
                />
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              <Select value={plan} onValueChange={setPlan}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL_PLANS">All Plans</SelectItem>
                  <SelectItem value="BASIC">Basic</SelectItem>
                  <SelectItem value="PREMIUM">Premium</SelectItem>
                </SelectContent>
              </Select>

              <Select value={eligibility} onValueChange={setEligibility}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Eligibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL_ELIGIBILITY">All</SelectItem>
                  <SelectItem value="ELIGIBLE">Eligible</SelectItem>
                  <SelectItem value="NOT_ELIGIBLE">Not Eligible</SelectItem>
                </SelectContent>
              </Select>

              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL_STATUS">All Status</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                </SelectContent>
              </Select>

              <Select value={lgaId} onValueChange={setLgaId}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="LGA" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL_LGAS">All LGAs</SelectItem>
                  <SelectItem value="amuwo-odofin">Amuwo Odofin</SelectItem>
                  <SelectItem value="lagos-island">Lagos Island</SelectItem>
                  <SelectItem value="ikeja">Ikeja</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button onClick={updateFilters} disabled={isPending} size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Apply
            </Button>

            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters} disabled={isPending} size="sm">
                <X className="h-4 w-4 mr-2" />
                Clear
              </Button>
            )}

            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Enroll Vehicle
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
