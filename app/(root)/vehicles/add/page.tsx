"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Loader2,
  Save,
  ArrowLeft,
  CreditCard,
  CheckCircle,
  AlertCircle,
  User,
  Users,
  Car,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  ownerFormSchema,
  nextOfKinSchema,
  vehicleFormSchema,
  type OwnerFormValues,
  type NextOfKinFormValues,
  type VehicleFormValues,
  genderOptions,
  maritalStatusOptions,
  CreateVehicleRequest,
} from "../vehicle-form-validation";
import { getLGAs } from "@/actions/lga";
import { toast } from "sonner";
import {
  createVehicleVirtualAccount,
  createVehicleWithOwner,
} from "@/actions/vehicles";
import { VEHICLE_CATEGORIES } from "@/lib/const";
import AvatarUploader from "@/components/shared/avatar-uploader";

interface RegistrationStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
}

export default function AddVehiclePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [lgas, setLgas] = useState<{ id: string; name: string }[]>([]);
  const [activeTab, setActiveTab] = useState("owner");
  const [registrationProgress, setRegistrationProgress] = useState(0);
  const [createdVehicle, setCreatedVehicle] = useState<any>(null);
  const [showVirtualAccountDialog, setShowVirtualAccountDialog] =
    useState(false);
  const [isCreatingVirtualAccount, setIsCreatingVirtualAccount] =
    useState(false);
  const [virtualAccountError, setVirtualAccountError] = useState<string | null>(
    null
  );

  // Registration steps
  const [steps, setSteps] = useState<RegistrationStep[]>([
    {
      id: "form",
      title: "Information Collection",
      description: "Collect owner and vehicle details",
      completed: false,
      current: true,
    },
    {
      id: "create",
      title: "Create Vehicle & Owner",
      description: "Register in system",
      completed: false,
      current: false,
    },
    {
      id: "wallet",
      title: "Virtual Account",
      description: "Create payment wallet",
      completed: false,
      current: false,
    },
    {
      id: "complete",
      title: "Complete",
      description: "Registration finished",
      completed: false,
      current: false,
    },
  ]);

  // Owner form
  const ownerForm = useForm<OwnerFormValues>({
    resolver: zodResolver(ownerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "+234",
      dateOfBirth: "",
      gender: "MALE",
      maritalStatus: "SINGLE",
      email: "",
      whatsappNumber: "",
      maidenName: "",
      residentialAddress: "",
      city: "",
      lgaId: "",
      country: "Nigeria",
      postalCode: "",
      bvn: "",
    },
  });

  // Next of kin form
  const nextOfKinForm = useForm<NextOfKinFormValues>({
    resolver: zodResolver(nextOfKinSchema),
    defaultValues: {
      name: "",
      phone: "+234",
      relationship: "",
    },
  });

  // Vehicle form
  const vehicleForm = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues: {
      plateNumber: "",
      color: "",
      category: "TRICYCLE",
      type: "PASSENGER",
      status: "ACTIVE",
      registeredLgaId: "",
      stateCode: "",
      vin: "",
      barcode: "",
      fairFlexImei: "",
      vCode: "",
      securityCode: "",
      startDate: "",
      groupId: "",
      image: "",
      blacklisted: false,
    },
  });

  // Fetch LGAs on component mount
  useEffect(() => {
    const fetchLGAs = async () => {
      try {
        const lgaResponse = await getLGAs({ limit: 50, page: 1 });
        setLgas(
          lgaResponse.data.map((lga) => ({ id: lga.id, name: lga.name }))
        );
      } catch (error) {
        console.error("Failed to fetch LGAs:", error);
        toast.error("Error", {
          description: "Failed to load LGAs. Please try again later.",
        });
      }
    };

    fetchLGAs();
  }, [toast]);

  // Update step status
  const updateStepStatus = (
    stepId: string,
    completed: boolean,
    current = false
  ) => {
    setSteps((prev) =>
      prev.map((step) => ({
        ...step,
        completed: step.id === stepId ? completed : step.completed,
        current: step.id === stepId ? current : false,
      }))
    );
  };

  // Handle vehicle creation (first step)
  const onSubmit = async () => {
    setIsLoading(true);
    setRegistrationProgress(0);

    try {
      // Validate all forms
      const ownerValid = await ownerForm.trigger();
      const nextOfKinValid = await nextOfKinForm.trigger();
      const vehicleValid = await vehicleForm.trigger();

      if (!ownerValid || !nextOfKinValid || !vehicleValid) {
        throw new Error("Please fill in all required fields correctly");
      }

      // Step 1: Form validation complete
      updateStepStatus("form", true);
      setRegistrationProgress(25);

      // Get form data
      const ownerData = ownerForm.getValues();
      const nextOfKinData = nextOfKinForm.getValues();
      const vehicleData = vehicleForm.getValues();

      // Step 2: Create vehicle with owner
      updateStepStatus("create", false, true);
      setRegistrationProgress(50);

      // Get the selected LGA name for address
      const selectedLga = lgas.find((lga) => lga.id === ownerData.lgaId);

      // Prepare vehicle creation request according to API structure
      const vehicleRequest: CreateVehicleRequest = {
        category: vehicleData.category,
        plateNumber: vehicleData.plateNumber,
        owner: {
          firstName: ownerData.firstName,
          lastName: ownerData.lastName,
          phone: ownerData.phone,
          address: {
            text: ownerData.residentialAddress,
            lga: selectedLga?.name || "",
            city: ownerData.city,
            state: "Edo", // You might want to make this dynamic
            unit: selectedLga?.name || "",
            country: "Nigeria",
            postal_code: ownerData.postalCode,
          },
          gender: ownerData.gender,
          marital_status: ownerData.maritalStatus.toLowerCase(),
          whatsapp: ownerData.whatsappNumber,
          email: ownerData.email,
          nok_name: nextOfKinData.name,
          nok_phone: nextOfKinData.phone,
          nok_relationship: nextOfKinData.relationship,
          maiden_name: ownerData.maidenName,
          bvn: ownerData.bvn,
          dateOfBirth: ownerData.dateOfBirth,
        },
        stateCode: vehicleData.stateCode,
        lgaId: vehicleData.registeredLgaId,
        color: vehicleData.color,
        image: vehicleData.image,
        status: vehicleData.status,
        type: vehicleData.type,
        vin: vehicleData.vin,
        trackerId: vehicleData.fairFlexImei, // Using fairFlexImei as trackerId
        fairFlexImei: vehicleData.fairFlexImei,
        barcode: vehicleData.barcode,
        vCode: vehicleData.vCode,
        securityCode: vehicleData.securityCode,
        startDate: vehicleData.startDate,
        groupId: vehicleData.groupId,
        blacklisted: vehicleData.blacklisted,
      };

      // Create vehicle with owner
      const vehicle = await createVehicleWithOwner(vehicleRequest);

      // Step 3: Vehicle created successfully
      updateStepStatus("create", true);
      setRegistrationProgress(75);
      setCreatedVehicle(vehicle);
      console.log("Vehicle created:", vehicle);

      // Show success message
      toast.success("Success", {
        description: "Vehicle and owner created successfully!",
      });

      // Show virtual account creation dialog
      setShowVirtualAccountDialog(true);
    } catch (error) {
      console.error("Failed to create vehicle:", error);
      toast.error("Registration Failed", {
        description:
          error instanceof Error
            ? error.message
            : "Failed to register. Please try again.",
      });

      // Reset progress
      setRegistrationProgress(0);
      setSteps((prev) =>
        prev.map((step) => ({
          ...step,
          completed: false,
          current: step.id === "form",
        }))
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle virtual account creation
  const handleCreateVirtualAccount = async () => {
    setIsCreatingVirtualAccount(true);
    setVirtualAccountError(null); // Reset any previous errors

    try {
      const ownerData = ownerForm.getValues();

      updateStepStatus("wallet", false, true);
      setRegistrationProgress(90);

      // Create virtual account
      await createVehicleVirtualAccount({
        walletId: createdVehicle.id,
        bvn: ownerData.bvn,
        dob: ownerData.dateOfBirth,
      });

      updateStepStatus("wallet", true);
      updateStepStatus("complete", true, true);
      setRegistrationProgress(100);

      toast.success("Success", {
        description: "Virtual account created successfully!",
      });

      // Close dialog and redirect
      setShowVirtualAccountDialog(false);
      setTimeout(() => {
        router.push(`/vehicles/${createdVehicle.id}`);
        router.refresh();
      }, 2000);
    } catch (error) {
      console.error("Failed to create virtual account:", error);
      setVirtualAccountError(
        error instanceof Error
          ? error.message
          : "Failed to create virtual account."
      );

      // Don't close the dialog, allow user to try again or skip
      toast.error("Virtual Account Creation Failed", {
        description: "You can try again or continue without a virtual account.",
      });
    } finally {
      setIsCreatingVirtualAccount(false);
    }
  };

  // Handle skip virtual account
  const handleSkipVirtualAccount = () => {
    updateStepStatus("complete", true, true);
    setRegistrationProgress(100);
    setShowVirtualAccountDialog(false);

    toast.success("Registration Complete", {
      description: "Vehicle registration completed successfully!",
    });

    setTimeout(() => {
      // Redirect to the vehicle detail page instead of the list
      router.push(`/vehicles/${createdVehicle.id}`);
      router.refresh();
    }, 2000);
  };

  // Handle vehicle image upload
  const handleVehicleImageUpload = async (imageUrl: string) => {
    vehicleForm.setValue("image", imageUrl);
    return { success: "Vehicle image uploaded successfully" };
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Vehicle Owner Onboarding
          </h1>
          <p className="text-muted-foreground">
            Complete registration for vehicle owner and vehicle
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
      </div>

      {/* Registration Progress */}
      {(isLoading || registrationProgress > 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <CheckCircle className="h-5 w-5" />
              )}
              Registration Progress
            </CardTitle>
            <CardDescription>
              {isLoading
                ? "Creating vehicle and owner..."
                : "Registration in progress"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={registrationProgress} className="w-full" />
            <div className="space-y-2">
              {steps.map((step) => (
                <div key={step.id} className="flex items-center gap-3">
                  {step.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : step.current ? (
                    <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                  )}
                  <div>
                    <p
                      className={`font-medium ${
                        step.completed
                          ? "text-green-600"
                          : step.current
                          ? "text-blue-600"
                          : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Virtual Account Creation Dialog */}
      <AlertDialog
        open={showVirtualAccountDialog}
        onOpenChange={setShowVirtualAccountDialog}
      >
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Create Virtual Account?
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>Vehicle and owner have been created successfully!</p>

              {/* Vehicle Information Summary */}
              <div className="mt-4 p-3 bg-muted rounded-md">
                <h4 className="font-medium mb-2">Vehicle Information:</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="font-medium">Plate Number:</div>
                  <div>{createdVehicle?.plateNumber || "N/A"}</div>
                  <div className="font-medium">Category:</div>
                  <div>{createdVehicle?.category}</div>
                  <div className="font-medium">Color:</div>
                  <div>{createdVehicle?.color || "N/A"}</div>
                  <div className="font-medium">ID:</div>
                  <div className="truncate">{createdVehicle?.id || "N/A"}</div>
                </div>
              </div>

              <p className="mt-2">
                Would you like to create a virtual account for payments using
                the provided BVN ({ownerForm.watch("bvn")}) and date of birth (
                {ownerForm.watch("dateOfBirth")})?
              </p>

              {/* Error message if virtual account creation failed */}
              {virtualAccountError && (
                <Alert variant="destructive" className="mt-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{virtualAccountError}</AlertDescription>
                </Alert>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={handleSkipVirtualAccount}
              disabled={isCreatingVirtualAccount}
            >
              {virtualAccountError
                ? "Continue Without Virtual Account"
                : "Skip for Now"}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCreateVirtualAccount}
              disabled={isCreatingVirtualAccount}
            >
              {isCreatingVirtualAccount ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Creating...
                </>
              ) : virtualAccountError ? (
                "Try Again"
              ) : (
                "Create Virtual Account"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Registration Form */}
      {!isLoading && registrationProgress === 0 && (
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 w-full sm:w-auto">
              <TabsTrigger value="owner" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Owner Info
              </TabsTrigger>
              <TabsTrigger
                value="nextofkin"
                className="flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                Next of Kin
              </TabsTrigger>
              <TabsTrigger value="vehicle" className="flex items-center gap-2">
                <Car className="h-4 w-4" />
                Vehicle Info
              </TabsTrigger>
              <TabsTrigger value="review" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Review
              </TabsTrigger>
            </TabsList>

            {/* Owner Information Tab */}
            <TabsContent value="owner" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Owner Information</CardTitle>
                  <CardDescription>
                    Enter the vehicle owner's personal details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          placeholder="Enter owner firstname"
                          {...ownerForm.register("firstName")}
                        />
                        {ownerForm.formState.errors.firstName && (
                          <p className="text-sm text-destructive">
                            {ownerForm.formState.errors.firstName.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          placeholder="Enter owner lastname"
                          {...ownerForm.register("lastName")}
                        />
                        {ownerForm.formState.errors.lastName && (
                          <p className="text-sm text-destructive">
                            {ownerForm.formState.errors.lastName.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone *</Label>
                        <Input
                          id="phone"
                          placeholder="+234"
                          {...ownerForm.register("phone")}
                        />
                        {ownerForm.formState.errors.phone && (
                          <p className="text-sm text-destructive">
                            {ownerForm.formState.errors.phone.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          {...ownerForm.register("dateOfBirth")}
                        />
                        {ownerForm.formState.errors.dateOfBirth && (
                          <p className="text-sm text-destructive">
                            {ownerForm.formState.errors.dateOfBirth.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender *</Label>
                        <Select
                          onValueChange={(value) =>
                            ownerForm.setValue("gender", value as any)
                          }
                          defaultValue={ownerForm.watch("gender")}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            {genderOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="maritalStatus">Marital Status *</Label>
                        <Select
                          onValueChange={(value) =>
                            ownerForm.setValue("maritalStatus", value as any)
                          }
                          defaultValue={ownerForm.watch("maritalStatus")}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select marital status" />
                          </SelectTrigger>
                          <SelectContent>
                            {maritalStatusOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter email of owner"
                          {...ownerForm.register("email")}
                        />
                        {ownerForm.formState.errors.email && (
                          <p className="text-sm text-destructive">
                            {ownerForm.formState.errors.email.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
                        <Input
                          id="whatsappNumber"
                          placeholder="Enter WhatsApp number"
                          {...ownerForm.register("whatsappNumber")}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="maidenName">Maiden Name</Label>
                        <Input
                          id="maidenName"
                          placeholder="Enter maiden name if applicable"
                          {...ownerForm.register("maidenName")}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bvn">BVN *</Label>
                        <Input
                          id="bvn"
                          placeholder="Enter 11-digit BVN"
                          maxLength={11}
                          {...ownerForm.register("bvn")}
                        />
                        {ownerForm.formState.errors.bvn && (
                          <p className="text-sm text-destructive">
                            {ownerForm.formState.errors.bvn.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Address Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Address Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="residentialAddress">
                          Residential Address *
                        </Label>
                        <Input
                          id="residentialAddress"
                          placeholder="Enter address of owner"
                          {...ownerForm.register("residentialAddress")}
                        />
                        {ownerForm.formState.errors.residentialAddress && (
                          <p className="text-sm text-destructive">
                            {
                              ownerForm.formState.errors.residentialAddress
                                .message
                            }
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          placeholder="Enter city"
                          {...ownerForm.register("city")}
                        />
                        {ownerForm.formState.errors.city && (
                          <p className="text-sm text-destructive">
                            {ownerForm.formState.errors.city.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lgaId">LGA *</Label>
                        <Select
                          onValueChange={(value) =>
                            ownerForm.setValue("lgaId", value)
                          }
                          defaultValue={ownerForm.watch("lgaId")}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select LGA" />
                          </SelectTrigger>
                          <SelectContent>
                            {lgas.map((lga) => (
                              <SelectItem key={lga.id} value={lga.id}>
                                {lga.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {ownerForm.formState.errors.lgaId && (
                          <p className="text-sm text-destructive">
                            {ownerForm.formState.errors.lgaId.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="country">Country *</Label>
                        <Input
                          id="country"
                          value="Nigeria"
                          disabled
                          {...ownerForm.register("country")}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                          id="postalCode"
                          placeholder="Enter postal code"
                          {...ownerForm.register("postalCode")}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => router.back()}>
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setActiveTab("nextofkin")}
                  >
                    Next: Next of Kin
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Next of Kin Tab */}
            <TabsContent value="nextofkin" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Next of Kin Information</CardTitle>
                  <CardDescription>
                    Enter emergency contact details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="nextOfKinName">Next of Kin Name *</Label>
                      <Input
                        id="nextOfKinName"
                        placeholder="Enter next of kin name"
                        {...nextOfKinForm.register("name")}
                      />
                      {nextOfKinForm.formState.errors.name && (
                        <p className="text-sm text-destructive">
                          {nextOfKinForm.formState.errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nextOfKinPhone">
                        Next of Kin Phone *
                      </Label>
                      <Input
                        id="nextOfKinPhone"
                        placeholder="Enter next of kin phone"
                        {...nextOfKinForm.register("phone")}
                      />
                      {nextOfKinForm.formState.errors.phone && (
                        <p className="text-sm text-destructive">
                          {nextOfKinForm.formState.errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="relationship">Relationship *</Label>
                      <Input
                        id="relationship"
                        placeholder="Enter relationship (e.g., Sibling)"
                        {...nextOfKinForm.register("relationship")}
                      />
                      {nextOfKinForm.formState.errors.relationship && (
                        <p className="text-sm text-destructive">
                          {nextOfKinForm.formState.errors.relationship.message}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("owner")}
                  >
                    Back
                  </Button>
                  <Button type="button" onClick={() => setActiveTab("vehicle")}>
                    Next: Vehicle Info
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Vehicle Information Tab */}
            <TabsContent value="vehicle" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Vehicle Information</CardTitle>
                  <CardDescription>
                    Enter vehicle details and specifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Vehicle Image */}
                  <div className="space-y-4">
                    <Label>Vehicle Image</Label>
                    <AvatarUploader
                      onAvatarUpload={handleVehicleImageUpload}
                      currentAvatarUrl={vehicleForm.watch("image")}
                    />
                  </div>

                  <Separator />

                  {/* Basic Vehicle Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="plateNumber">Plate Number *</Label>
                      <Input
                        id="plateNumber"
                        placeholder="Enter plate number"
                        {...vehicleForm.register("plateNumber")}
                      />
                      {vehicleForm.formState.errors.plateNumber && (
                        <p className="text-sm text-destructive">
                          {vehicleForm.formState.errors.plateNumber.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="color">Color *</Label>
                      <Input
                        id="color"
                        placeholder="Enter vehicle color"
                        {...vehicleForm.register("color")}
                      />
                      {vehicleForm.formState.errors.color && (
                        <p className="text-sm text-destructive">
                          {vehicleForm.formState.errors.color.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        onValueChange={(value) =>
                          vehicleForm.setValue("category", value)
                        }
                        defaultValue={vehicleForm.watch("category")}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {VEHICLE_CATEGORIES.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="type">Type *</Label>
                      <Select
                        onValueChange={(value) =>
                          vehicleForm.setValue("type", value)
                        }
                        defaultValue={vehicleForm.watch("type")}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {VEHICLE_CATEGORIES.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option.replace("_", " ")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="stateCode">State Code *</Label>
                      <Input
                        id="stateCode"
                        placeholder="Enter state code (e.g., LA, AB)"
                        {...vehicleForm.register("stateCode")}
                      />
                      {vehicleForm.formState.errors.stateCode && (
                        <p className="text-sm text-destructive">
                          {vehicleForm.formState.errors.stateCode.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="registeredLgaId">Registered LGA *</Label>
                      <Select
                        onValueChange={(value) =>
                          vehicleForm.setValue("registeredLgaId", value)
                        }
                        defaultValue={vehicleForm.watch("registeredLgaId")}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select LGA for registration" />
                        </SelectTrigger>
                        <SelectContent>
                          {lgas.map((lga) => (
                            <SelectItem key={lga.id} value={lga.id}>
                              {lga.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {vehicleForm.formState.errors.registeredLgaId && (
                        <p className="text-sm text-destructive">
                          {vehicleForm.formState.errors.registeredLgaId.message}
                        </p>
                      )}
                    </div>

                    {/* Technical Details */}
                    <div className="space-y-2">
                      <Label htmlFor="vin">VIN</Label>
                      <Input
                        id="vin"
                        placeholder="Enter VIN"
                        {...vehicleForm.register("vin")}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fairFlexImei">
                        FairFlex IMEI / Tracker ID
                      </Label>
                      <Input
                        id="fairFlexImei"
                        placeholder="Enter FairFlex IMEI"
                        {...vehicleForm.register("fairFlexImei")}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="blacklisted"
                        checked={vehicleForm.watch("blacklisted")}
                        onCheckedChange={(checked) =>
                          vehicleForm.setValue(
                            "blacklisted",
                            checked as boolean
                          )
                        }
                      />
                      <Label
                        htmlFor="blacklisted"
                        className="text-sm font-medium"
                      >
                        Blacklist this vehicle
                      </Label>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("nextofkin")}
                  >
                    Back
                  </Button>
                  <Button type="button" onClick={() => setActiveTab("review")}>
                    Next: Review
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Review Tab */}
            <TabsContent value="review" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Review & Submit Registration
                  </CardTitle>
                  <CardDescription>
                    Review all information and submit the registration
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Please review all information carefully. Once submitted,
                      the owner and vehicle records will be created in the
                      system. You'll then have the option to create a virtual
                      account for payments.
                    </AlertDescription>
                  </Alert>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("vehicle")}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={onSubmit}
                    disabled={isLoading}
                    className="flex items-center gap-2"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    {isLoading ? "Creating..." : "Create Vehicle & Owner"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
