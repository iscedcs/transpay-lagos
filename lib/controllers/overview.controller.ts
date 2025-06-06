import { API, URLS } from "../const";
import { getSSession } from "../get-data";

export const getVehiclesOverview = async () => {
     const session = await getSSession();
     const headers = {
          "Content-Type": "application/json",
          "api-secret": process.env.API_SECRET || "",
          Authorization: `Bearer ${session.access_token}`,
     };

     try {
          const url = `${API}${URLS.vehicle.all}/overview`;
          const res = await fetch(url, { headers, cache: "no-store" });
          const result = await res.json();
          if (!res.ok) return undefined;

          const overview: IInfo = result.data;
          return overview;
     } catch (error) {
          return undefined;
     }
};
export const getDriversOverview = async () => {
     const session = await getSSession();
     const headers = {
          "Content-Type": "application/json",
          "api-secret": process.env.API_SECRET || "",
          Authorization: `Bearer ${session.access_token}`,
     };

     const url = `${API}${URLS.driver.all}/overview`;
     const res = await fetch(url, { headers, cache: "no-store" });
     const result = await res.json();
     if (!res.ok) return undefined;

     const overview: IOthers = result.data;
     return overview;
};
export const getAgentsOverview = async () => {
     const session = await getSSession();
     const headers = {
          "Content-Type": "application/json",
          "api-secret": process.env.API_SECRET || "",
          Authorization: `Bearer ${session.access_token}`,
     };

     try {
          const url = `${API}${URLS.agent.all}/overview`;
          const res = await fetch(url, { headers, cache: "no-store" });
          const result = await res.json();
          if (!res.ok) return undefined;

          const overview: IOthers = result.data;
          return overview;
     } catch (error) {
          return undefined;
     }
};
