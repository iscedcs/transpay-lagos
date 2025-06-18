"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit2, Save, X, Loader2 } from "lucide-react";
import { updateProfileFields, type UserProfile } from "@/actions/profile";
import { toast } from "sonner";
import { parseAddressExtended } from "@/lib/utils";

interface AddressSectionProps {
  profile: UserProfile;
  onUpdate: (data: Partial<UserProfile>) => void;
}

export function AddressSection({ profile, onUpdate }: AddressSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    address: profile.address || "",
    identification: profile.identification || "",
  });

  const parsedAddress = parseAddressExtended(profile.address);

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({
      address: profile.address || "",
      identification: profile.identification || "",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      address: profile.address || "",
      identification: profile.identification || "",
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const updates = {
        address: formData.address || null,
        identification: formData.identification || null,
      };
      const updatedProfile = await updateProfileFields(updates);
      onUpdate(updatedProfile);
      setIsEditing(false);
      toast.success("Address information updated successfully");
    } catch (error) {
      toast.error("Failed to update address information", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatAddress = (address: string | null) => {
    if (!address) return "Not specified";

    const parsed = parseAddressExtended(address);
    if (parsed && typeof parsed === "object") {
      const parts = [];
      if (parsed.text) parts.push(parsed.text);
      if (parsed.unit) parts.push(parsed.unit);
      if (parsed.city) parts.push(parsed.city);
      if (parsed.state) parts.push(parsed.state);
      if (parsed.country) parts.push(parsed.country);
      return parts.join(", ") || "Not specified";
    }

    return address;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Location & Identification</h4>
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
          <Label htmlFor="address">Address</Label>
          {isEditing ? (
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              placeholder="Enter your full address"
              rows={3}
              disabled={loading}
            />
          ) : (
            <div className="px-3 py-2 bg-muted rounded-md min-h-[80px]">
              {formatAddress(profile.address)}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="identification">Identification</Label>
          {isEditing ? (
            <Input
              id="identification"
              value={formData.identification}
              onChange={(e) =>
                setFormData({ ...formData, identification: e.target.value })
              }
              placeholder="Enter identification details"
              disabled={loading}
            />
          ) : (
            <div className="px-3 py-2 bg-muted rounded-md">
              {profile.identification || "Not specified"}
            </div>
          )}
        </div>

        {profile.lga && (
          <div className="space-y-2">
            <Label>Local Government Area</Label>
            <div className="px-3 py-2 bg-muted rounded-md">
              {profile.lga.name || "Not assigned"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
