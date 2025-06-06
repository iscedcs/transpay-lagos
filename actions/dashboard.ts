"use server";

import { auth } from "@/auth";
import { API, URLS } from "@/lib/const";

export const getComplianceRate = async () => {
  const session = await auth();
  if (!session || !session.user) {
    console.log("No session or user found");
    return {
      totalVehicles: 0,
      owingVehicles: 0,
      compliantVehicles: 0,
      complianceRate: 0,
    };
  }
  const token = session?.user.access_token;
  if (!token) {
    console.log("No access token found in the session");
    return {
      totalVehicles: 0,
      owingVehicles: 0,
      compliantVehicles: 0,
      complianceRate: 0,
    };
  }
  const URL = `${API}${URLS.dashboard.superadmin.compliance_rate}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const res = await fetch(URL, { headers, cache: "no-store" });
  if (!res.ok) {
    console.error("Failed to fetch compliance rate:", res.statusText);
    return {
      totalVehicles: 0,
      owingVehicles: 0,
      compliantVehicles: 0,
      complianceRate: 0,
    };
  }
  const data = await res.json();

  const compliance_rate = data.data;
  console.log({ compliance_rate });
  if (!compliance_rate) {
    console.log("Compliance rate not found in the response data");
    return {
      totalVehicles: 0,
      owingVehicles: 0,
      compliantVehicles: 0,
      complianceRate: 0,
    };
  }
  return compliance_rate;
};

export const getTransactionSummary = async () => {
  const session = await auth();
  if (!session || !session.user) {
    console.log("No session or user found");
    return {
      totalAmount: 0,
      totalCount: 0,
    };
  }
  const token = session?.user.access_token;
  if (!token) {
    console.log("No access token found in the session");
    return {
      totalAmount: 0,
      totalCount: 0,
    };
  }
  const URL = `${API}${URLS.dashboard.superadmin.transaction_summary}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const res = await fetch(URL, { headers, cache: "no-store" });
  if (!res.ok) {
    console.error("Failed to fetch transaction summary:", res.statusText);
    return {
      totalAmount: 0,
      totalCount: 0,
    };
  }
  const data = await res.json();

  const transaction_summary = data.data;
  if (!transaction_summary) {
    console.log("Transaction summary not found in the response data");
    return {
      totalAmount: 0,
      totalCount: 0,
    };
  }
  return transaction_summary;
};

export const getOutstandingFees = async () => {
  const session = await auth();
  if (!session || !session.user) {
    console.log("No session or user found");
    return {
      totalAmount: 0,
      totalCount: 0,
    };
  }
  const token = session?.user.access_token;
  if (!token) {
    console.log("No access token found in the session");
    return {
      totalAmount: 0,
      totalCount: 0,
    };
  }
  const URL = `${API}${URLS.dashboard.superadmin.owing_summary}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const res = await fetch(URL, { headers, cache: "no-store" });
  if (!res.ok) {
    console.error("Failed to fetch Owing summary:", res.statusText);
    return {
      totalAmount: 0,
      totalCount: 0,
    };
  }
  const data = await res.json();

  const owing_summary = data.data;
  console.log({ owing_summary });
  if (!owing_summary) {
    console.log("Owing summary not found in the response data");
    return {
      totalAmount: 0,
      totalCount: 0,
    };
  }
  return owing_summary;
};

export const getMonthlyRevenueChange = async () => {
  const session = await auth();
  if (!session || !session.user) {
    console.log("No session or user found");
    return {
      currentMonthRevenue: 0,
      lastMonthRevenue: 0,
      change: "EQUAL",
    };
  }
  const token = session?.user.access_token;
  if (!token) {
    console.log("No access token found in the session");
    return {
      currentMonthRevenue: 0,
      lastMonthRevenue: 0,
      change: "EQUAL",
    };
  }
  const URL = `${API}${URLS.dashboard.superadmin.monthly_revenue_change}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const res = await fetch(URL, { headers, cache: "no-store" });
  if (!res.ok) {
    console.error("Failed to fetch monthly revenue change:", res.statusText);
    return {
      currentMonthRevenue: 0,
      lastMonthRevenue: 0,
      change: "EQUAL",
    };
  }
  const data = await res.json();

  const monthly_revenue_change = data.data;
  console.log({ monthly_revenue_change });
  if (!monthly_revenue_change) {
    console.log("Monthly revenue change not found in the response data");
    return {
      currentMonthRevenue: 0,
      lastMonthRevenue: 0,
      change: "EQUAL",
    };
  }
  return monthly_revenue_change;
};

