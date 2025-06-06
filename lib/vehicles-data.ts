import type {
  Vehicle,
  CreateVehicleData,
  UpdateVehicleData,
  VehicleStickerData,
  VehicleFilters,
  VehicleStats,
} from "@/types/vehicles"

// Mock data - replace with actual API calls
export async function getVehicles(filters: VehicleFilters = {}): Promise<{
  vehicles: Vehicle[]
  total: number
  page: number
  pageSize: number
}> {
  await new Promise((resolve) => setTimeout(resolve, 200))

  const mockVehicles: Vehicle[] = [
    {
      id: "vehicle_001",
      category: "TAXI",
      plateNumber: "LAG-123-ABC",
      owner: {
        firstName: "John",
        lastName: "Doe",
        phone: "08123456789",
        address: {
          text: "23 J Close, Satellite town",
          lga: "Lagos Mainland",
          city: "Lagos",
          state: "Lagos",
          unit: "Satellite Town",
          country: "Nigeria",
          postal_code: "100001",
        },
        gender: "MALE",
        marital_status: "married",
        whatsapp: "08123456789",
        email: "johndoe@example.com",
        identification: {
          type: "BVN",
          number: "73829238292328",
        },
        nok_name: "Jenny Doe",
        nok_phone: "08123456789",
        nok_relationship: "Sibling",
        maiden_name: "Ozohemena",
      },
      stateCode: "LA",
      color: "Yellow",
      image: "https://example.com/vehicle1.jpg",
      status: "ACTIVE",
      type: "Toyota Corolla",
      vin: "HSJJSHDHJSJJHDJJS",
      trackerId: "867111060133268",
      blacklisted: false,
      noBalanceUpdate: false,
      vCode: "VCODE001",
      barcode: "10122212222",
      createdAt: new Date("2025-01-15T10:00:00Z"),
      updatedAt: new Date("2025-01-25T14:30:00Z"),
      lgaId: "lga_lagos_mainland",
      lgaName: "Lagos Mainland",
      lastPayment: new Date("2025-01-20T00:00:00Z"),
      complianceStatus: "compliant",
      registrationExpiry: new Date("2025-12-31T23:59:59Z"),
    },
    {
      id: "vehicle_002",
      category: "BUS",
      plateNumber: "LAG-456-DEF",
      owner: {
        firstName: "Sarah",
        lastName: "Transport",
        phone: "08234567890",
        address: {
          text: "45 Commercial Avenue",
          lga: "Ikeja",
          city: "Lagos",
          state: "Lagos",
          unit: "GRA",
          country: "Nigeria",
          postal_code: "100271",
        },
        gender: "FEMALE",
        marital_status: "single",
        whatsapp: "08234567890",
        email: "sarah@transport.com",
        identification: {
          type: "NIN",
          number: "12345678901",
        },
        nok_name: "Mike Transport",
        nok_phone: "08234567891",
        nok_relationship: "Brother",
      },
      stateCode: "LA",
      color: "Blue",
      status: "ACTIVE",
      type: "Mercedes Sprinter",
      vin: "MBSPRINTER123456",
      blacklisted: false,
      noBalanceUpdate: true,
      vCode: "VCODE002",
      createdAt: new Date("2024-12-15T08:00:00Z"),
      updatedAt: new Date("2025-01-20T16:45:00Z"),
      lgaId: "lga_ikeja",
      lgaName: "Ikeja",
      complianceStatus: "non_compliant",
      registrationExpiry: new Date("2025-06-30T23:59:59Z"),
    },
    {
      id: "vehicle_003",
      category: "TRICYCLE",
      plateNumber: "ABJ-789-GHI",
      owner: {
        firstName: "Ahmed",
        lastName: "Kano",
        phone: "08345678901",
        address: {
          text: "12 Market Road",
          lga: "Garki",
          city: "Abuja",
          state: "FCT",
          unit: "Area 1",
          country: "Nigeria",
          postal_code: "900001",
        },
        gender: "MALE",
        marital_status: "married",
        identification: {
          type: "DRIVERS_LICENSE",
          number: "FCT123456789",
        },
        nok_name: "Fatima Kano",
        nok_phone: "08345678902",
        nok_relationship: "Wife",
      },
      stateCode: "FC",
      color: "Green",
      status: "SUSPENDED",
      type: "Bajaj RE",
      vin: "BAJAJRE987654",
      blacklisted: true,
      noBalanceUpdate: false,
      vCode: "VCODE003",
      barcode: "30333312333",
      createdAt: new Date("2024-11-10T12:00:00Z"),
      updatedAt: new Date("2025-01-18T09:15:00Z"),
      lgaId: "lga_garki",
      lgaName: "Garki",
      lastPayment: new Date("2024-12-15T00:00:00Z"),
      complianceStatus: "expired",
      registrationExpiry: new Date("2024-12-31T23:59:59Z"),
    },
  ]

  let filteredVehicles = mockVehicles

  // Apply filters
  if (filters.category) {
    filteredVehicles = filteredVehicles.filter((v) => v.category === filters.category)
  }
  if (filters.status) {
    filteredVehicles = filteredVehicles.filter((v) => v.status === filters.status)
  }
  if (filters.complianceStatus) {
    filteredVehicles = filteredVehicles.filter((v) => v.complianceStatus === filters.complianceStatus)
  }
  if (filters.stateCode) {
    filteredVehicles = filteredVehicles.filter((v) => v.stateCode === filters.stateCode)
  }
  if (filters.lgaId) {
    filteredVehicles = filteredVehicles.filter((v) => v.lgaId === filters.lgaId)
  }
  if (filters.blacklisted !== undefined) {
    filteredVehicles = filteredVehicles.filter((v) => v.blacklisted === filters.blacklisted)
  }
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filteredVehicles = filteredVehicles.filter(
      (v) =>
        v.plateNumber.toLowerCase().includes(searchLower) ||
        v.owner.firstName.toLowerCase().includes(searchLower) ||
        v.owner.lastName.toLowerCase().includes(searchLower) ||
        v.type.toLowerCase().includes(searchLower),
    )
  }

  return {
    vehicles: filteredVehicles,
    total: filteredVehicles.length,
    page: 1,
    pageSize: 10,
  }
}

