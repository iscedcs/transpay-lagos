"use client"

import { useState } from "react"
import { Car, CheckCircle } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PayDriver } from "./pay-driver"
import { ShareRide } from "./share-ride"
import { OwnerVerification } from "./owner-verification"
import { Vehicle } from "@/actions/vehicles"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { formatDate } from "@/lib/utils"

export default function PublicVehicleInfo({vehicle}:{vehicle: Vehicle}) {
    const [isVerified, setIsVerified] = useState(false)
    const owner = vehicle.owner
    const wallet = vehicle.wallet

  const handleVerificationSuccess = () => {
    setIsVerified(true)
  }

  return (
    <div className="w-full grid gap-8 max-w-3xl mx-auto p-4">
      <Card>
        <CardHeader className="bg-muted">
          <CardTitle className="text-center">Vehicle Information</CardTitle>
        </CardHeader>
        <CardContent className="p-6 gap-5">
          {/* Public Vehicle Information */}
          <Avatar className="h-32 w-32 rounded-lg mx-auto mb-4">
                <AvatarImage
                  src={vehicle.image || "/placeholder.svg"}
                  alt={vehicle.plateNumber}
                  className="object-cover"
                />
                <AvatarFallback className="text-2xl rounded-lg">
                  <Car className="h-16 w-16" />
                </AvatarFallback>
              </Avatar>
          <div className="grid gap-4 mb-6">
            <div className="grid gap-4 place-items-center text-center">
              <div>
                <Label>Vehicle Type</Label>
                              <p className="font-semibold">{vehicle.category}</p>
              </div>
              <div>
                <Label>Plate Number</Label>
                <p className="font-semibold">{vehicle.plateNumber}</p>
              </div>
              <div>
                <Label>Vehicle Owner</Label>
                <p className="font-semibold">{`${owner?.firstName} ${owner?.lastName}`}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center mb-8">
            <PayDriver />
            <ShareRide />
          </div>

          {/* Vehicle Owner Access */}
          {!isVerified ? (
            <OwnerVerification security_code={vehicle.securityCode} onVerificationSuccess={handleVerificationSuccess} />
          ) : (
            <>
              <div className="flex items-center gap-2 justify-center mb-6 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Owner Verified</span>
              </div>

              <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="wallet">Wallet</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-4">
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Vehicle Owner</Label>
                        <p className="font-semibold">{`${owner?.firstName} ${owner?.lastName}`}</p>
                      </div>
                      <div>
                            <Label>Next Payment Date</Label>
                            <p className="font-semibold text-red-500">{wallet?.nextTransactionDate}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Security Code</Label>
                        <p className="font-semibold">{vehicle.securityCode ?? 'N/A'}</p>
                      </div>
                    </div>
                      <div>
                        <Label>Fareflex Status</Label>
                        <p className="font-semibold">{vehicle.fairFlexImei? vehicle.fairFlexImei:'No fareflex installed'}</p>
                      </div>
                      <div>
                        <Label>Payment Code</Label>
                        {/* <p className="font-semibold">{vehicle.paymentCode ?? 'N/A'}</p> */}
                        <p className="font-semibold">{'S-123456-VEH'}</p>
                      </div>
                    </div>
                </TabsContent>
                <TabsContent value="wallet" className="mt-4">
                    <div className="text-center text-muted-foreground flex flex-col items-center">
                      <span className="mb-2">
                        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-primary">
                          <rect x="3" y="7" width="18" height="10" rx="2" strokeWidth="2" />
                          <path d="M16 11h2a1 1 0 0 1 1 1v0a1 1 0 0 1-1 1h-2" strokeWidth="2" />
                        </svg>
                      </span>
                      <p className="font-semibold mb-2">Wallet Info</p>
                      <p>Wallet features coming soon.</p>
                    </div>
                </TabsContent>
                <TabsContent value="history" className="mt-4">
                    <div className="text-center text-muted-foreground flex flex-col items-center">
                      <span className="mb-2">
                        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-primary">
                          <path d="M4 7h16M4 17h16M7 7v10M17 7v10" strokeWidth="2" />
                        </svg>
                      </span>
                      <p className="font-semibold mb-2">Payment History</p>
                      <p>Payment history info coming soon.</p>
                    </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </CardContent>
      </Card>
      {/* Footer */}
        <div className="text-center text-sm text-gray-500 space-y-2">
          <p>
            For complaints or inquiries, contact the relevant transport
            authority
          </p>
          <p className="text-xs">
            Vehicle ID: {vehicle.securityCode} • Last updated:{" "}
            {formatDate(vehicle.updatedAt)}
          </p>
        </div>
    </div>
  )
}
