import { getOutstandingFees } from "@/actions/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";

export async function OutstandingFees() {
  const data = await getOutstandingFees();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Outstanding Fees</CardTitle>
        <AlertTriangle className="h-4 w-4 text-orange-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-orange-600">
          {formatCurrency(data.totalAmount)}
        </div>
        <p className="text-xs text-muted-foreground">
          {data.totalCount} vehicles owing
        </p>
      </CardContent>
    </Card>
  );
}
