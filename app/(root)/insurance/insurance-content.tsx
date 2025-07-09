import { InsuranceFilters } from "./insurance-filters"
import { InsuranceTable } from "./insurance-table"
import { InsurancePagination } from "./insurance-pagination"
import { InsuranceStats } from "./insurance-stats"
import { fetchInsuranceData } from "./actions"

interface InsuranceContentProps {
  searchParams: {
    page?: string
    limit?: string
    search?: string
    plan?: string
    status?: string
    eligibility?: string
    lgaId?: string
  }
}

export async function InsuranceContent({ searchParams }: InsuranceContentProps) {
  const page = Number(searchParams.page) || 1
  const limit = Number(searchParams.limit) || 10
  const search = searchParams.search || ""
  const plan = searchParams.plan || ""
  const status = searchParams.status || ""
  const eligibility = searchParams.eligibility || ""
  const lgaId = searchParams.lgaId || ""

  const data = await fetchInsuranceData({
    page,
    limit,
    search,
    plan,
    status,
    eligibility,
    lgaId,
  })

  return (
    <div className="space-y-4">
      <InsuranceStats />
      <InsuranceFilters />
      <InsuranceTable vehicles={data.data} />
      <InsurancePagination
        currentPage={data.meta.page}
        totalPages={data.meta.totalPages}
        totalCount={data.meta.count}
      />
    </div>
  )
}
