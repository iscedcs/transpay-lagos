import { auth } from "@/auth";
import FormError from "@/components/shared/FormError";
import { Role } from "@prisma/client";
import React from "react";

export const revalidate = 0;

export default async function RoleGateServer({
     children,
     opts,
}: {
     children: React.ReactNode;
     opts: {
          allowedRole?: Role[];
          rejectedRole?: Role[];
     };
}) {
     const { allowedRole, rejectedRole } = opts;

     const session = await auth();
     if (!session || !session.user) {
          return <FormError message="Access Denied" />;
     }
     const role = session?.user.role as Role;
     if (!role) return <FormError message="Access Denied" />;

     if (allowedRole && !allowedRole.includes(role)) {
          return <FormError message="Access Denied" />;
     }

     if (rejectedRole && rejectedRole.includes(role)) {
          return <FormError message="Access Denied" />;
     }

     return <>{children}</>;
}
