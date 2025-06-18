import { getMe } from "@/actions/users";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SuperadminDashboard from "./superadmin-dashboard.tsx";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user.id) {
    redirect("/sign-in");
  }
  const user = await getMe();
  if (!user) {
    redirect("/sign-in");
  }

  return <SuperadminDashboard />;
}
