"use client";

import { AdminAccessDashboard } from "@/components/AdminAccessDashboard";
import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import { usePin } from "@/hooks/usePin";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import StepOne from "./step-one";
import StepTwo from "./step-two";

export const dynamic = "force-dynamic";

const ProtectedPage: React.FC = () => {
  const { step, handlePinSubmit } = usePin();

  if (step === undefined) {
    return (
        <div className="">
            <div className="h-16 w-full shrink-0 bg-secondary/60 backdrop-blur-sm">
                <MaxWidthWrapper className="p-2">
                    <div className="flex h-full items-center justify-between">
                        <Link href={"/"} className="w-52 shrink-0 px-5">
                            <Image
                                src={"/logo.png"}
                                height={30}
                                width={150}
                                className="shrink-0"
                                alt={`Transpay Logo`}
                            />
                        </Link>
                    </div>
                </MaxWidthWrapper>
            </div>
            <MaxWidthWrapper className="p-5">
                <div>Loading...</div>
            </MaxWidthWrapper>
        </div>
    );
}


return (
  <div className="">
      {step === 1 ? (
          <StepOne onSubmit={(pin) => handlePinSubmit(pin, 1)} />
      ) : step === 2 ? (
          <StepTwo onSubmit={(pin) => handlePinSubmit(pin, 2)} />
      ) : (
          <>
              <div className="h-16 w-full shrink-0 bg-secondary/60 backdrop-blur-sm">
                  <MaxWidthWrapper className="p-2">
                      <div className="flex h-full items-center justify-between">
                          <Link href={"/"} className="w-52 shrink-0 px-5">
                              <Image
                                  src={"/logo.png"}
                                  height={30}
                                  width={150}
                                  className="shrink-0"
                                  alt={`Transpay Logo`}
                              />
                          </Link>
                      </div>
                  </MaxWidthWrapper>
              </div>
              <Suspense fallback={<MaxWidthWrapper><div>Loading...</div></MaxWidthWrapper>}>
                  <AdminAccessDashboard />
              </Suspense>
          </>
      )}
  </div>
);
};

export default ProtectedPage;