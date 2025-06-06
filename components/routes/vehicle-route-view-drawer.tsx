"use client"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Car, Route, MapPin, Calendar, ArrowRight, Map } from "lucide-react"
import type { VehicleRoute } from "@/types/routes"

interface VehicleRouteViewDrawerProps {
  route: VehicleRoute | null
  isOpen: boolean
  onClose: () => void
}

export function VehicleRouteViewDrawer({ route, isOpen, onClose }: VehicleRouteViewDrawerProps) {
  if (!route) return null

  const getVehicleCategoryBadgeVariant = (category: string) => {
    switch (category) {
      case "bus":
        return "default"
      case "taxi":
        return "secondary"
      case "truck":
        return "outline"
      default:
        return "secondary"
    }
  }

  const sortedSteps = [...route.steps].sort((a, b) => a.order - b.order)

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[600px] sm:w-[700px] max-w-[90vw] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Vehicle Route Details</SheetTitle>
          <SheetDescription>Complete route information for {route.vehiclePlate}</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Vehicle Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                Vehicle Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Plate Number</div>
                  <div className="text-lg font-semibold">{route.vehiclePlate}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Owner</div>
                  <div className="text-lg font-semibold">{route.vehicleOwner}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Category</div>
                  <Badge variant={getVehicleCategoryBadgeVariant(route.vehicleCategory)}>{route.vehicleCategory}</Badge>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">State</div>
                  <div>{route.stateName}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Route Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Route className="h-5 w-5" />
                Route Sequence ({route.totalLGAs} LGAs)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sortedSteps.map((step, index) => (
                  <div key={step.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                      {step.order}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{step.lgaName}</div>
                      <div className="text-sm text-muted-foreground">
                        Step {step.order} of {route.totalLGAs}
                      </div>
                    </div>
                    {index < sortedSteps.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Route Visualization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5" />
                Route Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Route visualization</p>
                  <p className="text-xs text-gray-500">{sortedSteps.map((step) => step.lgaName).join(" → ")}</p>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  <Map className="h-4 w-4 mr-2" />
                  View Full Map
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Route Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Route Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Route ID</div>
                  <div className="text-sm font-mono">{route.id}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Total LGAs</div>
                  <div>{route.totalLGAs}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Created</div>
                  <div>{route.createdAt.toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Last Updated</div>
                  <div>{route.updatedAt.toLocaleDateString()}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Route Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Route Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Start Point:</span>
                  <span>{sortedSteps[0]?.lgaName || "N/A"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">End Point:</span>
                  <span>{sortedSteps[sortedSteps.length - 1]?.lgaName || "N/A"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Intermediate Stops:</span>
                  <span>{Math.max(0, route.totalLGAs - 2)}</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="text-sm font-medium mb-2">Full Route:</div>
                  <div className="text-sm text-muted-foreground">
                    {sortedSteps.map((step) => step.lgaName).join(" → ")}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  )
}
