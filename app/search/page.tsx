import { auth } from "@/auth";
import AdvancedSearch from "@/components/ui/advanced-search";
import Searchbar from "@/components/ui/searchbar";
import { Role } from "@prisma/client";

export default async function SearchDriver() {
     const session = await auth();     return (
          <div className="mx-auto my-[100px] max-w-[500px] p-2">
               {session?.user.role === Role.SUPERADMIN || session?.user.role === Role.ADMIN ? (
                    <AdvancedSearch placeholder="Enter vehicle plate" variant="primary" isAdmin={session?.user.role === "SUPERADMIN"|| session?.user.role === Role.ADMIN} />
               ) : (
                    <Searchbar placeholder="Enter vehicle plate" variant="primary" />
               )}
          </div>
     );
}
