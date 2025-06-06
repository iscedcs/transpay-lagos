import { auth } from "@/auth";
import RoleGateServer from "@/components/shared/RoleGate";
import { PaginationISCE } from "@/components/shared/pagination-isce";
import { AddGroupModal } from "@/components/ui/add-modal-group";
import { Dialog } from "@/components/ui/dialog";
import { companiesColumn } from "@/components/ui/table/columns";
import { DataTable } from "@/components/ui/table/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HAS_COMPANY_ACCESS } from "@/lib/const";
import {
  getCompanies,
  getCompaniesByUserID,
  getDeletedCompanies,
} from "@/lib/controllers/company-controller";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function CompaniesPage({
  searchParams,
}: PageProps) {
  const session = await auth();
  if (!session?.user.role) return redirect("/sign-in");

  const role = session.user.role;
  const uID = session.user.id;
  const IsCompanyAgent = HAS_COMPANY_ACCESS.includes(
    role as (typeof HAS_COMPANY_ACCESS)[number]
  );

  const page = (await searchParams)["page"] ?? "1";
  const limit = (await searchParams)["limit"] ?? "15";
  const companies = await getCompanies(page, limit, false);
  const companyAgent = await getCompaniesByUserID(uID, page, limit);
  const deletedCompanies = await getDeletedCompanies(page, limit, false);
  const start = (Number(page) - 1) * Number(limit);
  const end = start + Number(limit);

  return (
    <RoleGateServer opts={{ allowedRole: HAS_COMPANY_ACCESS }}>
      <div className="px-4">
        <div className="flex items-center flex-wrap gap-2 justify-between font-bold uppercase">
          <h1 className="shrink-0 grow-0">
            {/* @ts-ignore */}
            All Companies (
            {role.toLowerCase() === "company_agent"
              ? companyAgent?.totalCompanies
              : role.toLowerCase() === "superadmin"
              ? (companies?.meta.totalCompanies ?? 0) +
                (deletedCompanies?.meta.totalCompanies ?? 0)
              : 0}
            )
          </h1>

          {IsCompanyAgent && (
            <div className="shrink-0 grow-0">
              <Dialog>
                <AddGroupModal />
              </Dialog>
            </div>
          )}
        </div>
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">
              All (
              {role.toLowerCase() === "company_agent"
                ? companyAgent?.totalCompanies
                : role.toLowerCase() === "superadmin"
                ? companies?.meta.totalCompanies ?? 0
                : 0}
              )
            </TabsTrigger>
            {role.toLowerCase() != "company_agent" && (
              <TabsTrigger value="deleted">
                Deleted ({deletedCompanies?.meta.totalCompanies})
              </TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="all">
            {IsCompanyAgent && (
              <>
                <div className="mb-10 flex flex-col gap-5">
                  <DataTable
                    showSearch
                    searchWith="name"
                    searchWithPlaceholder="Enter company/business name"
                    showColumns
                    columns={companiesColumn}
                    data={
                      role.toLowerCase() === "company_agent"
                        ? companyAgent?.companies ?? []
                        : role.toLowerCase() === "superadmin"
                        ? companies?.filteredCompanies ?? []
                        : []
                    }
                  />
                </div>
                <PaginationISCE
                  hasNextPage={
                    role.toLowerCase() === "company_agent"
                      ? end < (companyAgent?.totalCompanies ?? 0)
                      : role.toLowerCase() === "superadmin"
                      ? end > (companies?.meta?.totalPages ?? 0)
                      : false
                  }
                  hasPrevPage={start > 0}
                  page={Number(page)}
                  limit={Number(limit)}
                  total={
                    role.toLowerCase() === "superadmin"
                      ? Number(companies?.meta?.totalCompanies) ?? 0
                      : role.toLowerCase() === "company_agent"
                      ? Number(companyAgent?.totalCompanies) ?? 0
                      : 0
                  }
                  hrefPrefix="/companies"
                />
              </>
            )}
          </TabsContent>
          {role.toLowerCase() != "company_agent" && (
            <TabsContent value="deleted">
              {IsCompanyAgent && (
                <>
                  <div className="mb-10 flex flex-col gap-5">
                    <DataTable
                      showSearch
                      searchWith="name"
                      searchWithPlaceholder="Enter company/business name"
                      showColumns
                      columns={companiesColumn}
                      data={
                        deletedCompanies
                          ? deletedCompanies.filteredCompanies
                          : []
                      }
                    />
                  </div>
                  {deletedCompanies && (
                    <PaginationISCE
                      hasNextPage={end < deletedCompanies.meta?.totalPages}
                      hasPrevPage={start > 0}
                      page={Number(page)}
                      limit={Number(limit)}
                      total={Number(deletedCompanies.meta?.totalCompanies)}
                      hrefPrefix="/companies"
                    />
                  )}
                </>
              )}
            </TabsContent>
          )}
        </Tabs>
      </div>
    </RoleGateServer>
  );
}
