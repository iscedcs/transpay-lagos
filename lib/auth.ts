import { redirect } from "next/navigation";

import { User } from "@prisma/client";
import { USER_ROLES } from "@/lib/constants";
import { ADMIN_ROLES } from "./const";

export function checkUserAccess(user: User, requiredRoles: string[]) {
  if (!requiredRoles.includes(user.role)) {
    redirect("/dashboard?error=unauthorized");
  }
}

export function canManageUsers(userRole: string): boolean {
  return ADMIN_ROLES.includes(userRole);
}

export function getAvailableRolesForUser(userRole: string): string[] {
  switch (userRole) {
    case USER_ROLES.SUPERADMIN:
      return Object.values(USER_ROLES);
    case USER_ROLES.ADMIN:
      return [
        USER_ROLES.ADMIN,
        USER_ROLES.LGA_ADMIN,
        USER_ROLES.LGA_AGENT,
        USER_ROLES.LGA_C_AGENT,
        USER_ROLES.VEHICLE_OWNER,
      ];
    default:
      return [];
  }
}
