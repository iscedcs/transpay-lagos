"use client";

import { useState } from "react";
import { Camera, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

interface AvatarUploaderProps {
  currentAvatarUrl?: string;
  onAvatarUpload: (
    imageUrl: string
  ) => Promise<{ success?: string; error?: string }> | void;
  userInitials?: string;
  size?: "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16",
  xl: "h-24 w-24",
};

export default function AvatarUploader({
  currentAvatarUrl,
  onAvatarUpload,
  userInitials = "UX",
  size = "lg",
  disabled = false,
}: AvatarUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(currentAvatarUrl);

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    // Validate file type
    const validImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!validImageTypes.includes(file.type)) {
      toast.error("Invalid file type", {
        description:
          "Please upload a valid image file (JPEG, PNG, GIF, or WebP).",
      });
      return;
    }

    // Validate file size (5MB max for avatars)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large", {
        description: "Avatar image must be less than 5MB.",
      });
      return;
    }

    setUploading(true);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const jsonData = await response.json();
      const { url, fields } = jsonData;

      if (!url || !fields) {
        throw new Error("Invalid server response");
      }

      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) =>
        formData.append(key, value as string)
      );
      formData.append("file", file);

      const uploadResponse = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (uploadResponse.ok) {
        const fileUrl = `${url}${fields.key}`;
        setAvatarUrl(fileUrl);

        const result = await onAvatarUpload(fileUrl);
        if (result && result.error) {
          toast.error("Upload error", {
            description: result.error,
          });
        } else {
          toast.success("Success", {
            description: result?.success || "Avatar updated successfully!",
          });
        }
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.log("Upload error:", error);
      toast.error("Upload failed", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative inline-block">
      <Avatar className={sizeClasses[size]}>
        <AvatarImage src={avatarUrl || "/placeholder.svg"} alt="Avatar" />
        <AvatarFallback>
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <User className="h-4 w-4" />
          )}
        </AvatarFallback>
      </Avatar>

      <Button
        variant="outline"
        size="sm"
        className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full p-0"
        disabled={disabled || uploading}
        onClick={() => document.getElementById("avatar-upload")?.click()}
      >
        {uploading ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : (
          <Camera className="h-3 w-3" />
        )}
      </Button>

      <Input
        id="avatar-upload"
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            handleFileUpload(file);
          }
        }}
        disabled={disabled || uploading}
      />
    </div>
  );
}
