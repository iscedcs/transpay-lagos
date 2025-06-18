import { redirect } from "next/navigation";

import { Role, User } from "@prisma/client";
import { USER_ROLES } from "@/lib/constants";
import { ADMIN_ROLES } from "./const";
import { auth } from "@/auth";

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

// User role types
export type UserRole = Role;

// Authorization configuration
export interface AuthConfig {
  allowedRoles?: UserRole[];
  deniedRoles?: UserRole[];
  redirectTo?: string;
  unauthorizedRedirect?: string;
}

/**
 * Check if a user role is authorized based on allowed and denied roles
 * @param userRole - The user's role
 * @param allowedRoles - Array of roles that are allowed (if empty, all roles are allowed)
 * @param deniedRoles - Array of roles that are explicitly denied
 * @returns boolean indicating if the user is authorized
 */
export function isAuthorized(
  userRole: UserRole | null,
  allowedRoles: UserRole[] = [],
  deniedRoles: UserRole[] = []
): boolean {
  // If no user role (not authenticated), return false
  if (!userRole) {
    return false;
  }

  // If role is explicitly denied, return false
  if (deniedRoles.includes(userRole)) {
    return false;
  }

  // If no allowed roles specified, allow all roles (except denied ones)
  if (allowedRoles.length === 0) {
    return true;
  }

  // Check if user role is in allowed roles
  return allowedRoles.includes(userRole);
}

/**
 * Server-side authorization function that redirects based on user role
 * @param config - Authorization configuration
 */
export async function requireAuth(config: AuthConfig = {}) {
  const {
    allowedRoles = [],
    deniedRoles = [],
    redirectTo = "/sign-in",
    unauthorizedRedirect = "/unauthorized",
  } = config;

  try {
    const session = await auth();
    const user = session?.user;

    // If no user (not authenticated), redirect to sign-in
    if (!user) {
      redirect(redirectTo);
    }

    // Check authorization
    const authorized = isAuthorized(
      user.role as Role,
      allowedRoles,
      deniedRoles
    );

    // If not authorized, redirect to unauthorized page
    if (!authorized) {
      redirect(unauthorizedRedirect);
    }

    return user;
  } catch (error) {
    console.error("Authorization error:", error);
    redirect(redirectTo);
  }
}

/**
 * Role-based access control utility
 */
export class RBAC {
  /**
   * Check if user can access admin features
   */
  static canAccessAdmin(userRole: UserRole | null): boolean {
    return isAuthorized(userRole, ["SUPERADMIN", "ADMIN"]);
  }

  /**
   * Check if user can manage users
   */
  static canManageUsers(userRole: UserRole | null): boolean {
    return isAuthorized(userRole, ["SUPERADMIN", "ADMIN"]);
  }

  /**
   * Check if user can manage LGAs
   */
  static canManageLGAs(userRole: UserRole | null): boolean {
    return isAuthorized(userRole, ["SUPERADMIN", "ADMIN", "LGA_AGENT"]);
  }

  /**
   * Check if user can manage vehicles
   */
  static canManageVehicles(userRole: UserRole | null): boolean {
    return isAuthorized(userRole, ["SUPERADMIN", "ADMIN", "LGA_AGENT"]);
  }

  /**
   * Check if user can view own vehicles only
   */
  static canViewOwnVehicles(userRole: UserRole | null): boolean {
    return isAuthorized(userRole, ["VEHICLE_OWNER"]);
  }

  /**
   * Check if user is super admin
   */
  static isSuperAdmin(userRole: UserRole | null): boolean {
    return isAuthorized(userRole, ["SUPERADMIN"]);
  }
}

/**
 * Get user permissions based on role
 */
export function getUserPermissions(userRole: UserRole | null) {
  return {
    canAccessAdmin: RBAC.canAccessAdmin(userRole),
    canManageUsers: RBAC.canManageUsers(userRole),
    canManageLGAs: RBAC.canManageLGAs(userRole),
    canManageVehicles: RBAC.canManageVehicles(userRole),
    canViewOwnVehicles: RBAC.canViewOwnVehicles(userRole),
    isSuperAdmin: RBAC.isSuperAdmin(userRole),
  };
}
