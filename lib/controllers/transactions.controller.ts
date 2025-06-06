import { format, subMonths } from "date-fns";
import { API, URLS } from "../const";
import { auth } from "@/auth";

export const getAllTransactions = async (
     start?: string,
     end?: string,
     type?: "DAILY_FEES" | "ALL" | "TRACKER_FEES",
) => {
     const session = await auth();
     const headers = {
          "Content-Type": "application/json",
          "api-secret": process.env.API_SECRET || "",
          Authorization: `Bearer ${session?.user.access_token}`,
     };

     const url = `${API}${URLS.transactions.all}`;
     const res = await fetch(url, { headers, cache: "no-store" });
     const result = await res.json();
     if (!res.ok) return undefined;

     const total: {
          rows: ITransaction[];
          meta: { total: number; total_pages: number; page: number };
     } = result.data;
     return total;
};
