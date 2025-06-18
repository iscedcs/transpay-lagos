"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit2, Save, X, Loader2 } from "lucide-react";
import { updateProfileFields, type UserProfile } from "@/actions/profile";
import { toast } from "sonner";

interface PersonalInfoSectionProps {
  profile: UserProfile;
  onUpdate: (data: Partial<UserProfile>) => void;
}

export function PersonalInfoSection({
  profile,
  onUpdate,
}: PersonalInfoSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    gender: profile.gender || "Not specified",
    marital_status: profile.marital_status || "Not specified",
    maiden_name: profile.maiden_name || "",
  });

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({
      gender: profile.gender || "Not specified",
      marital_status: profile.marital_status || "Not specified",
      maiden_name: profile.maiden_name || "",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      gender: profile.gender || "Not specified",
      marital_status: profile.marital_status || "Not specified",
      maiden_name: profile.maiden_name || "",
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const updates = {
        gender: formData.gender || null,
        marital_status: formData.marital_status || null,
        maiden_name: formData.maiden_name || null,
      };
      const updatedProfile = await updateProfileFields(updates);
      onUpdate(updatedProfile);
      setIsEditing(false);
      toast.success("Personal information updated successfully");
    } catch (error) {
      toast.error("Failed to update personal information", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatGender = (gender: string | null) => {
    if (!gender) return "Not specified";
    return gender.charAt(0) + gender.slice(1).toLowerCase();
  };

  const formatMaritalStatus = (status: string | null) => {
    if (!status) return "Not specified";
    return status.charAt(0) + status.slice(1).toLowerCase();
  };

  return (
    <div className="space-y-4">
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
          <Label htmlFor="gender">Gender</Label>
          {isEditing ? (
            <Select
              value={formData.gender}
              onValueChange={(value) =>
                setFormData({ ...formData, gender: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Not specified">Not specified</SelectItem>
                <SelectItem value="MALE">Male</SelectItem>
                <SelectItem value="FEMALE">Female</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <div className="px-3 py-2 bg-muted rounded-md">
              {formatGender(profile.gender)}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="marital_status">Marital Status</Label>
          {isEditing ? (
            <Select
              value={formData.marital_status}
              onValueChange={(value) =>
                setFormData({ ...formData, marital_status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select marital status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Not specified">Not specified</SelectItem>
                <SelectItem value="SINGLE">Single</SelectItem>
                <SelectItem value="MARRIED">Married</SelectItem>
                <SelectItem value="DIVORCED">Divorced</SelectItem>
                <SelectItem value="WIDOWED">Widowed</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <div className="px-3 py-2 bg-muted rounded-md">
              {formatMaritalStatus(profile.marital_status)}
            </div>
          )}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="maiden_name">Maiden Name</Label>
          {isEditing ? (
            <Input
              id="maiden_name"
              value={formData.maiden_name}
              onChange={(e) =>
                setFormData({ ...formData, maiden_name: e.target.value })
              }
              placeholder="Enter maiden name (optional)"
              disabled={loading}
            />
          ) : (
            <div className="px-3 py-2 bg-muted rounded-md">
              {profile.maiden_name || "Not specified"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
