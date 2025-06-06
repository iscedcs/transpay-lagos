"use client";

// import { ALL_IMEIS } from '@/lib/consts';
import { APIProvider, AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import { useState } from "react";

export default function MapPreview({
     trackers,
}: {
     trackers: IModifiedTrackerDetails[];
}) {
     const [imei, setImei] = useState<string[]>([]); // Manage your 'imei' state

     // const { isLoading, error, data } = useTrackerLocations(imei);
     return (
          <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
               <Map
                    className="h-[100svh] w-full overflow-clip"
                    zoom={15}
                    center={{
                         lat: trackers[0].lat,
                         lng: trackers[0].lon,
                    }}
                    gestureHandling={"greedy"}
                    mapId={"YUTGTGT"}
                    // disableDefaultUI={true}
               >
                    {trackers.map((a, b) => (
                         <AdvancedMarker
                              key={b}
                              // ref={markerRef}
                              // onClick={() => setInfowindowOpen(true)}
                              position={{
                                   lat: a.lat,
                                   lng: a.lon,
                              }}
                              title={""}
                         >
                              <div className="text-4xl">🚗</div>
                         </AdvancedMarker>
                    ))}
               </Map>
          </APIProvider>
     );
}
