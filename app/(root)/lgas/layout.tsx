import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Transpay - LGAs",
  description: "List of all available LAGs",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
