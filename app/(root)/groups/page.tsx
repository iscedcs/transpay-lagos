import { getGroupsAction } from "@/actions/groups";
import { auth } from "@/auth";
import { PaginationISCE } from "@/components/shared/pagination-isce";
import { AddGroupModal } from "@/components/ui/add-modal-group";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { groupedVehiclesColumns } from "@/components/ui/table/columns";
import { DataTable } from "@/components/ui/table/data-table";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
  params: Promise<{ id: string }>;
}
export async function generateMetadata({ params }: PageProps) {
  return {
    title: `LASITRAS - Groups ${(await params).id}`,
  };
}
export default async function GroupVehiclePage({ searchParams }: PageProps) {
  const session = await auth();
  if (!session) return redirect("/sign-in");

  const page = (await searchParams)["page"] ?? "1";
  const limit = (await searchParams)["limit"] ?? "15";
  const groups = await getGroupsAction();
  const start = (Number(page) - 1) * Number(limit);
  const end = start + Number(limit);

  return (
    <div className="px-4">
      <div className="flex items-center justify-between font-bold uppercase">
        <h1 className="shrink-0 grow-0">Vehicles In Groups</h1>

        {session.user.role?.toLowerCase() !== "green_engine" && (
          <div className="shrink-0 grow-0">
            <Dialog>
              <DialogTrigger>
                <AddGroupModal />
              </DialogTrigger>
            </Dialog>
          </div>
        )}
      </div>
      <div className="items-center justify-between flex font-bold py-5 uppercase"></div>

      {session.user.role.toLowerCase() !== "agent" &&
      session.user.role.toLowerCase() !== "admin" &&
      session.user.role.toLowerCase() !== "green_engine" ? (
        <>
          <div className="mb-10 flex flex-col gap-5">
            <DataTable
              showSearch
              searchWith="groupName"
              searchWithPlaceholder="Enter company/business name"
              showColumns
              columns={groupedVehiclesColumns}
              data={groups.vehicle_groups}
            />
          </div>
          {groups && (
            <PaginationISCE
              hasNextPage={end < groups.pagination.totalCount}
              hasPrevPage={start > 0}
              page={Number(page)}
              limit={Number(limit)}
              total={groups.pagination.totalCount}
              hrefPrefix="/groups"
            />
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
}
