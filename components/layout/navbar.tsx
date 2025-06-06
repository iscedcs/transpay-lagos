import Image from "next/image";
import Link from "next/link";
import { UserNav } from "../shared/user-nav-bar";

export default function NavBar() {
     return (
       <div className="fixed z-50 h-16 w-full shrink-0 bg-secondary pr-5 backdrop-blur-sm">
         <div className="flex h-full items-center justify-between">
           <Link href={"/"} className="w-52 shrink-0 px-5">
             <Image
               src={"/assets/transflex_standalone_logo.png"}
               height={30}
               width={150}
               className="shrink-0 "
               alt="Transpay Logo"
             />
           </Link>
           <UserNav />
         </div>
       </div>
     );
}
