// Nigerian LGA boundary data structure based on the GeoJSON file
export interface NigeriaLGAFeature {
  type: "Feature";
  id: string;
  geometry_name: string;
  properties: {
    id: number;
    name: string;
    code: string;
    timestamp: string;
    state_code: string;
  };
  geometry: {
    type: "MultiPolygon";
    coordinates: number[][][][];
  };
}

export interface NigeriaLGACollection {
  type: "FeatureCollection";
  totalFeatures: number;
  numberMatched: number;
  numberReturned: number;
  timeStamp: string;
  name: string;
  crs: {
    type: "name";
    properties: { name: string };
  };
  features: NigeriaLGAFeature[];
}

// State code mappings
export const NIGERIAN_STATES = {
  AB: "Abia",
  AD: "Adamawa",
  AK: "Akwa Ibom",
  AN: "Anambra",
  BA: "Bauchi",
  BY: "Bayelsa",
  BE: "Benue",
  BO: "Borno",
  CR: "Cross River",
  DE: "Delta",
  EB: "Ebonyi",
  ED: "Edo",
  EK: "Ekiti",
  EN: "Enugu",
  GO: "Gombe",
  IM: "Imo",
  JI: "Jigawa",
  KD: "Kaduna",
  KN: "Kano",
  KT: "Katsina",
  KE: "Kebbi",
  KO: "Kogi",
  KW: "Kwara",
  LA: "Lagos",
  NA: "Nasarawa",
  NI: "Niger",
  OG: "Ogun",
  ON: "Ondo",
  OS: "Osun",
  OY: "Oyo",
  PL: "Plateau",
  RI: "Rivers",
  SO: "Sokoto",
  TA: "Taraba",
  YO: "Yobe",
  ZA: "Zamfara",
  FC: "Federal Capital Territory",
} as const;

export type StateCode = keyof typeof NIGERIAN_STATES;

// Sample LGA data from the file for Lagos State
export const LAGOS_LGAS: NigeriaLGAFeature[] = [
  // This would be populated from the actual GeoJSON file
  // For now, using mock data with the correct structure
];

// Helper functions
export function getStateName(stateCode: StateCode): string {
  return NIGERIAN_STATES[stateCode] || stateCode;
}

export function getLGAsByState(
  features: NigeriaLGAFeature[],
  stateCode: StateCode
): NigeriaLGAFeature[] {
  return features.filter(
    (feature) => feature.properties.state_code === stateCode
  );
}

export function findLGAByName(
  features: NigeriaLGAFeature[],
  name: string
): NigeriaLGAFeature | undefined {
  return features.find(
    (feature) => feature.properties.name.toLowerCase() === name.toLowerCase()
  );
}

export function getBoundingBox(coordinates: number[][][][]): {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
} {
  let minLat = Number.POSITIVE_INFINITY,
    maxLat = Number.NEGATIVE_INFINITY;
  let minLng = Number.POSITIVE_INFINITY,
    maxLng = Number.NEGATIVE_INFINITY;

  coordinates.forEach((polygon) => {
    polygon.forEach((ring) => {
      ring.forEach((coord) => {
        const [lng, lat] = coord;
        minLat = Math.min(minLat, lat);
        maxLat = Math.max(maxLat, lat);
        minLng = Math.min(minLng, lng);
        maxLng = Math.max(maxLng, lng);
      });
    });
  });

  return { minLat, maxLat, minLng, maxLng };
}

export function calculateLGACenter(coordinates: number[][][][]): {
  lat: number;
  lng: number;
} {
  const bbox = getBoundingBox(coordinates);
  return {
    lat: (bbox.minLat + bbox.maxLat) / 2,
    lng: (bbox.minLng + bbox.maxLng) / 2,
  };
}
