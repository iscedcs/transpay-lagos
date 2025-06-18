import { auth } from "@/auth";
import { BitsForm } from "@/components/forms/new-bit-form";
import { SettingsForm } from "@/components/forms/new-settings-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { bitsColumns, settingsColumns } from "@/components/ui/table/columns";
import { DataTable } from "@/components/ui/table/data-table";
import { isAuthorized } from "@/lib/auth";
import { getSettings } from "@/lib/controllers/setting-controller";
import { Role } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function SuperAdminSettingsPage() {
  const session = await auth();
  if (!isAuthorized(session?.user.role as Role, ["SUPERADMIN"])) {
    redirect("/unauthorized");
  }
  const settings = await getSettings();
  const bits = await getSettings();
  return (
    <div className="w-full flex flex-col px-3">
      <div className="w-full flex gap-5 justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="h-5 w-5" />{" "}
              <span className="hidden md:block">New Setting</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <SettingsForm />
            {/* <DialogFooter>
							<DialogCancel>Cancel</DialogCancel>
						</DialogFooter> */}
          </DialogContent>
        </Dialog>
      </div>
      {!settings || settings?.length === 0 ? (
        <div className="">No settings available</div>
      ) : (
        <DataTable
          showSearch
          searchWith="name"
          searchWithPlaceholder="Search with name"
          showColumns
          showPagination
          columns={settingsColumns}
          data={settings || []}
        />
      )}
      <Separator className="my-4" />
      <div className="w-full flex gap-5 justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="h-5 w-5" />{" "}
              <span className="hidden md:block">New Bits</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <BitsForm />
            {/* <DialogFooter>
							<DialogCancel>Cancel</DialogCancel>
						</DialogFooter> */}
          </DialogContent>
        </Dialog>
      </div>
      {!bits || bits?.length === 0 ? (
        <div className="">No bits available</div>
      ) : (
        <DataTable
          showSearch
          searchWith="name"
          searchWithPlaceholder="Search with name"
          showColumns
          showPagination
          columns={bitsColumns}
          data={bits || []}
        />
      )}
    </div>
  );
}
