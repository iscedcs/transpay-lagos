import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "LASITRAS - Administrative Access",
  description: "Payment system for the government",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={`grid`}>{children}</div>;
}
