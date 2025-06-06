import { auth } from "@/auth";
import ProtectedRoute from "@/components/auth/protected-wrapper";
import DashboardAdmin from "@/components/role/admin/dashboard";
import DashboardAgent from "@/components/role/agent/dashboard";
import DashboardSuperAdmin from "@/components/role/super-admin/dashboard";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) {
    return redirect("/sign-in");
  }
  const ROLE = session?.user.role;
  return (
    <ProtectedRoute>
      <div className="flex w-full flex-col gap-5 p-3 md:p-5">
        <div className="text-title2Bold md:text-h5Bold">
          Welcome Back, {session.user?.name ?? "User"}
        </div>
        <div className="w-full">
          {ROLE?.toLowerCase() === "superadmin" ? (
            <DashboardSuperAdmin />
          ) : ROLE?.toLowerCase() === "admin" ? (
            <DashboardAdmin />
          ) : (
            <DashboardAgent />
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
