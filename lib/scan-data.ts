import type { ScanRequest, ScanResponse, UnblockRequest, ReportIssue } from "@/types/scan"

// Mock scan API - replace with actual API calls
export async function scanVehicle(request: ScanRequest): Promise<ScanResponse> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock response based on vehicleId
  const mockVehicles = {
    VEH001: {
      id: "VEH001",
      plateNumber: "LAG-123-ABC",
      category: "Commercial",
      type: "Bus",
      ownerName: "John Doe",
      status: "compliant" as const,
      routeInfo: {
        assignedLgas: ["lagos-mainland", "ikeja"],
        currentLga: "lagos-mainland",
        isOnRoute: true,
      },
    },
    VEH002: {
      id: "VEH002",
      plateNumber: "LAG-456-DEF",
      category: "Private",
      type: "Car",
      ownerName: "Jane Smith",
      status: "non_compliant" as const,
      routeInfo: {
        assignedLgas: ["ikeja"],
        currentLga: "lagos-mainland",
        isOnRoute: false,
      },
    },
  }

  const vehicle = mockVehicles[request.vehicleId as keyof typeof mockVehicles]

  if (!vehicle) {
    throw new Error("Vehicle not found")
  }

  const response: ScanResponse = {
    success: true,
    vehicle,
  }

  // Add violation if vehicle is out of route
  if (!vehicle.routeInfo?.isOnRoute) {
    response.violation = {
      type: "out_of_route",
      message: "Vehicle is operating outside its assigned route",
      levyCharged: 5000,
    }
  }

  return response
}

export async function requestUnblock(request: UnblockRequest): Promise<{ success: boolean; message: string }> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    success: true,
    message: "Unblock request submitted. You will be notified when approved.",
  }
}

export async function reportIssue(report: ReportIssue): Promise<{ success: boolean; reportId: string }> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    success: true,
    reportId: `RPT-${Date.now()}`,
  }
}

export async function getVehicleDetails(vehicleId: string) {
  // Simulate API call to /api/vehicles/one/{id}
  await new Promise((resolve) => setTimeout(resolve, 300))

  const mockVehicle = {
    id: vehicleId,
    plateNumber: "LAG-123-ABC",
    category: "Commercial",
    type: "Bus",
    color: "Yellow",
    ownerName: "John Doe",
    ownerPhone: "+234-801-234-5678",
    status: "compliant" as const,
    registrationExpiry: "2024-12-31",
    lastPayment: "2024-01-15",
    routeInfo: {
      assignedLgas: ["lagos-mainland", "ikeja"],
      currentLga: "lagos-mainland",
      isOnRoute: true,
    },
  }

  return mockVehicle
}
