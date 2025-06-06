"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import type { LGAOverviewData } from "@/types/overview";
import { Role, User } from "@prisma/client";

interface LGAHeaderProps {
  user: User;
  lgaData: LGAOverviewData;
  onLGAChange?: (lgaId: string) => void;
}

export function LGAHeader({ user, lgaData, onLGAChange }: LGAHeaderProps) {
  const canSwitchLGA = [Role.SUPERADMIN, Role.ADMIN].includes(user.role as any);

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">
                Overview – {lgaData.lga.name}
              </h1>
              <Badge variant="outline" className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {lgaData.lga.code}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              State: {lgaData.lga.stateName} • Local Government Area performance
              summary
            </p>
          </div>

          {canSwitchLGA && onLGAChange && (
            <div className="flex gap-3">
              <Select onValueChange={onLGAChange} defaultValue={lgaData.lga.id}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Switch LGA" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lagos-mainland">Lagos Mainland</SelectItem>
                  <SelectItem value="ikeja">Ikeja</SelectItem>
                  <SelectItem value="surulere">Surulere</SelectItem>
                  <SelectItem value="alimosho">Alimosho</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
