export interface SystemUser {
  id: string
  name: string
  email: string
  phone?: string
  role: string
  stateId?: string
  stateName?: string
  lgaId?: string
  lgaName?: string
  status: "active" | "suspended" | "pending"
  lastLogin?: Date
  createdAt: Date
  createdBy: string
}

export interface UserFilters {
  role?: string
  stateId?: string
  lgaId?: string
  search?: string
  status?: string
}

export interface CreateUserData {
  name: string
  email: string
  phone?: string
  role: string
  stateId?: string
  lgaId?: string
}
