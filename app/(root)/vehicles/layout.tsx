import type { Metadata } from "next";
export const metadata: Metadata = {
     title: "Transpay - Vehicles",
     description: "List of all vehicles",
};

export default async function DashboardLayout({
     children,
}: {
     children: React.ReactNode;
}) {
     return <div className="flex h-full w-full flex-col p-2">{children}</div>;
}
