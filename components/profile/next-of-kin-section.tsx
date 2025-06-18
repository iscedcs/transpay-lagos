"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit2, Save, X, Loader2 } from "lucide-react";
import { updateProfileFields, type UserProfile } from "@/actions/profile";
import { toast } from "sonner";

interface NextOfKinSectionProps {
  profile: UserProfile;
  onUpdate: (data: Partial<UserProfile>) => void;
}

export function NextOfKinSection({ profile, onUpdate }: NextOfKinSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nok_name: profile.nok_name || "",
    nok_phone: profile.nok_phone || "",
    nok_relationship: profile.nok_relationship || "",
  });

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({
      nok_name: profile.nok_name || "",
      nok_phone: profile.nok_phone || "",
      nok_relationship: profile.nok_relationship || "",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      nok_name: profile.nok_name || "",
      nok_phone: profile.nok_phone || "",
      nok_relationship: profile.nok_relationship || "",
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const updates = {
        nok_name: formData.nok_name || null,
        nok_phone: formData.nok_phone || null,
        nok_relationship: formData.nok_relationship || null,
      };
      const updatedProfile = await updateProfileFields(updates);
      onUpdate(updatedProfile);
      setIsEditing(false);
      toast.success("Emergency contact updated successfully");
    } catch (error) {
      toast.error("Failed to update emergency contact", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Next of Kin Details</h4>
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
          <Label htmlFor="nok_name">Full Name</Label>
          {isEditing ? (
            <Input
              id="nok_name"
              value={formData.nok_name}
              onChange={(e) =>
                setFormData({ ...formData, nok_name: e.target.value })
              }
              placeholder="Enter next of kin name"
              disabled={loading}
            />
          ) : (
            <div className="px-3 py-2 bg-muted rounded-md">
              {profile.nok_name || "Not specified"}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="nok_phone">Phone Number</Label>
          {isEditing ? (
            <Input
              id="nok_phone"
              value={formData.nok_phone}
              onChange={(e) =>
                setFormData({ ...formData, nok_phone: e.target.value })
              }
              placeholder="Enter phone number"
              disabled={loading}
            />
          ) : (
            <div className="px-3 py-2 bg-muted rounded-md">
              {profile.nok_phone || "Not specified"}
            </div>
          )}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="nok_relationship">Relationship</Label>
          {isEditing ? (
            <Input
              id="nok_relationship"
              value={formData.nok_relationship}
              onChange={(e) =>
                setFormData({ ...formData, nok_relationship: e.target.value })
              }
              placeholder="e.g., Spouse, Parent, Sibling, Friend"
              disabled={loading}
            />
          ) : (
            <div className="px-3 py-2 bg-muted rounded-md">
              {profile.nok_relationship || "Not specified"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
