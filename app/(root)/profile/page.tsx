"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, User, Shield, Phone, Heart, MapPin } from "lucide-react";
import { BasicInfoSection } from "@/components/profile/basic-info-section";
import { PersonalInfoSection } from "@/components/profile/personal-info-section";
import { ContactInfoSection } from "@/components/profile/contact-info-section";
import { NextOfKinSection } from "@/components/profile/next-of-kin-section";
import { AddressSection } from "@/components/profile/address-section";
import { AccountInfoSection } from "@/components/profile/account-info-section";
import { getCurrentUserProfile, type UserProfile } from "@/actions/profile";
import { toast } from "sonner";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCurrentUserProfile();
      setProfile(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load profile";
      setError(errorMessage);
      toast.error("Failed to load profile", {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleProfileUpdate = (updatedData: Partial<UserProfile>) => {
    if (profile) {
      setProfile({ ...profile, ...updatedData });
    }
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (error || !profile) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error || "Failed to load profile"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account information and preferences
        </p>
      </div>

      <div className="grid gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Basic Information
            </CardTitle>
            <CardDescription>
              Your personal details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BasicInfoSection
              profile={profile}
              onUpdate={handleProfileUpdate}
            />
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Personal Information
            </CardTitle>
            <CardDescription>Additional personal details</CardDescription>
          </CardHeader>
          <CardContent>
            <PersonalInfoSection
              profile={profile}
              onUpdate={handleProfileUpdate}
            />
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Contact Information
            </CardTitle>
            <CardDescription>Additional ways to reach you</CardDescription>
          </CardHeader>
          <CardContent>
            <ContactInfoSection
              profile={profile}
              onUpdate={handleProfileUpdate}
            />
          </CardContent>
        </Card>

        {/* Next of Kin */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Emergency Contact
            </CardTitle>
            <CardDescription>Next of kin information</CardDescription>
          </CardHeader>
          <CardContent>
            <NextOfKinSection
              profile={profile}
              onUpdate={handleProfileUpdate}
            />
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Address Information
            </CardTitle>
            <CardDescription>
              Your location and identification details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AddressSection profile={profile} onUpdate={handleProfileUpdate} />
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Account Information
            </CardTitle>
            <CardDescription>Account status and activity</CardDescription>
          </CardHeader>
          <CardContent>
            <AccountInfoSection profile={profile} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <Skeleton className="h-8 w-32 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>

      <div className="grid gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-2/3" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