export const getUsersByRole = async () => {
  const session = await auth();
  if (!session || !session.user) {
    console.log("No session or user found");
    return [
      { role: "ADMIN", count: 0 },
      { role: "EIRS_ADMIN", count: 0 },
      { role: "EIRS_AGENT", count: 0 },
      { role: "LGA_ADMIN", count: 0 },
      { role: "LGA_AGENT", count: 0 },
      { role: "LGA_C_AGENT", count: 0 },
      { role: "VEHICLE_OWNER", count: 0 },
    ];
  }
  const token = session?.user.access_token;
  if (!token) {
    console.log("No access token found in the session");
    return [
      { role: "ADMIN", count: 0 },
      { role: "EIRS_ADMIN", count: 0 },
      { role: "EIRS_AGENT", count: 0 },
      { role: "LGA_ADMIN", count: 0 },
      { role: "LGA_AGENT", count: 0 },
      { role: "LGA_C_AGENT", count: 0 },
      { role: "VEHICLE_OWNER", count: 0 },
    ];
  }
  const URL = `${API}${URLS.dashboard.superadmin.user_count}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const res = await fetch(URL, { headers, cache: "no-store" });
  if (!res.ok) {
    console.error("Failed to fetch users by role:", res.statusText);
    return [
      { role: "ADMIN", count: 0 },
      { role: "EIRS_ADMIN", count: 0 },
      { role: "EIRS_AGENT", count: 0 },
      { role: "LGA_ADMIN", count: 0 },
      { role: "LGA_AGENT", count: 0 },
      { role: "LGA_C_AGENT", count: 0 },
      { role: "VEHICLE_OWNER", count: 0 },
    ];
  }
  const data = await res.json();

  const user_count = data.data;
  if (!user_count) {
    console.log("users by role not found in the response data");
    return [
      { role: "ADMIN", count: 0 },
      { role: "EIRS_ADMIN", count: 0 },
      { role: "EIRS_AGENT", count: 0 },
      { role: "LGA_ADMIN", count: 0 },
      { role: "LGA_AGENT", count: 0 },
      { role: "LGA_C_AGENT", count: 0 },
      { role: "VEHICLE_OWNER", count: 0 },
    ];
  }
  return user_count;
};

export async function fetchVehicleTypes() {
  await new Promise((resolve) => setTimeout(resolve, 700));
  return [
    { type: "Sedan", count: 350 },
    { type: "SUV", count: 280 },
    { type: "Truck", count: 150 },
    { type: "Bus", count: 120 },
    { type: "Motorcycle", count: 100 },
  ];
}

export async function fetchLGARevenue() {
  await new Promise((resolve) => setTimeout(resolve, 1300));
  return [
    { lgaName: "Warri South", totalRevenue: 400000 },
    { lgaName: "Ndokwa East", totalRevenue: 120000 },
    { lgaName: "Ughelli North", totalRevenue: 280000 },
    { lgaName: "Sapele", totalRevenue: 180000 },
  ];
}

export async function fetchVehicleDistribution() {
  await new Promise((resolve) => setTimeout(resolve, 1100));
  return [
    { lgaName: "Warri South", vehicleCount: 450 },
    { lgaName: "Ndokwa East", vehicleCount: 320 },
    { lgaName: "Ughelli North", vehicleCount: 230 },
    { lgaName: "Sapele", vehicleCount: 180 },
    { lgaName: "Okpe", vehicleCount: 150 },
  ];
}
