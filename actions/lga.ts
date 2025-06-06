"use server";

import { auth } from "@/auth";
import { API, URLS } from "@/lib/const";
import { revalidatePath } from "next/cache";
import type { GeoJSONPolygon, LGA } from "@/types/lga";
import { z } from "zod";

export interface LGAResponse {
  success: boolean;
  message: string;
  meta: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
  data: LGA[];
}

export interface VehicleFee {
  vehicleCategory: string;
  fee: number;
}

const GetLGAsSchema = z.object({
  limit: z.number().optional().default(10),
  page: z.number().optional().default(1),
});

type GetLGAsParams = z.infer<typeof GetLGAsSchema>;

export async function getLGAs(
  params: GetLGAsParams = { limit: 50, page: 1 }
): Promise<LGAResponse> {
  try {
    const { limit, page } = GetLGAsSchema.parse(params);

    const url = new URL(`${API}/api/lga/all`);
    url.searchParams.append("limit", limit.toString());
    url.searchParams.append("page", page.toString());

    const response = await fetch(url.toString(), {
      headers: {
        accept: "*/*",
      },
      cache: "no-store", // Ensure we get fresh data
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch LGAs: ${response.status} ${response.statusText}`
      );
    }

    const data: LGAResponse = await response.json();

    // Parse the fee string into an array of objects if it's a string
    const processedData = {
      ...data,
      data: data.data.map((lga) => ({
        ...lga,
        fee: typeof lga.fee === "string" ? JSON.parse(lga.fee) : lga.fee,
      })),
    };

    return processedData;
  } catch (error) {
    console.error("Error fetching LGAs:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch LGAs"
    );
  }
}

export async function getLGAById(id: string): Promise<LGA> {
  try {
    const response = await fetch(`${API}/api/lga/one/${id}`, {
      headers: {
        accept: "*/*",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch LGA: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    if (!data.success || !data.data) {
      throw new Error(data.message || "Failed to fetch LGA");
    }

    // Parse the fee string into an array of objects if it's a string
    const lga = data.data;
    return {
      ...lga,
      fee: typeof lga.fee === "string" ? JSON.parse(lga.fee) : lga.fee,
    };
  } catch (error) {
    console.error("Error fetching LGA by ID:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch LGA"
    );
  }
}

export async function createLGAsBulk(
  lgas: {
    name: string;
    fee: VehicleFee[];
    boundary: {
      type: string;
      coordinates: number[][][];
    };
  }[]
): Promise<{ success: boolean; message: string; data?: any }> {
  try {
    const response = await fetch(`${API}/api/lga/create-bulk`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
      body: JSON.stringify(lgas),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to create LGAs: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating LGAs in bulk:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to create LGAs"
    );
  }
}

export async function softDeleteLGA(
  id: string
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`${API}/api/lga/soft/${id}`, {
      method: "PATCH",
      headers: {
        accept: "*/*",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("LGA not found or already deleted");
      }
      throw new Error(
        `Failed to soft delete LGA: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return {
      success: true,
      message: data.message || "LGA soft deleted successfully",
    };
  } catch (error) {
    console.error("Error soft deleting LGA:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to soft delete LGA"
    );
  }
}

export async function hardDeleteLGA(
  id: string
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`${API}/api/lga/hard/${id}`, {
      method: "DELETE",
      headers: {
        accept: "*/*",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("LGA not found");
      }
      throw new Error(
        `Failed to permanently delete LGA: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return {
      success: true,
      message: data.message || "LGA permanently deleted",
    };
  } catch (error) {
    console.error("Error permanently deleting LGA:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to permanently delete LGA"
    );
  }
}

export async function createLga(
  name: string,
  fee: string,
  boundary: GeoJSONPolygon
) {
  const session = await auth();
  const headers = {
    "Content-Type": "application/json",
    "api-secret": process.env.API_SECRET || "",
    Authorization: `Bearer ${session?.user.access_token}`,
  };

  const payload = {
    name: name,
    fee: fee,
    boundary: boundary,
  };

  try {
    const response = await fetch(`${API}${URLS.lga}`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to create lga");
    }

    const data = await response.json();

    // Revalidate the page where this data is used
    revalidatePath(`/lgas`);

    return { success: true, data };
  } catch (error) {
    console.error("Error creating lga:", error);
    return { success: false, error: "Failed to create lga" };
  }
}

export async function updateLGA(
  id: string,
  data: {
    name: string;
    fee: VehicleFee[];
    boundary: {
      type: string;
      coordinates: number[][][];
    };
  }
): Promise<{ success: boolean; message: string; data?: any }> {
  const session = await auth();
  const headers = {
    "Content-Type": "application/json",
    "api-secret": process.env.API_SECRET || "",
    Authorization: `Bearer ${session?.user.access_token}`,
  };
  try {
    const response = await fetch(`${API}/api/lga/update/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(data),
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("LGA not found");
      }
      throw new Error(
        `Failed to update LGA: ${response.status} ${response.statusText}`
      );
    }

    const result = await response.json();
    return {
      success: true,
      message: result.message || "LGA updated successfully",
      data: result.data,
    };
  } catch (error) {
    console.error("Error updating LGA:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to update LGA"
    );
  }
}

export async function updateLGAFee(
  id: string,
  vehicleCategory: string,
  newFee: number
): Promise<{ success: boolean; message: string; data?: any }> {
  try {
    const session = await auth();
    const headers = {
      "Content-Type": "application/json",
      "api-secret": process.env.API_SECRET || "",
      Authorization: `Bearer ${session?.user.access_token}`,
    };
    const response = await fetch(`${API}/api/lga/update/fee/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        vehicleCategory,
        newFee,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("LGA not found");
      }
      throw new Error(
        `Failed to update LGA fee: ${response.status} ${response.statusText}`
      );
    }

    const result = await response.json();
    return {
      success: true,
      message: result.message || "Fee updated successfully",
      data: result.data,
    };
  } catch (error) {
    console.error("Error updating LGA fee:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to update LGA fee"
    );
  }
}
