import { Suspense } from "react"
import { SettlementsContent } from "./settlements-content"
import { SettlementsHeader } from "./settlements-header"
import SettlementsLoading from "./settlements-loading"

interface PageProps {
  searchParams: Promise<{
    page?: string
    limit?: string
    dateFrom?: string
    dateTo?: string
    lgaId?: string
    status?: string
    period?: string
  }>
}

export default async function SettlementsPage({ searchParams }: PageProps) {
    const resolvedSearchParams = await searchParams

  return (
    <div className="container mx-auto py-6 space-y-6">
      <SettlementsHeader />
      <Suspense fallback={<SettlementsLoading />}>
        <SettlementsContent searchParams={resolvedSearchParams} />
      </Suspense>
    </div>
  )
}
