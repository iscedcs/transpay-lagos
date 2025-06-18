"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, Phone, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  sendResetTokenEmail,
  sendResetTokenPhone,
  resetPasswordEmail,
  resetPasswordPhone,
} from "@/actions/auth";
import { toast } from "sonner";

type ResetMethod = "email" | "phone";
type Step = "request" | "verify";

export default function ResetPasswordPage() {
  const router = useRouter();

  // State management
  const [activeMethod, setActiveMethod] = useState<ResetMethod>("email");
  const [currentStep, setCurrentStep] = useState<Step>("request");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form data
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Error states
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^(\+234|234|0)?[789][01]\d{8}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password: string) => {
    return (
      password.length >= 8 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)
    );
  };

  // Clear errors
  const clearErrors = () => {
    setErrors({});
  };

  // Handle sending reset token
  const handleSendResetToken = async () => {
    clearErrors();
    setIsLoading(true);

    try {
      if (activeMethod === "email") {
        if (!email) {
          setErrors({ email: "Email is required" });
          return;
        }
        if (!validateEmail(email)) {
          setErrors({ email: "Please enter a valid email address" });
          return;
        }

        await sendResetTokenEmail(email);
        toast.success("Reset code sent", {
          description: "Please check your email for the reset code",
        });
      } else {
        if (!phone) {
          setErrors({ phone: "Phone number is required" });
          return;
        }
        if (!validatePhone(phone)) {
          setErrors({ phone: "Please enter a valid Nigerian phone number" });
          return;
        }

        await sendResetTokenPhone(phone);
        toast.success("Reset code sent", {
          description: "Please check your phone for the reset code",
        });
      }

      setCurrentStep("verify");
    } catch (error) {
      toast.error("Error", {
        description:
          error instanceof Error ? error.message : "Failed to send reset code",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle password reset
  const handleResetPassword = async () => {
    clearErrors();
    const newErrors: Record<string, string> = {};

    // Validation
    if (!resetCode) {
      newErrors.resetCode = "Reset code is required";
    }
    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (!validatePassword(newPassword)) {
      newErrors.newPassword =
        "Password must be at least 8 characters with uppercase, lowercase, and number";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      if (activeMethod === "email") {
        await resetPasswordEmail(email, resetCode, newPassword);
      } else {
        await resetPasswordPhone(phone, resetCode, newPassword);
      }

      toast.success("Password reset successful", {
        description:
          "Your password has been reset successfully. You can now log in with your new password.",
      });

      // Redirect to login page
      router.push("/sign-in");
    } catch (error) {
      toast.error("Error", {
        description:
          error instanceof Error ? error.message : "Failed to reset password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle method change
  const handleMethodChange = (method: ResetMethod) => {
    setActiveMethod(method);
    setCurrentStep("request");
    clearErrors();
    setResetCode("");
    setNewPassword("");
    setConfirmPassword("");
  };

  // Handle back navigation
  const handleBack = () => {
    if (currentStep === "verify") {
      setCurrentStep("request");
      clearErrors();
      setResetCode("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="mb-4 flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            {currentStep === "verify" ? "Back to request" : "Back to login"}
          </Button>
          <h2 className="text-3xl font-bold text-gray-900">
            {currentStep === "request" ? "Reset Password" : "Enter Reset Code"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {currentStep === "request"
              ? "Choose how you'd like to receive your reset code"
              : "Enter the code sent to your " + activeMethod}
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            {currentStep === "request" ? (
              // Step 1: Request reset token
              <Tabs
                value={activeMethod}
                onValueChange={(value) =>
                  handleMethodChange(value as ResetMethod)
                }
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger
                    value="email"
                    className="flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    Email
                  </TabsTrigger>
                  <TabsTrigger
                    value="phone"
                    className="flex items-center gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    Phone
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="email" className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                  <Button
                    onClick={handleSendResetToken}
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Reset Code"
                    )}
                  </Button>
                </TabsContent>

                <TabsContent value="phone" className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-600">{errors.phone}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      Format: +234XXXXXXXXXX or 08XXXXXXXXX
                    </p>
                  </div>
                  <Button
                    onClick={handleSendResetToken}
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Reset Code"
                    )}
                  </Button>
                </TabsContent>
              </Tabs>
            ) : (
              // Step 2: Verify code and reset password
              <div className="space-y-6">
                <Alert>
                  <AlertDescription>
                    A reset code has been sent to your{" "}
                    {activeMethod === "email" ? "email" : "phone number"}.
                    Please enter the code below along with your new password.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="resetCode">Reset Code</Label>
                    <Input
                      id="resetCode"
                      placeholder="Enter the 6-digit code"
                      value={resetCode}
                      onChange={(e) => setResetCode(e.target.value)}
                      className={errors.resetCode ? "border-red-500" : ""}
                      maxLength={6}
                    />
                    {errors.resetCode && (
                      <p className="text-sm text-red-600">{errors.resetCode}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className={errors.newPassword ? "border-red-500" : ""}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {errors.newPassword && (
                      <p className="text-sm text-red-600">
                        {errors.newPassword}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      Must be at least 8 characters with uppercase, lowercase,
                      and number
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirm New Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={
                          errors.confirmPassword ? "border-red-500" : ""
                        }
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-600">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep("request")}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleResetPassword}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Resetting...
                      </>
                    ) : (
                      "Reset Password"
                    )}
                  </Button>
                </div>

                <div className="text-center">
                  <Button
                    variant="link"
                    onClick={handleSendResetToken}
                    disabled={isLoading}
                    className="text-sm"
                  >
                    Didn't receive the code? Resend
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Help text */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Remember your password?{" "}
            <Button
              variant="link"
              onClick={() => router.push("/sign-in")}
              className="p-0 h-auto font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in here
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
