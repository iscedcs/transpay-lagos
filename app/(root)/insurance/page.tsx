import { Suspense } from "react";
import { InsuranceContent } from "./insurance-content";
import { InsuranceHeader } from "./insurance-header";
import InsuranceLoading from "./insurance-loading";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    plan?: string;
    status?: string;
    eligibility?: string;
    lgaId?: string;
  }>;
}

export default async function InsurancePage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;

  return (
    <div className="p-4 space-y-6">
      <InsuranceHeader />
      <Suspense fallback={<InsuranceLoading />}>
        <InsuranceContent searchParams={resolvedSearchParams} />
      </Suspense>
    </div>
  );
}
