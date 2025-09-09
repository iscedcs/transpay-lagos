import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CheckInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="gap-5 h-[100svh] relative">
      <div className="h-full grid p-3 lg:p-10">
        <div className="w-full max-w-xl mx-auto flex flex-col items-center px-5 pt-10 lg:pt-20 gap-10 ">
          <div className="w-60 h-18 shrink-0 px-5">
            <span
              className="text-[#D4A017] font-bold text-3xl tracking-wide"
              style={{ textShadow: "1px 1px 2px #2C1C00" }}>
              LASITRAS
            </span>
            {/* <Image
              src={"/logo.png"}
              height={60}
              width={150}
              className="h-full w-full"
              alt="Transpay Logo"
            /> */}
          </div>
          {children}
        </div>
      </div>

      <div className="bg-secondary w-full shrink-0 fixed bottom-0 z-50 ">
        <div className="w-full h-10 bg-primary/20 flex justify-between items-center px-3 lg:px-9 ">
          <div className="">Anambra</div>
          <div className="">Nigeria</div>
        </div>
        <div className="flex lg:flex-row items-center justify-between gap-1 px-5">
          <div className="flex justify-between">
            <Button asChild className="rounded" variant={"link"}>
              <Link href={"/about"}>About</Link>
            </Button>
            <Button asChild className="rounded" variant={"link"}>
              <Link href={"/faq"}>FAQ</Link>
            </Button>
          </div>
          <div className="text-sm hidden lg:flex">Solution is here!!!</div>
          <div className="flex">
            <Button asChild className="rounded" variant={"link"}>
              <Link href={"/privacy"}>Privacy</Link>
            </Button>
            <Button asChild className="rounded" variant={"link"}>
              <Link href={"/terms"}>Terms</Link>
            </Button>
          </div>
        </div>
      </div>
      {/* <div className='text-h4 text-primary font-bold uppercase'>
				Transpay
			</div>
			<div className='grid gap-3 uppercase w-full max-w-sm p-5'>
				{role ? (
					<div className='grid gap-3'>
						<Avatar className='h-32 w-32 mx-auto border shadow-lg'>
							<AvatarImage
								src={user?.image || '/lagos-logo.png'}
								alt={user?.name || 'User Name'}
							/>
							<AvatarFallback>
								{getInitials(user?.name || 'User Name')}
							</AvatarFallback>
						</Avatar>
						<SignOutBtn />
					</div>
				) : (
					<>
						<Button asChild>
							<Link
								className='w-full'
								href={'/sign-in'}
							>
								{`Admin Sign In`}
							</Link>
						</Button>
						<Button asChild>
							<Link
								className='w-full'
								href={'/sign-in'}
							>
								{`Agent Sign In`}
							</Link>
						</Button>
					</>
				)}
				<Button asChild>
					<Link
						className='w-full'
						href={'/dashboard'}
					>
						{`Dashboard`}
					</Link>
				</Button>
				<Button asChild>
					<Link
						className='w-full'
						href={'/admins'}
					>
						{`Admin`}
					</Link>
				</Button>
				<Button asChild>
					<Link
						className='w-full'
						href={'/agents'}
					>
						{`Agents`}
					</Link>
				</Button>

				<Button asChild>
					<Link
						className='w-full'
						href={'/scan'}
					>
						{`Scan`}
					</Link>
				</Button>
				<Button asChild>
					<Link
						className='w-full'
						href={'/search'}
					>
						{`Search Vehicle`}
					</Link>
				</Button>
				<Button asChild>
					<Link
						className='w-full'
						href={'/manage'}
					>
						{`Manage Account`}
					</Link>
				</Button>
			</div> */}
    </main>
  );
}
