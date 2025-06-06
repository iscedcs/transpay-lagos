"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, User, Shield, RotateCcw } from "lucide-react";
import { Vehicle } from "@prisma/client";

interface PublicVehicleInfoProps {
  vehicle: Vehicle;
  onNewScan: () => void;
}

export function PublicVehicleInfo({
  vehicle,
  onNewScan,
}: PublicVehicleInfoProps) {
  return (
    <Card className="w-full">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
          <Shield className="w-8 h-8 text-green-600" />
        </div>
        <CardTitle className="text-xl text-green-700">
          Verified Vehicle
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          This vehicle is registered with TransPay
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Vehicle Information */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Car className="w-5 h-5 text-gray-600" />
            <div>
              <p className="font-semibold text-lg">{vehicle.plateNumber}</p>
              <p className="text-sm text-muted-foreground">Plate Number</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="font-medium">{vehicle.category}</p>
              <p className="text-xs text-muted-foreground">Category</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="font-medium">{vehicle.type}</p>
              <p className="text-xs text-muted-foreground">Type</p>
            </div>
          </div>

          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="font-medium">{vehicle.color}</p>
            <p className="text-xs text-muted-foreground">Vehicle Color</p>
          </div>
        </div>

        {/* Owner Information (Public Only) */}
        <div className="border-t pt-4">
          <div className="flex items-center gap-3 mb-3">
            <User className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold">Vehicle Owner</h3>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="font-medium">
              {/* @ts-expect-error: garri and groundnut */}
              {vehicle.owner.firstName} {vehicle.owner.lastName}
            </p>
            <p className="text-sm text-muted-foreground">Registered Owner</p>
          </div>
        </div>

        {/* Safety Status */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Safety Status</h3>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              Verified
            </Badge>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Vehicle is registered with TransPay</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Owner information verified</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Licensed for commercial transport</span>
            </div>
          </div>
        </div>

        {/* Safety Message */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Safety First</h4>
          <p className="text-sm text-blue-800">
            This vehicle is verified and registered. Always ensure the plate
            number matches before boarding.
          </p>
        </div>

        {/* Action Button */}
        <Button onClick={onNewScan} className="w-full" variant="outline">
          <RotateCcw className="w-4 h-4 mr-2" />
          Scan Another Vehicle
        </Button>
      </CardContent>
    </Card>
  );
}
