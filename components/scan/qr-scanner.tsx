"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Camera, Flashlight, FlashlightOff } from "lucide-react";
import { toast } from "sonner";
import type { ScanLocation, ScanRequest, ScanResponse } from "@/types/scan";
import { scanVehicle } from "@/lib/scan-data";

interface QrScannerProps {
  location: ScanLocation;
  onScanResult: (result: ScanResponse) => void;
}

export function QrScanner({ location, onScanResult }: QrScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [hasFlash, setHasFlash] = useState(false);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsScanning(true);

        // Check if device has flash
        const track = stream.getVideoTracks()[0];
        const capabilities = track.getCapabilities();
        setHasFlash("torch" in capabilities);
      }
    } catch (error) {
      toast.error("Failed to access camera. Please check permissions.");
    }
  };

  const stopScanning = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
    setFlashEnabled(false);
  };

  const toggleFlash = async () => {
    if (streamRef.current && hasFlash) {
      const track = streamRef.current.getVideoTracks()[0];
      try {
        // await track.applyConstraints({
        //   advanced: [{ torch: !flashEnabled }],
        // })
        setFlashEnabled(!flashEnabled);
      } catch (error) {
        toast.error("Failed to toggle flash");
      }
    }
  };

  const handleManualInput = () => {
    // For demo purposes, simulate scanning a QR code
    const mockVehicleId = "VEH001";
    handleScan(mockVehicleId);
  };

  const handleScan = async (vehicleId: string) => {
    if (isProcessing) return;

    setIsProcessing(true);
    try {
      const request: ScanRequest = {
        vehicleId,
        latitude: location.latitude,
        longitude: location.longitude,
      };

      const result = await scanVehicle(request);
      onScanResult(result);
      stopScanning();
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Vehicle not found") {
          toast.error("Vehicle not found. Please check the QR code.");
        } else {
          toast.error("Scan failed. Please try again.");
        }
      }
    } finally {
      setIsProcessing(false);
    }
  };

  // Mock QR detection for demo
  const simulateQRDetection = () => {
    if (isScanning && !isProcessing) {
      // Simulate detecting a QR code after 3 seconds
      setTimeout(() => {
        if (isScanning) {
          handleScan("VEH001");
        }
      }, 3000);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
          <Camera className="h-6 w-6 text-blue-600" />
        </div>
        <CardTitle>Vehicle Scanner</CardTitle>
        <CardDescription>
          Point your camera at the vehicle's QR code or barcode
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isScanning ? (
          <div className="space-y-4">
            <Button onClick={startScanning} className="w-full" size="lg">
              <Camera className="mr-2 h-4 w-4" />
              Start Camera
            </Button>
            <Button
              onClick={handleManualInput}
              variant="outline"
              className="w-full"
            >
              Demo Scan (Test)
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
                onLoadedMetadata={simulateQRDetection}
              />

              {/* Scanning overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 border-2 border-white rounded-lg relative">
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-blue-500"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-blue-500"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-blue-500"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-blue-500"></div>
                </div>
              </div>

              {isProcessing && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                    <p>Processing scan...</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                onClick={stopScanning}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              {hasFlash && (
                <Button onClick={toggleFlash} variant="outline" size="icon">
                  {flashEnabled ? (
                    <FlashlightOff className="h-4 w-4" />
                  ) : (
                    <Flashlight className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>

            <p className="text-xs text-center text-muted-foreground">
              Position the QR code within the frame to scan
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
