"use client";
import { useToast } from "@/components/ui/use-toast";
import { LoaderIcon, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function DeleteAdminButton({ id }: { id: string }) {
     const router = useRouter();
     const { toast } = useToast();
     const [isLoading, setIsLoading] = React.useState<boolean>(false);
     const handleDelete = async (id: string) => {
          setIsLoading(true);
          try {
               const createAdminResponse = await fetch("/api/create-admin", {
                    method: "DELETE",
                    body: JSON.stringify({
                         id: id,
                    }),
               });
               const result = await createAdminResponse.json();
               if (result.status) {
                    toast({
                         title: "Deleted Successfully",
                    });
                    setIsLoading(false);
                    router.push(`/admins`);
               } else {
                    setIsLoading(false);
                    toast({
                         title: result.message,
                    });
                    throw new Error(`Something Went wrong ${result.error}`);
               }
          } catch (error) {
               setIsLoading(false);
          }
     };
     return (
          <div
               className="cursor-pointer items-center"
               onClick={() => handleDelete(id)}
          >
               {isLoading ? (
                    <LoaderIcon className="h-4 w-4 animate-spin" />
               ) : (
                    <Trash className="h-4 w-4" />
               )}
          </div>
     );
}
