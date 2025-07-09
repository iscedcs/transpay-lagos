import { SettlementsFilters } from "./settlements-filters"
import { SettlementsCharts } from "./settlements-charts"
import { SettlementsTable } from "./settlements-table"
import { SettlementsPagination } from "./settlements-pagination"
import { fetchSettlements } from "./actions"

interface SettlementsContentProps {
  searchParams: {
    page?: string
    limit?: string
    dateFrom?: string
    dateTo?: string
    lgaId?: string
    status?: string
    period?: string
  }
}

export async function SettlementsContent({ searchParams }: SettlementsContentProps) {
  const page = Number(searchParams.page) || 1
  const limit = Number(searchParams.limit) || 10
  const dateFrom = searchParams.dateFrom || ""
  const dateTo = searchParams.dateTo || ""
  const lgaId = searchParams.lgaId || ""
  const status = searchParams.status || ""
  const period = searchParams.period || "monthly"

  const data = await fetchSettlements({
    page,
    limit,
    dateFrom,
    dateTo,
    lgaId,
    status,
    period,
  })

  return (
    <div className="space-y-6">
      <SettlementsFilters />
      <SettlementsCharts settlements={data.data} period={period} />
      <SettlementsTable settlements={data.data} />
      <SettlementsPagination
        currentPage={data.meta.page}
        totalPages={data.meta.totalPages}
        totalCount={data.meta.count}
      />
    </div>
  )
}
