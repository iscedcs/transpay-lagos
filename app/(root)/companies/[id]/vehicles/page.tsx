import { companyVehiclesColumn } from "@/components/ui/table/columns";
import { DataTable } from "@/components/ui/table/data-table";
import { getVehiclesFromCompanies } from "@/lib/controllers/company-controller";
import React from "react";
import { PaginationISCE } from "@/components/shared/pagination-isce";


interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function Vehicles({
  params,
  searchParams,
}:PageProps) {
  const id = (await params).id;
  const page = (await searchParams)["page"] ?? "1";
  const limit = (await searchParams)["limit"] ?? "3";
  const vehicles = await getVehiclesFromCompanies(id, page, limit);
  const start = (Number(page) - 1) * Number(limit);
  const end = start + Number(limit);

  return (
    <div className="px-4">
      <p className=" text-[20px] font-bold uppercase">All Vehicles</p>
      <div className="mb-10 flex flex-col gap-5">
        <DataTable
          showSearch
          searchWith="name"
          searchWithPlaceholder="Enter company/business name"
          showColumns
          columns={companyVehiclesColumn}
          data={vehicles ? vehicles.rows : []}
        />
      </div>
      {vehicles && (
        <PaginationISCE
          hasNextPage={end < vehicles.meta?.totalPages}
          hasPrevPage={start > 0}
          page={Number(page)}
          limit={Number(limit)}
          total={Number(vehicles.meta?.totalVehicles)}
          hrefPrefix="/companies"
        />
      )}
    </div>
  );
}
