import Footer from "@/components/layout/footer";
import SideBar from "@/components/layout/manage-side-bar";
import Navbar from "@/components/layout/navbar";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "LASITRAS - Dashboard",
  description: "Payment system for the government",
};

export default function ManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <Navbar />
      <div className="flex h-full ">
        <SideBar />
        <div className="md:ml-52 pt-20">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
