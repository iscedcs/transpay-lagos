import { auth } from "@/auth";
import FooterAlternative from "@/components/layout/footer-advanced";
import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import AnimatedBeams from "@/components/pages/home/beams";
import CTASectionAlternative from "@/components/pages/home/cts-section";
import FAQSectionAdvanced from "@/components/pages/home/faq-advanced";
import FeaturesShowcase from "@/components/pages/home/feature-showcase";
import FeaturesSection from "@/components/pages/home/featured-section";
import GlobalReachSection from "@/components/pages/home/global-reach-section";
import HeroGeometric from "@/components/pages/home/hero";
import { UserNav } from "@/components/shared/user-nav-bar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string }>;
}) {
  const session = await auth();
  const user = session?.user.id;
  const searchParamsData = await searchParams;
  const shouldRedirect = searchParamsData?.r;

  if (user && shouldRedirect !== "no") {
    return redirect("/dashboard");
  }
  return (
    <div className="">
      <div className="fixed z-50 mx-auto h-20 w-full shrink-0 bg-white/50 backdrop-blur">
        <MaxWidthWrapper className="flex h-full w-full items-center justify-between gap-1 px-2 xl:px-0">
          <Link href={"/"} className="w-32 shrink-0 px-5 md:w-52">
            <Image
              src={"/assets/transflex_standalone_logo.png"}
              height={30}
              width={150}
              className="shrink-0"
              alt="TransFlex Logo"
            />
          </Link>
          <div className="flex h-full w-full items-center justify-end gap-3 xl:w-0">
            <Button
              asChild
              className="w-10 items-center rounded-lg bg-transparent md:w-32"
              variant={"outline"}
            >
              <Link href={"/scan"}>Scan</Link>
            </Button>
            <div className="flex items-center justify-center gap-3 text-primary-700">
              {user ? (
                <>
                  <Button asChild className="w-full rounded-lg lg:w-32">
                    <Link href={"/dashboard"}>Dashboard</Link>
                  </Button>
                  {user && <UserNav />}
                </>
              ) : (
                <Button asChild className="w-full rounded-lg lg:w-32">
                  <Link href="/sign-in">Login</Link>
                </Button>
              )}
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
      <HeroGeometric />
      {/* <Separator className="bg-background"/> */}
      <AnimatedBeams />
      {/* <Separator className="bg-background"/>  */}
      <FeaturesSection />
      <FeaturesShowcase />
      <GlobalReachSection />
      <FAQSectionAdvanced />
      <CTASectionAlternative />
      <FooterAlternative />
    </div>
  );
}
