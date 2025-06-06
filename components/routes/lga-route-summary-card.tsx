"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Route, Eye } from "lucide-react"
import type { VehicleRoute } from "@/types/routes"

interface LGARouteSummaryCardProps {
  routes: VehicleRoute[]
  lgaId: string
  lgaName: string
  onViewRoute: (route: VehicleRoute) => void
}

export function LGARouteSummaryCard({ routes, lgaId, lgaName, onViewRoute }: LGARouteSummaryCardProps) {
  const getPositionInRoute = (route: VehicleRoute, lgaId: string) => {
    const step = route.steps.find((s) => s.lgaId === lgaId)
    return step ? step.order : 0
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Route className="h-5 w-5" />
          Routes Through {lgaName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {routes.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Route className="h-12 w-12 text-gray-300 mx-auto mb-2" />
            <p>No routes pass through this LGA</p>
          </div>
        ) : (
          <div className="space-y-3">
            {routes.map((route) => (
              <div key={route.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">{route.vehiclePlate}</div>
                  <div className="text-sm text-muted-foreground">{route.vehicleOwner}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">
                      Step {getPositionInRoute(route, lgaId)} of {route.totalLGAs}
                    </Badge>
                    <Badge variant="secondary">{route.vehicleCategory}</Badge>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => onViewRoute(route)}>
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
