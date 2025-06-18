"use client";

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { type UserProfile } from "@/actions/profile";
import { formatDate, formatRoleName } from "@/lib/utils";

interface AccountInfoSectionProps {
  profile: UserProfile;
}

export function AccountInfoSection({ profile }: AccountInfoSectionProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium">Account Status & Activity</h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Account Status</Label>
          <div className="flex items-center gap-2">
            <Badge variant={profile.blacklisted ? "destructive" : "default"}>
              {profile.blacklisted ? "Blacklisted" : "Active"}
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Role</Label>
          <div className="px-3 py-2 bg-muted rounded-md">
            {formatRoleName(profile.role)}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Account Created</Label>
          <div className="px-3 py-2 bg-muted rounded-md">
            {formatDate(profile.createdAt)}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Last Updated</Label>
          <div className="px-3 py-2 bg-muted rounded-md">
            {formatDate(profile.updatedAt)}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Last Login</Label>
          <div className="px-3 py-2 bg-muted rounded-md">
            {profile.lastLogin ? formatDate(profile.lastLogin) : "Never"}
          </div>
        </div>

        <div className="space-y-2">
          <Label>User ID</Label>
          <div className="px-3 py-2 bg-muted rounded-md font-mono text-sm">
            {profile.id}
          </div>
        </div>
      </div>
    </div>
  );
}
