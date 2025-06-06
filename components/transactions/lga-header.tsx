"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { exportTransactions } from "@/lib/transactions-data";
import type { TransactionFilters } from "@/types/transactions";
import { toast } from "sonner";

interface LgaHeaderProps {
  lgaName: string;
  stateName: string;
  filters?: TransactionFilters;
}

export function LgaHeader({ lgaName, stateName, filters }: LgaHeaderProps) {
  const router = useRouter();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const downloadUrl = await exportTransactions(filters);

      // Create download link
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${lgaName
        .toLowerCase()
        .replace(/\s+/g, "-")}-transactions-${
        new Date().toISOString().split("T")[0]
      }.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up blob URL
      URL.revokeObjectURL(downloadUrl);

      toast.success("Export Successful", {
        description: `${lgaName} transactions have been exported to CSV file.`,
      });
    } catch (error) {
      toast.error("Export Failed", {
        description: "Failed to export transactions. Please try again.",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/transactions")}
          className="h-auto p-0 hover:bg-transparent"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          All Transactions
        </Button>
        <span>/</span>
        <span>{lgaName}</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Transactions – {lgaName}
          </h1>
          <div className="flex items-center space-x-2 mt-2">
            <Badge variant="outline">{stateName} State</Badge>
            <p className="text-muted-foreground">
              View and manage all transactions for this LGA
            </p>
          </div>
        </div>
        <Button onClick={handleExport} disabled={isExporting}>
          <Download className="h-4 w-4 mr-2" />
          {isExporting ? "Exporting..." : "Export CSV"}
        </Button>
      </div>
    </div>
  );
}
