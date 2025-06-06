export interface Vehicle {
  id: string
  category: VehicleCategory
  plateNumber: string
  owner: VehicleOwner
  stateCode: string
  color: string
  image?: string
  status: VehicleStatus
  type: string
  vin: string
  trackerId?: string
  blacklisted: boolean
  noBalanceUpdate: boolean
  vCode?: string
  barcode?: string
  createdAt: Date
  updatedAt: Date
  // Additional fields for TransPay
  lgaId?: string
  lgaName?: string
  lastPayment?: Date
  complianceStatus: ComplianceStatus
  registrationExpiry?: Date
}

export interface VehicleOwner {
  firstName: string
  lastName: string
  phone: string
  address: VehicleAddress
  gender: Gender
  marital_status: MaritalStatus
  whatsapp?: string
  email?: string
  identification: Identification
  nok_name: string
  nok_phone: string
  nok_relationship: string
  maiden_name?: string
}

export interface VehicleAddress {
  text: string
  lga: string
  city: string
  state: string
  unit: string
  country: string
  postal_code: string
}

export interface Identification {
  type: IdentificationType
  number: string
}

export type VehicleCategory = "TRICYCLE" | "TAXI" | "BUS" | "TRUCK" | "MOTORCYCLE" | "PRIVATE_CAR"

export type VehicleStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED" | "PENDING_VERIFICATION"

export type ComplianceStatus = "compliant" | "non_compliant" | "grace_period" | "expired"

export type Gender = "MALE" | "FEMALE"

export type MaritalStatus = "single" | "married" | "divorced" | "widowed"

export type IdentificationType = "BVN" | "NIN" | "DRIVERS_LICENSE" | "VOTERS_CARD" | "INTERNATIONAL_PASSPORT"

export interface CreateVehicleData {
  category: VehicleCategory
  plateNumber: string
  owner: VehicleOwner
  stateCode: string
  color: string
  image?: string
  status: VehicleStatus
  type: string
  vin: string
  trackerId?: string
  blacklisted?: boolean
  noBalanceUpdate?: boolean
  vCode?: string
  lgaId?: string
}

export interface UpdateVehicleData extends Partial<CreateVehicleData> {
  barcode?: string
}

export interface VehicleStickerData {
  barcode: string
}

export interface VehicleFilters {
  category?: VehicleCategory
  status?: VehicleStatus
  complianceStatus?: ComplianceStatus
  stateCode?: string
  lgaId?: string
  search?: string
  blacklisted?: boolean
}

export interface VehicleStats {
  total: number
  active: number
  compliant: number
  nonCompliant: number
  blacklisted: number
  pendingVerification: number
}
