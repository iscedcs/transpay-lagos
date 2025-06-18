"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Edit2, Save, X, Loader2 } from "lucide-react";
import { updateProfileFields, type UserProfile } from "@/actions/profile";
import { toast } from "sonner";
import AvatarUploader from "../shared/avatar-uploader";
import { formatRoleName } from "@/lib/utils";

interface BasicInfoSectionProps {
  profile: UserProfile;
  onUpdate: (data: Partial<UserProfile>) => void;
}

export function BasicInfoSection({ profile, onUpdate }: BasicInfoSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    phone: profile.phone,
  });

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      phone: profile.phone,
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      phone: profile.phone,
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const updatedProfile = await updateProfileFields(formData);
      onUpdate(updatedProfile);
      setIsEditing(false);
      toast.success("Basic information updated successfully");
    } catch (error) {
      toast.error("Failed to update basic information", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (imageUrl: string) => {
    try {
      // In a real app, you would update the profile image
      toast.success("Profile image updated successfully");
      return { success: "Profile image updated successfully" };
    } catch (error) {
      return { error: "Failed to update profile image" };
    }
  };

  return (
    <div className="space-y-6">
      {/* Avatar Section */}
      <div className="flex items-center gap-4">
        <AvatarUploader
          currentAvatarUrl={undefined}
          onAvatarUpload={handleAvatarUpload}
          userInitials={`${profile.firstName[0]}${profile.lastName[0]}`}
          size="xl"
        />
        <div>
          <h3 className="text-lg font-semibold">
            {profile.firstName} {profile.lastName}
          </h3>
          <Badge variant={profile.blacklisted ? "destructive" : "default"}>
            {formatRoleName(profile.role)}
          </Badge>
        </div>
      </div>

      {/* Basic Info Form */}
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">Personal Details</h4>
          {!isEditing ? (
            <Button variant="outline" size="sm" onClick={handleEdit}>
              <Edit2 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                disabled={loading}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave} disabled={loading}>
                {loading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            {isEditing ? (
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                disabled={loading}
              />
            ) : (
              <div className="px-3 py-2 bg-muted rounded-md">
                {profile.firstName}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            {isEditing ? (
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                disabled={loading}
              />
            ) : (
              <div className="px-3 py-2 bg-muted rounded-md">
                {profile.lastName}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            {isEditing ? (
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                disabled
              />
            ) : (
              <div className="px-3 py-2 bg-muted rounded-md">
                {profile.email}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            {isEditing ? (
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                disabled
              />
            ) : (
              <div className="px-3 py-2 bg-muted rounded-md">
                {profile.phone}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
