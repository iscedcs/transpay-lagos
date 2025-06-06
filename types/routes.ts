export interface VehicleRoute {
  id: string
  vehicleId: string
  vehiclePlate: string
  vehicleOwner: string
  vehicleCategory: string
  stateId: string
  stateName: string
  steps: RouteStep[]
  totalLGAs: number
  createdAt: Date
  updatedAt: Date
  createdBy: string
}

export interface RouteStep {
  id: string
  routeId: string
  lgaId: string
  lgaName: string
  order: number
  createdAt: Date
}

export interface CreateRouteData {
  vehicleId: string
  steps: {
    lgaId: string
    order: number
  }[]
}

export interface UpdateRouteStepData {
  id: string
  lgaId?: string
  order?: number
}

export interface RouteFilters {
  search?: string
  stateId?: string
  lgaId?: string
}

export interface VehicleOption {
  id: string
  plateNumber: string
  owner: string
  category: string
  stateId: string
  lgaId: string
  hasRoute: boolean
}
