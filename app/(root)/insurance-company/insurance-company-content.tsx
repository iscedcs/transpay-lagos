import { InsuranceCompanyFilters } from "./insurance-company-filters";
import { InsuranceCompanyPagination } from "./insurance-company-pagination";
import { InsuranceCompanyStats } from "./insurance-company-stats";
import { fetchInsuranceCompanyData } from "./actions";
import { InsuranceCompanyTable } from "./insurance-company-table";

interface InsuranceCompanyContentProps {
  searchParams: {
    page?: string;
    limit?: string;
    search?: string;
    status?: string;
    claimType?: string;
  };
}

export async function InsuranceCompanyContent({
  searchParams,
}: InsuranceCompanyContentProps) {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;
  const search = searchParams.search || "";
  const status = searchParams.status || "";
  const claimType = searchParams.claimType || "";

  const data = await fetchInsuranceCompanyData({
    page,
    limit,
    search,
    status,
    claimType,
  });

  return (
    <div className="space-y-4">
      <InsuranceCompanyStats />
      <InsuranceCompanyFilters />
      <InsuranceCompanyTable claims={data.data} />
      <InsuranceCompanyPagination
        currentPage={data.meta.page}
        totalPages={data.meta.totalPages}
        totalCount={data.meta.count}
      />
    </div>
  );
}
