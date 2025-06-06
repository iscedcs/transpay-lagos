import { getComplianceRate } from "@/actions/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle } from "lucide-react";

export async function ComplianceRate() {
  const data = await getComplianceRate();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
        <CheckCircle className="h-4 w-4 text-green-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-green-600">
          {data.complianceRate}%
        </div>
        <Progress value={data.complianceRate} className="mt-2" />
        <p className="text-xs text-muted-foreground mt-2">
          {data.compliantVehicles} of {data.totalVehicles} vehicles
        </p>
      </CardContent>
    </Card>
  );
}
