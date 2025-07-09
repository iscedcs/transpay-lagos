
import { auth, signOut } from "@/auth";
import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Transpay - Dashboard",
  description: "Payment system for the government",
};

export default async function DashboardLayout({
     children,
}: {
     children: React.ReactNode;
}) {
     const session = (await auth()) ?? null;
     // if (!session || session?.user.id){
     //      redirect('/sign-in')
     //      // await signOut()
     // }

     return (
          <div className="">
               <Navbar />
               <div className="">
                    <Sidebar />
                    <div className={`${session ? "md:ml-52" : ""} pt-20`}>
                         {children}
                    </div>
               </div>
          </div>
     );
}
