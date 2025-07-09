import { Suspense } from "react";
import { InsuranceCompanyContent } from "./insurance-company-content";
import { InsuranceCompanyHeader } from "./insurance-company-header";
import InsuranceCompanyLoading from "./insurance-company-loading";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    status?: string;
    claimType?: string;
  }>;
}

export default async function InsuranceCompanyPage({
  searchParams,
}: PageProps) {
  const resolvedSearchParams = await searchParams;

  return (
    <div className="p-4 space-y-6">
      <InsuranceCompanyHeader />
      <Suspense fallback={<InsuranceCompanyLoading />}>
        <InsuranceCompanyContent searchParams={resolvedSearchParams} />
      </Suspense>
    </div>
  );
}