export async function getVehicleById(id: string): Promise<Vehicle | null> {
  const { vehicles } = await getVehicles()
  return vehicles.find((vehicle) => vehicle.id === id) || null
}

export async function getVehicleStats(): Promise<VehicleStats> {
  const { vehicles } = await getVehicles()

  return {
    total: vehicles.length,
    active: vehicles.filter((v) => v.status === "ACTIVE").length,
    compliant: vehicles.filter((v) => v.complianceStatus === "compliant").length,
    nonCompliant: vehicles.filter((v) => v.complianceStatus === "non_compliant").length,
    blacklisted: vehicles.filter((v) => v.blacklisted).length,
    pendingVerification: vehicles.filter((v) => v.status === "PENDING_VERIFICATION").length,
  }
}

export async function createVehicle(data: CreateVehicleData): Promise<Vehicle> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const newVehicle: Vehicle = {
    id: `vehicle_${Date.now()}`,
    ...data,
    blacklisted: data.blacklisted || false,
    noBalanceUpdate: data.noBalanceUpdate || false,
    createdAt: new Date(),
    updatedAt: new Date(),
    complianceStatus: "non_compliant", // Default until first payment
  }

  return newVehicle
}

export async function updateVehicle(id: string, data: UpdateVehicleData): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  console.log(`Updated vehicle ${id}:`, data)
}

export async function updateVehicleSticker(id: string, data: VehicleStickerData): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 200))
  console.log(`Updated vehicle sticker ${id}:`, data)
}

export async function deleteVehicle(id: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  console.log(`Deleted vehicle ${id}`)
}

export async function generateQRCode(vehicleId: string): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  // In real implementation, this would call QR code generation service
  return `QR_${vehicleId}_${Date.now()}`
}
