"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowLeft,
  CreditCard,
  Loader2,
  AlertCircle,
  CheckCircle,
  User,
  Car,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { createVehicleVirtualAccount } from "@/app/actions/vehicles";
import { toast } from "sonner";
import { getCurrentUser } from "@/lib/auth";
import { useEffect } from "react";

// Form validation schema
const generateAccountSchema = z.object({
  bvn: z
    .string()
    .min(1, "BVN is required")
    .length(11, "BVN must be exactly 11 digits")
    .regex(/^\d{11}$/, "BVN must contain only numbers"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
});

type GenerateAccountFormValues = z.infer<typeof generateAccountSchema>;

interface GenerateAccountContentProps {
  vehicle: any;
}

export default function GenerateAccountContent({
  vehicle,
}: GenerateAccountContentProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const form = useForm<GenerateAccountFormValues>({
    resolver: zodResolver(generateAccountSchema),
    defaultValues: {
      bvn: "",
      dateOfBirth: "",
    },
  });

  // Get current user for role-based back button
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  const canGoBack =
    currentUser &&
    !["LGA_AGENT", "LGA_C_AGENT", "VEHICLE_OWNER"].includes(currentUser.role);

  const onSubmit = async (data: GenerateAccountFormValues) => {
    setIsLoading(true);

    try {
      const result = await createVehicleVirtualAccount({
        walletId: vehicle.id,
        bvn: data.bvn,
        dob: data.dateOfBirth,
      });

      if (!result.success) {
        throw new Error(result.error || "Failed to create virtual account");
      }

      toast.success("Virtual account created successfully!");

      // Redirect to vehicle details page
      setTimeout(() => {
        router.push(`/vehicles/${vehicle.id}`);
      }, 1500);
    } catch (error) {
      console.log("Failed to create virtual account:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create virtual account. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-4 px-4 sm:py-8 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Generate Virtual Account
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Create a virtual account for vehicle payments
          </p>
        </div>
        {canGoBack && (
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={() => router.push(`/vehicles/${vehicle.id}`)}
              className="flex items-center gap-2 flex-1 sm:flex-none"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Vehicle
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Vehicle Information Card */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Car className="h-5 w-5" />
                Vehicle Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Vehicle Image */}
              {vehicle.image && (
                <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
                  <img
                    src={vehicle.image || "/placeholder.svg"}
                    alt={`Vehicle ${vehicle.plateNumber}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              {/* Vehicle Info */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-muted-foreground">
                    Plate Number
                  </span>
                  <Badge variant="outline" className="font-mono">
                    {vehicle.plateNumber}
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-muted-foreground">
                    Category
                  </span>
                  <span className="text-sm font-medium">
                    {vehicle.category}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-muted-foreground">
                    Color
                  </span>
                  <span className="text-sm font-medium">{vehicle.color}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-muted-foreground">
                    LGA
                  </span>
                  <span className="text-sm font-medium">
                    {vehicle.registeredLga?.name || "N/A"}
                  </span>
                </div>
              </div>

              <Separator />

              {/* Owner Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">Owner Information</span>
                </div>

                <div className="space-y-2 pl-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Name</span>
                    <span className="text-sm font-medium">
                      {vehicle.owner?.firstName} {vehicle.owner?.lastName}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Email</span>
                    <span className="text-sm font-medium">
                      {vehicle.owner?.email}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Phone</span>
                    <span className="text-sm font-medium">
                      {vehicle.owner?.phone}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Generate Account Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <CreditCard className="h-5 w-5" />
                Create Virtual Account
              </CardTitle>
              <CardDescription className="text-sm">
                Provide the required information to generate a virtual account
                for this vehicle
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  A virtual account will be created for this vehicle to enable
                  seamless payments. Please ensure the BVN and date of birth
                  match the vehicle owner's information.
                </AlertDescription>
              </Alert>

              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="bvn" className="text-sm font-medium">
                      Bank Verification Number (BVN) *
                    </Label>
                    <Input
                      id="bvn"
                      placeholder="Enter 11-digit BVN"
                      maxLength={11}
                      className="h-10 font-mono"
                      {...form.register("bvn")}
                    />
                    {form.formState.errors.bvn && (
                      <p className="text-xs text-destructive">
                        {form.formState.errors.bvn.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="dateOfBirth"
                      className="text-sm font-medium"
                    >
                      Date of Birth *
                    </Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      className="h-10"
                      {...form.register("dateOfBirth")}
                    />
                    {form.formState.errors.dateOfBirth && (
                      <p className="text-xs text-destructive">
                        {form.formState.errors.dateOfBirth.message}
                      </p>
                    )}
                  </div>
                </div>

                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    <strong>What happens next:</strong>
                    <ul className="mt-2 space-y-1 text-xs">
                      <li>
                        • A virtual account will be created for this vehicle
                      </li>
                      <li>
                        • The account will be linked to the vehicle's wallet
                      </li>
                      <li>• Payments can be made directly to this account</li>
                      <li>
                        • You'll be redirected to the vehicle details page
                      </li>
                    </ul>
                  </AlertDescription>
                </Alert>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  {canGoBack && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push(`/vehicles/${vehicle.id}`)}
                      className="w-full sm:w-auto"
                    >
                      Cancel
                    </Button>
                  )}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center gap-2 w-full sm:flex-1"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <CreditCard className="h-4 w-4" />
                    )}
                    {isLoading
                      ? "Creating Account..."
                      : "Generate Virtual Account"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
