"use client";

import FormError from "@/components/shared/FormError";
import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import React from "react";

export const revalidate = 0;

export default function RoleGateClient({
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

     const session = useSession();
     if (!session || !session.data || !session.data.user) {
          return <FormError message="Access Denied" />;
     }
     const role = session.data?.user.role as Role;
     if (!role) return <FormError message="Access Denied" />;

     if (allowedRole && !allowedRole.includes(role)) {
          return <FormError message="Access Denied" />;
     }

     if (rejectedRole && rejectedRole.includes(role)) {
          return <FormError message="Access Denied" />;
     }

     return <>{children}</>;
}
