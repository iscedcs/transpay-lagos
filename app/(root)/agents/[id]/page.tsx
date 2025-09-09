import { getAllActivitiesById } from "@/actions/audit-trails";
import { allVehiclesRegisteredByAgentId } from "@/actions/vehicles";
import { UpdateAgentForm } from "@/components/forms/update-agent-form";
import { PasswordChanger } from "@/components/pages/agents/password-changer";
import VehicleCounter from "@/components/pages/agents/vehicle-counter";
import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/controllers/users.controller";
import { addIcon } from "@/lib/icons";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const agent = await getUser(resolvedParams.id);
  return {
    title:
      `LASITRAS Agent - ${agent?.firstName?.toLocaleUpperCase() || ""} ${
        agent?.lastName?.toLocaleUpperCase() || ""
      }`.trim() || "Transpay Agent",
  };
}

export default async function SingularAgent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const agent = await getUser(resolvedParams.id);
  if (!agent) return notFound();

  const all_activities = await getAllActivitiesById(resolvedParams.id);
  const allVehicles = await allVehiclesRegisteredByAgentId(resolvedParams.id);

  return (
    <div className="flex h-full w-full flex-col gap-5 p-3 xs:p-5">
      <div className="flex items-center justify-between">
        <div className="shrink-0 grow-0">
          {agent?.firstName?.toLocaleUpperCase() || ""}{" "}
          {agent?.lastName?.toLocaleUpperCase() || ""}
        </div>
      </div>
      <div className="flex flex-col gap-3 xs:gap-5">
        <div className="space-y-6">
          <div className="flex h-12 w-full shrink-0 items-center overflow-hidden rounded-2xl bg-primary text-white">
            <div className="h-12 w-12 bg-black p-3">{addIcon}</div>
            <div className="pl-1">PERSONAL INFORMATION</div>
          </div>
          <UpdateAgentForm agent={agent} />
        </div>
        <div className="mb-20 flex flex-col gap-2">
          <div className="flex justify-between py-2">
            <div className="shrink-0 grow-0 text-title1Bold">
              Recent Activities
            </div>
            <Button asChild variant="link">
              <Link href={`/agents/${agent.id}/activities`}>See all</Link>
            </Button>
          </div>
          <div className="flex justify-between">
            <Link href={`/agents/${agent.id}/vehicles`}>
              <VehicleCounter count={allVehicles.success?.data.count} />
            </Link>
            <PasswordChanger userId={agent.id} />
          </div>
          <div>
            {/* <Card className="bg-secondary">
                            <ActivityListAction allActivities={all_activities} />
                        </Card> */}
          </div>
        </div>
      </div>
    </div>
  );
}
