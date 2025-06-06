"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Map, Code, MapPin, Layers } from "lucide-react"
import type { GeoJSONPolygon, NigerianLGABoundary } from "@/types/lga"
import { calculateLGACenter, getBoundingBox } from "@/lib/nigeria-lgas"

interface LGABoundaryMapProps {
  boundary?: GeoJSONPolygon | NigerianLGABoundary
  editable?: boolean
  onBoundaryChange?: (boundary: GeoJSONPolygon | NigerianLGABoundary) => void
}

export function LGABoundaryMap({ boundary, editable = false, onBoundaryChange }: LGABoundaryMapProps) {
  const handleDrawBoundary = () => {
    // Mock boundary drawing - in real implementation, this would open a map drawing tool
    const mockBoundary: GeoJSONPolygon = {
      type: "Polygon",
      coordinates: [
        [
          [3.3792, 6.5244],
          [3.3795, 6.525],
          [3.3789, 6.5255],
          [3.3792, 6.5244],
        ],
      ],
    }
    onBoundaryChange?.(mockBoundary)
  }

  const getBoundaryInfo = (boundary: GeoJSONPolygon | NigerianLGABoundary) => {
    if (boundary.type === "MultiPolygon") {
      const nigerianBoundary = boundary as NigerianLGABoundary
      const center = calculateLGACenter(nigerianBoundary.coordinates)
      const bbox = getBoundingBox(nigerianBoundary.coordinates)

      return {
        center,
        bbox,
        polygonCount: nigerianBoundary.coordinates.length,
        pointCount: nigerianBoundary.coordinates.reduce(
          (total, polygon) => total + polygon.reduce((polyTotal, ring) => polyTotal + ring.length, 0),
          0,
        ),
        source: nigerianBoundary.source || "custom",
        lgaCode: nigerianBoundary.lgaCode,
        stateCode: nigerianBoundary.stateCode,
      }
    } else {
      // Simple polygon
      const coords = boundary.coordinates[0]
      const lat = coords.reduce((sum, coord) => sum + coord[1], 0) / coords.length
      const lng = coords.reduce((sum, coord) => sum + coord[0], 0) / coords.length

      return {
        center: { lat, lng },
        bbox: {
          minLat: Math.min(...coords.map((c) => c[1])),
          maxLat: Math.max(...coords.map((c) => c[1])),
          minLng: Math.min(...coords.map((c) => c[0])),
          maxLng: Math.max(...coords.map((c) => c[0])),
        },
        polygonCount: 1,
        pointCount: coords.length,
        source: "custom",
      }
    }
  }

  const boundaryInfo = boundary ? getBoundaryInfo(boundary) : null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Map className="h-5 w-5" />
          LGA Boundary
          {boundaryInfo?.source === "nigeria-official" && (
            <Badge variant="default" className="ml-2">
              <Layers className="h-3 w-3 mr-1" />
              Official
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {boundary ? (
          <div className="space-y-4">
            {/* Mock map display */}
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 relative">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  {boundary.type === "MultiPolygon" ? "Multi-Polygon" : "Polygon"} Boundary
                </p>
                <p className="text-xs text-gray-500">
                  Center: {boundaryInfo?.center.lat.toFixed(4)}, {boundaryInfo?.center.lng.toFixed(4)}
                </p>
              </div>

              {boundaryInfo?.source === "nigeria-official" && (
                <div className="absolute top-2 right-2">
                  <Badge variant="outline" className="bg-white">
                    Official Data
                  </Badge>
                </div>
              )}
            </div>

            {/* Boundary info */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Boundary Type</div>
                  <div className="text-sm">{boundary.type}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Source</div>
                  <div className="text-sm capitalize">{boundaryInfo?.source}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Polygons</div>
                  <div className="text-sm">{boundaryInfo?.polygonCount}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Coordinate Points</div>
                  <div className="text-sm">{boundaryInfo?.pointCount}</div>
                </div>
              </div>

              {boundaryInfo?.lgaCode && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">LGA Code</div>
                    <div className="text-sm font-mono">{boundaryInfo.lgaCode}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">State Code</div>
                    <div className="text-sm font-mono">{boundaryInfo.stateCode}</div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t">
                <Button variant="outline" size="sm">
                  <Code className="h-4 w-4 mr-2" />
                  View GeoJSON
                </Button>
                <Button variant="outline" size="sm">
                  <Map className="h-4 w-4 mr-2" />
                  Full Map View
                </Button>
              </div>
            </div>

            {editable && (
              <Button onClick={handleDrawBoundary} className="w-full">
                <Map className="h-4 w-4 mr-2" />
                Redraw Boundary
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center">
                <Map className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">No boundary defined</p>
                {editable && <p className="text-xs text-gray-500">Click below to draw boundary</p>}
              </div>
            </div>

            {editable && (
              <div className="space-y-2">
                <Button onClick={handleDrawBoundary} className="w-full">
                  <Map className="h-4 w-4 mr-2" />
                  Draw Custom Boundary
                </Button>
                <Button variant="outline" className="w-full">
                  <Layers className="h-4 w-4 mr-2" />
                  Import from Official Data
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
