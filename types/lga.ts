import type { NigeriaLGAFeature } from "@/lib/nigeria-lgas";

export interface LGA {
  id: string;
  name: string;
  state: string;
  stateId: string;
  stateCode: string;
  fee: number;
  boundary: GeoJSONPolygon | NigerianLGABoundary;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  agentCount?: number;
  vehicleCount?: number;
  scanCount?: number;
  // Additional fields from Nigerian data
  lgaCode?: string;
  officialId?: number;
}

export interface GeoJSONPolygon {
  type: "Polygon";
  coordinates: number[][][];
}

export interface NigerianLGABoundary {
  type: "MultiPolygon";
  coordinates: number[][][][];
  source: "nigeria-official";
  lgaCode: string;
  stateCode: string;
}

export interface LGAAgent {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: "active" | "suspended";
  assignedAt: Date;
}

export interface LGAVehicle {
  id: string;
  plateNumber: string;
  category: string;
  ownerName: string;
  status: "compliant" | "non_compliant" | "grace_period";
  lastPayment?: Date;
  registeredAt: Date;
}

export interface LGAScan {
  id: string;
  agentId: string;
  agentName: string;
  vehicleId: string;
  plateNumber: string;
  scanType: "compliance" | "registration";
  result: "compliant" | "violation" | "warning";
  timestamp: Date;
  location: {
    lat: number;
    lng: number;
  };
}

export interface LGARoute {
  id: string;
  name: string;
  startPoint: string;
  endPoint: string;
  distance: number;
  vehicleTypes: string[];
  status: "active" | "inactive";
  createdAt: Date;
}

export interface CreateLGAData {
  name: string;
  stateId: string;
  stateCode: string;
  fee: number;
  boundary: GeoJSONPolygon | NigerianLGABoundary;
  useOfficialBoundary?: boolean;
  officialLGAId?: number;
}

export interface LGAFilters {
  stateId?: string;
  stateCode?: string;
  search?: string;
}

export interface LGAImportData {
  selectedLGAs: NigeriaLGAFeature[];
  defaultFee: number;
  stateFilter?: string;
}
