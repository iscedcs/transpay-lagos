"use client";

import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent } from "@/components/ui/pagination";
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface PaginationISCEProps {
     hasNextPage: boolean;
     hasPrevPage: boolean;
     total: number;
     page: number;
     limit: number;
     hrefPrefix: string;
}

export function PaginationISCE({ hasNextPage, hasPrevPage, total, page, limit, hrefPrefix }: PaginationISCEProps) {
     const router = useRouter();
     const searchParams = useSearchParams();
     const totalPages = Math.ceil(total / limit);

     const createQueryString = useCallback(
          (name: string, value: string) => {
               const params = new URLSearchParams(searchParams.toString());
               params.set(name, value);
               return params.toString();
          },
          [searchParams],
     );

     const navigateToPage = useCallback(
          (targetPage: number) => {
               if (targetPage >= 1 && targetPage <= totalPages) {
                    const query = createQueryString("page", targetPage.toString());
                    router.push(`${hrefPrefix}?${query}`);
               }
          },
          [router, hrefPrefix, totalPages, createQueryString],
     );

     return (
          <Pagination className="py-5">
               <PaginationContent>
                    <div className="mr-2" aria-live="polite" aria-atomic="true">
                         Page {page} of {totalPages}
                    </div>
                    <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => navigateToPage(1)} disabled={page <= 1} aria-label="Go to first page">
                         <DoubleArrowLeftIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="h-8 w-8 p-0" onClick={() => navigateToPage(page - 1)} disabled={!hasPrevPage} aria-label="Go to previous page">
                         <ChevronLeftIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="h-8 w-8 p-0" onClick={() => navigateToPage(page + 1)} disabled={!hasNextPage} aria-label="Go to next page">
                         <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => navigateToPage(totalPages)} disabled={page === totalPages} aria-label="Go to last page">
                         <DoubleArrowRightIcon className="h-4 w-4" />
                    </Button>
               </PaginationContent>
          </Pagination>
     );
}
