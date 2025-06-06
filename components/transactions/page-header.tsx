"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useState } from "react";
import { exportTransactions } from "@/lib/transactions-data";
import type { TransactionFilters } from "@/types/transactions";
import { toast } from "sonner";

interface PageHeaderProps {
  title: string;
  description: string;
  filters?: TransactionFilters;
}

export function PageHeader({ title, description, filters }: PageHeaderProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const downloadUrl = await exportTransactions(filters);

      // Create download link
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `transactions-${
        new Date().toISOString().split("T")[0]
      }.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up blob URL
      URL.revokeObjectURL(downloadUrl);

      toast.success("Export Successful", {
        description: "Transactions have been exported to CSV file.",
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
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground mt-2">{description}</p>
      </div>
      <Button onClick={handleExport} disabled={isExporting}>
        <Download className="h-4 w-4 mr-2" />
        {isExporting ? "Exporting..." : "Export CSV"}
      </Button>
    </div>
  );
}
