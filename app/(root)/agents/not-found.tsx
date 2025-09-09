"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminsPageNotFound() {
  const router = useRouter();
  return (
    <div className="grid place-items-center w-full">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="h-16">
          <span
            className="text-[#D4A017] font-bold text-3xl tracking-wide"
            style={{ textShadow: "1px 1px 2px #2C1C00" }}>
            LASITRAS
          </span>
          {/* <Image
						className='object-contain h-full w-full dark:invert'
						src={'/logo.png'}
						alt=''
						width={400}
						height={400}
					/> */}
        </div>
        <h2>Page Not Found</h2>
        <p>You might not have permission to view this page</p>
        <Button onClick={() => router.back()} variant="link">
          Go Back
        </Button>
        <Button asChild variant="link">
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
