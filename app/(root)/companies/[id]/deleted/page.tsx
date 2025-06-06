"use  client";
import RestoreCompanyButton from "@/components/shared/delete-buttons/restore-company-button";
import { AlertTriangle } from "lucide-react";
import React from "react";

interface PageProps {
  params: Promise<{ id: string }>;
};

export default async function Deleted({ params }: 
  PageProps) {
  const id = (await params).id;
  return (
    <div className=" text-center flex items-center justify-center flex-col ">
      <AlertTriangle className=" w-8 h-8" />
      This Company has been deleted
      <RestoreCompanyButton id={id} />
    </div>
  );
}
