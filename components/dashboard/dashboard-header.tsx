import { User } from "@prisma/client";
import { NotificationBell } from "./notification-bell";
import { UserMenu } from "./user-menu";
import { STATE_CONFIG } from "@/lib/constants";

interface DashboardHeaderProps {
  user: User;
  title: string;
  breadcrumbs?: string[];
}

export function DashboardHeader({
  user,
  title,
  breadcrumbs,
}: DashboardHeaderProps) {
  return (
    <header className="border-b bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <span>{STATE_CONFIG.name}</span>
            {breadcrumbs && (
              <>
                {breadcrumbs.map((crumb, index) => (
                  <span key={index} className="flex items-center gap-2">
                    <span>/</span>
                    <span>{crumb}</span>
                  </span>
                ))}
              </>
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        </div>

        <div className="flex items-center gap-4">
          <NotificationBell />
          <UserMenu user={user} />
        </div>
      </div>
    </header>
  );
}
