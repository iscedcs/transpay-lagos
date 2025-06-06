"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Car,
  MapPin,
  Calendar,
  User,
  Shield,
  Eye,
  EyeOff,
  CreditCard,
  Settings,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Vehicle, getVehicleById } from "@/actions/vehicles";
import { formatCurrency } from "@/lib/utils";
import { GenerateAccountModal } from "@/components/generate-account-modal";
import { BarcodeScanner } from "@/components/barcode-scanner";

export default function VehiclePage() {
  const router = useRouter();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSensitiveInfo, setShowSensitiveInfo] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const params = useParams();
  const id = String(params.id);

  // Fetch vehicle data
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setLoading(true);
        setError(null);
        const vehicleData = await getVehicleById(id);

        setVehicle(vehicleData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch vehicle"
        );
        console.error("Error fetching vehicle:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [id]);

  if (!id) {
    return notFound();
  }

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Handle successful account generation
  const handleAccountSuccess = (data: any) => {
    // Update the vehicle state with new account details
    setVehicle((prev) =>
      prev
        ? {
            ...prev,
            wallet: prev.wallet
              ? {
                  ...prev.wallet,
                  accountNumber: data.accountNumber,
                  bankCode: data.bankCode,
                }
              : prev.wallet,
          }
        : prev
    );
  };

  // Handle account generation error
  const handleAccountError = (error: Error) => {
    console.error("Account generation error:", error);
  };

  const handleBarcodeAdded = (barcode: string) => {
    // Update the vehicle state with the new barcode
    setVehicle((prev) =>
      prev
        ? {
            ...prev,
            barcode: barcode,
          }
        : prev
    );
    setShowBarcodeScanner(false);
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-8 w-64" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4">
                  <Skeleton className="h-24 w-24 rounded-lg" />
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2 space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent className="space-y-4">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div key={j} className="flex justify-between">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
        <Alert>
          <AlertDescription>Vehicle not found</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Generate Account Modal */}
      {vehicle.wallet && (
        <GenerateAccountModal
          open={showGenerateModal}
          onOpenChange={setShowGenerateModal}
          walletId={vehicle.wallet.id}
          onSuccess={handleAccountSuccess}
          onError={handleAccountError}
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {vehicle.plateNumber}
            </h1>
            <p className="text-muted-foreground">
              Vehicle Details & Information
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Edit Vehicle
          </Button>
          <Button variant="destructive" className="flex items-center gap-2">
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Vehicle Profile Card */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24 rounded-lg">
                  <AvatarImage
                    src={vehicle.image || "/placeholder.svg"}
                    alt={vehicle.plateNumber}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-lg rounded-lg">
                    <Car className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>

                <div className="text-center space-y-2">
                  <h2 className="text-xl font-semibold">
                    {vehicle.plateNumber}
                  </h2>
                  <Badge variant="outline" className="text-sm">
                    {vehicle.category.replace(/_/g, " ")}
                  </Badge>
                  <Badge variant={"outline"} className="text-sm">
                    {vehicle.status.replace(/_/g, " ")}
                  </Badge>
                  {vehicle.blacklisted && (
                    <Badge variant="destructive" className="text-sm">
                      Blacklisted
                    </Badge>
                  )}
                </div>

                <Separator />

                {/* Quick Info */}
                <div className="w-full space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {vehicle.color} {vehicle.type}
                    </span>
                  </div>
                  {vehicle.owner && (
                    <div className="flex items-center gap-3 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">
                        {vehicle.owner.firstName} {vehicle.owner.lastName}
                      </span>
                    </div>
                  )}
                  {vehicle.registeredLga && (
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">
                        {vehicle.registeredLga.name}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-sm">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span>{vehicle.stateCode}</span>
                  </div>
                </div>

                <Separator />

                {/* Important Dates */}
                <div className="w-full space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Created:</span>
                    <span>{formatDate(vehicle.createdAt)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Updated:</span>
                    <span>{formatDate(vehicle.updatedAt)}</span>
                  </div>
                  {vehicle.last_payment_date && (
                    <div className="flex items-center justify-between">
                      <span>Last Payment:</span>
                      <span>{formatDate(vehicle.last_payment_date)}</span>
                    </div>
                  )}
                  {vehicle.deletedAt && (
                    <div className="flex items-center justify-between text-red-600">
                      <span>Deleted:</span>
                      <span>{formatDate(vehicle.deletedAt)}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Wallet Summary Card */}
          {vehicle.wallet && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Wallet Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Balance:
                  </span>
                  <span className="font-semibold text-green-600">
                    {formatCurrency(Number(vehicle.wallet.walletBalance))}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Amount Owed:
                  </span>
                  <span className="font-semibold text-red-600">
                    {formatCurrency(Number(vehicle.wallet.amountOwed))}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Net Total:
                  </span>
                  <span className="font-semibold">
                    {formatCurrency(Number(vehicle.wallet.netTotal))}
                  </span>
                </div>
                {vehicle.wallet.accountNumber ? (
                  <div className="pt-2 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Account:
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="font-mono text-sm">
                          {vehicle.wallet.accountNumber}
                        </span>
                        <Badge variant="default" className="text-xs">
                          Active
                        </Badge>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="pt-2 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Account:
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-orange-600">
                          Not generated
                        </span>
                        <Button
                          onClick={() => setShowGenerateModal(true)}
                          size="sm"
                          variant="outline"
                          className="h-6 px-2 text-xs"
                        >
                          Generate
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Quick Actions Card */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => router.push(`/vehicles/${vehicle.id}/edit`)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Vehicle
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="h-4 w-4 mr-2" />
                {vehicle.blacklisted ? "Remove Blacklist" : "Blacklist Vehicle"}
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CreditCard className="h-4 w-4 mr-2" />
                View Payment History
              </Button>
              <Button variant="destructive" className="w-full justify-start">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Vehicle
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Detailed Information */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="details" className="space-y-6">
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
              <TabsTrigger value="owner">Owner</TabsTrigger>
              <TabsTrigger value="wallet">Wallet</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            {/* Vehicle Details Tab */}
            <TabsContent value="details" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="h-5 w-5" />
                    Vehicle Information
                  </CardTitle>
                  <CardDescription>
                    Basic vehicle details and specifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium text-muted-foreground">
                        Plate Number
                      </Label>
                      <p className="text-sm font-mono">{vehicle.plateNumber}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm font-medium text-muted-foreground">
                        Color
                      </Label>
                      <p className="text-sm">{vehicle.color}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm font-medium text-muted-foreground">
                        Category
                      </Label>
                      <p className="text-sm">
                        {vehicle.category.replace(/_/g, " ")}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm font-medium text-muted-foreground">
                        Type
                      </Label>
                      <p className="text-sm">
                        {vehicle.type.replace(/_/g, " ")}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm font-medium text-muted-foreground">
                        State Code
                      </Label>
                      <p className="text-sm">{vehicle.stateCode}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm font-medium text-muted-foreground">
                        Status
                      </Label>
                      <Badge variant={"outline"}>
                        {vehicle.status.replace(/_/g, " ")}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm font-medium text-muted-foreground">
                        Vehicle ID
                      </Label>
                      <p className="text-xs font-mono bg-muted px-2 py-1 rounded">
                        {vehicle.id}
                      </p>
                    </div>
                    {vehicle.startDate && (
                      <div className="space-y-1">
                        <Label className="text-sm font-medium text-muted-foreground">
                          Start Date
                        </Label>
                        <p className="text-sm">
                          {formatDate(vehicle.startDate)}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Registration Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Registration Information
                  </CardTitle>
                  <CardDescription>
                    LGA registration and location details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium text-muted-foreground">
                        Registered LGA
                      </Label>
                      <p className="text-sm">
                        {vehicle.registeredLga?.name || "Not assigned"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm font-medium text-muted-foreground">
                        LGA ID
                      </Label>
                      <p className="text-xs font-mono bg-muted px-2 py-1 rounded">
                        {vehicle.registeredLgaId || "Not assigned"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Technical Details Tab */}
            <TabsContent value="technical" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Technical Specifications
                  </CardTitle>
                  <CardDescription>
                    Technical details and identification codes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium text-muted-foreground">
                        VIN
                      </Label>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-mono">
                          {showSensitiveInfo
                            ? vehicle.vin || "Not provided"
                            : "••••••••••••••••••"}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setShowSensitiveInfo(!showSensitiveInfo)
                          }
                          className="h-6 w-6 p-0"
                        >
                          {showSensitiveInfo ? (
                            <EyeOff className="h-3 w-3" />
                          ) : (
                            <Eye className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm font-medium text-muted-foreground">
                        Barcode
                      </Label>
                      <p className="text-sm font-mono">
                        {vehicle.barcode || "Not provided"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm font-medium text-muted-foreground">
                        FairFlex IMEI
                      </Label>
                      <p className="text-sm font-mono">
                        {vehicle.fairFlexImei || "Not provided"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm font-medium text-muted-foreground">
                        V-Code
                      </Label>
                      <p className="text-sm font-mono">
                        {vehicle.vCode || "Not provided"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm font-medium text-muted-foreground">
                        Security Code
                      </Label>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-mono">
                          {showSensitiveInfo
                            ? vehicle.securityCode || "Not provided"
                            : "••••••••"}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm font-medium text-muted-foreground">
                        Group ID
                      </Label>
                      <p className="text-sm font-mono">
                        {vehicle.groupId || "Not assigned"}
                      </p>
                    </div>
                  </div>
                  {/* Barcode Scanner Modal */}
                  {showBarcodeScanner && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                      <BarcodeScanner
                        vehicleId={vehicle.id}
                        onSuccess={handleBarcodeAdded}
                        onCancel={() => setShowBarcodeScanner(false)}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Owner Information Tab */}
            <TabsContent value="owner" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Owner Information
                  </CardTitle>
                  <CardDescription>
                    Details about the vehicle owner
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {vehicle.owner ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium text-muted-foreground">
                          Owner Name
                        </Label>
                        <p className="text-sm">
                          {vehicle.owner.firstName} {vehicle.owner.lastName}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-sm font-medium text-muted-foreground">
                          Email
                        </Label>
                        <p className="text-sm">{vehicle.owner.email}</p>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-sm font-medium text-muted-foreground">
                          Phone
                        </Label>
                        <p className="text-sm">{vehicle.owner.phone}</p>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-sm font-medium text-muted-foreground">
                          Owner ID
                        </Label>
                        <p className="text-xs font-mono bg-muted px-2 py-1 rounded">
                          {vehicle.owner.id}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No owner assigned to this vehicle
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Wallet Tab */}
            <TabsContent value="wallet" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    Wallet Details
                  </CardTitle>
                  <CardDescription>
                    Financial information and transaction details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {vehicle.wallet ? (
                    <div className="space-y-6">
                      {/* Balance Overview */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-4 border rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            Wallet Balance
                          </p>
                          <p className="text-2xl font-bold text-green-600">
                            {formatCurrency(
                              Number(vehicle.wallet.walletBalance)
                            )}
                          </p>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            Amount Owed
                          </p>
                          <p className="text-2xl font-bold text-red-600">
                            {formatCurrency(Number(vehicle.wallet.amountOwed))}
                          </p>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            Net Total
                          </p>
                          <p className="text-2xl font-bold">
                            {formatCurrency(Number(vehicle.wallet.netTotal))}
                          </p>
                        </div>
                      </div>

                      <Separator />

                      {/* Service Balances */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium">
                          Service Balances
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-muted-foreground">
                              CVOF Balance
                            </Label>
                            <p className="text-lg font-semibold">
                              {formatCurrency(
                                Number(vehicle.wallet.cvofBalance)
                              )}
                            </p>
                            <p className="text-sm text-red-600">
                              Owing:{" "}
                              {formatCurrency(Number(vehicle.wallet.cvofOwing))}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-muted-foreground">
                              FareFlex Balance
                            </Label>
                            <p className="text-lg font-semibold">
                              {formatCurrency(
                                Number(vehicle.wallet.fareflexBalance)
                              )}
                            </p>
                            <p className="text-sm text-red-600">
                              Owing:{" "}
                              {formatCurrency(
                                Number(vehicle.wallet.fareflexOwing)
                              )}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-muted-foreground">
                              ISCE Balance
                            </Label>
                            <p className="text-lg font-semibold">
                              {formatCurrency(
                                Number(vehicle.wallet.isceBalance)
                              )}
                            </p>
                            <p className="text-sm text-red-600">
                              Owing:{" "}
                              {formatCurrency(Number(vehicle.wallet.isceOwing))}
                            </p>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Account Details */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">
                            Account Details
                          </h4>
                          {!vehicle.wallet.accountNumber && (
                            <Button
                              onClick={() => setShowGenerateModal(true)}
                              size="sm"
                              className="flex items-center gap-2"
                            >
                              <CreditCard className="h-4 w-4" />
                              Generate Virtual Account
                            </Button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-1">
                            <Label className="text-sm font-medium text-muted-foreground">
                              Wallet ID
                            </Label>
                            <p className="text-xs font-mono bg-muted px-2 py-1 rounded">
                              {vehicle.wallet.id}
                            </p>
                          </div>

                          {vehicle.wallet.accountNumber ? (
                            <>
                              <div className="space-y-1">
                                <Label className="text-sm font-medium text-muted-foreground">
                                  Account Number
                                </Label>
                                <div className="flex items-center gap-2">
                                  <p className="text-sm font-mono bg-green-50 text-green-700 px-2 py-1 rounded border border-green-200">
                                    {vehicle.wallet.accountNumber}
                                  </p>
                                  <Badge variant="default" className="text-xs">
                                    Active
                                  </Badge>
                                </div>
                              </div>
                              {vehicle.wallet.bankCode && (
                                <div className="space-y-1">
                                  <Label className="text-sm font-medium text-muted-foreground">
                                    Bank Code
                                  </Label>
                                  <p className="text-sm font-mono bg-muted px-2 py-1 rounded">
                                    {vehicle.wallet.bankCode}
                                  </p>
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="space-y-1">
                              <Label className="text-sm font-medium text-muted-foreground">
                                Account Number
                              </Label>
                              <div className="flex items-center gap-2">
                                <p className="text-sm text-muted-foreground bg-orange-50 text-orange-700 px-2 py-1 rounded border border-orange-200">
                                  Not generated
                                </p>
                                <Badge variant="outline" className="text-xs">
                                  Pending
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                Generate a virtual account to receive payments
                                directly to this wallet.
                              </p>
                            </div>
                          )}

                          <div className="space-y-1">
                            <Label className="text-sm font-medium text-muted-foreground">
                              Last Transaction
                            </Label>
                            <p className="text-sm">
                              {formatDate(vehicle.wallet.lastTransactionDate)}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-sm font-medium text-muted-foreground">
                              Next Transaction
                            </Label>
                            <p className="text-sm">
                              {formatDate(vehicle.wallet.nextTransactionDate)}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-sm font-medium text-muted-foreground">
                              Created
                            </Label>
                            <p className="text-sm">
                              {formatDate(vehicle.wallet.createdAt)}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-sm font-medium text-muted-foreground">
                              Last Updated
                            </Label>
                            <p className="text-sm">
                              {formatDate(vehicle.wallet.updatedAt)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Virtual Account Requirements */}
                      {!vehicle.wallet.accountNumber && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                          <h4 className="text-sm font-medium text-blue-800 flex items-center gap-2 mb-2">
                            <CreditCard className="h-4 w-4" />
                            Virtual Account Requirements
                          </h4>
                          <ul className="text-sm text-blue-700 space-y-1 list-disc pl-5">
                            <li>Owner's Bank Verification Number (BVN)</li>
                            <li>
                              Owner's Date of Birth (as registered with BVN)
                            </li>
                            <li>Active vehicle status</li>
                          </ul>
                          <Button
                            onClick={() => setShowGenerateModal(true)}
                            size="sm"
                            variant="default"
                            className="mt-3 bg-blue-600 hover:bg-blue-700"
                          >
                            Generate Virtual Account
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No wallet information available for this vehicle
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Vehicle Activity
                  </CardTitle>
                  <CardDescription>
                    Recent activity and audit trail
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-sm font-medium">
                          Vehicle Registered
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(vehicle.createdAt)}
                        </p>
                      </div>
                      <Badge variant="outline">System</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-sm font-medium">Last Updated</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(vehicle.updatedAt)}
                        </p>
                      </div>
                      <Badge variant="outline">Update</Badge>
                    </div>

                    {vehicle.last_payment_date && (
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="text-sm font-medium">Last Payment</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(vehicle.last_payment_date)}
                          </p>
                        </div>
                        <Badge variant="outline">Payment</Badge>
                      </div>
                    )}

                    {vehicle.deletedAt && (
                      <div className="flex items-center justify-between p-3 border rounded-lg border-red-200">
                        <div>
                          <p className="text-sm font-medium text-red-600">
                            Vehicle Deleted
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(vehicle.deletedAt)}
                          </p>
                        </div>
                        <Badge variant="destructive">Deleted</Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function Label({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <label className={className}>{children}</label>;
}
