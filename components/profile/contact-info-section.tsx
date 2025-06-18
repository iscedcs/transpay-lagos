"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit2, Save, X, Loader2 } from "lucide-react";
import { updateProfileFields, type UserProfile } from "@/actions/profile";
import { toast } from "sonner";

interface ContactInfoSectionProps {
  profile: UserProfile;
  onUpdate: (data: Partial<UserProfile>) => void;
}

export function ContactInfoSection({
  profile,
  onUpdate,
}: ContactInfoSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    whatsapp: profile.whatsapp || "",
  });

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({
      whatsapp: profile.whatsapp || "",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      whatsapp: profile.whatsapp || "",
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const updates = {
        whatsapp: formData.whatsapp || null,
      };
      const updatedProfile = await updateProfileFields(updates);
      onUpdate(updatedProfile);
      setIsEditing(false);
      toast.success("Contact information updated successfully");
    } catch (error) {
      toast.error("Failed to update contact information", {
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
        <h4 className="text-sm font-medium">Additional Contact</h4>
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

      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="whatsapp">WhatsApp Number</Label>
          {isEditing ? (
            <Input
              id="whatsapp"
              value={formData.whatsapp}
              onChange={(e) =>
                setFormData({ ...formData, whatsapp: e.target.value })
              }
              placeholder="Enter WhatsApp number (optional)"
              disabled={loading}
            />
          ) : (
            <div className="px-3 py-2 bg-muted rounded-md">
              {profile.whatsapp || "Not specified"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
