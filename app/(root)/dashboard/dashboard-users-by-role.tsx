import { getUsersByRole } from "@/actions/dashboard";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatRoleName } from "@/lib/utils";
import { Users } from "lucide-react";

export async function UserRoles() {
  const data = await getUsersByRole();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Users by Role
        </CardTitle>
        <CardDescription>
          Distribution of users across different roles
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((user: any) => (
            <div key={user.role} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {formatRoleName(user.role)}
                </Badge>
              </div>
              <div className="text-sm font-medium">{user.count}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
