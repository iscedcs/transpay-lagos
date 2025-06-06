import { getComplianceRate } from "@/actions/dashboard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export async function ComplianceOverview() {
  const data = await getComplianceRate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compliance Overview</CardTitle>
        <CardDescription>
          Detailed breakdown of vehicle compliance status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {data.totalVehicles}
            </div>
            <div className="text-sm text-blue-600">Total Vehicles</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {data.compliantVehicles}
            </div>
            <div className="text-sm text-green-600">Compliant Vehicles</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {data.owingVehicles}
            </div>
            <div className="text-sm text-orange-600">
              Non-Compliant Vehicles
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
