import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";

function Map ({ apiKey }) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: apiKey,
      });
      const center = useMemo(() => ({ lat: 39.5501, lng: -105.7821 }), []);
    
      return (
        <div className="map">
          {!isLoaded ? (
            <h1>Loading...</h1>
          ) : (
            <GoogleMap
              mapContainerClassName="map-container"
              center={center}
              zoom={7}>
                {/* Denver */}
                <MarkerF position={{ lat: 39.7392, lng: -104.9903 }} />
                {/* Colorado Springs */}
                <MarkerF position={{ lat: 38.8339, lng: -104.8214 }} />
                {/* Boulder */}
                <MarkerF position={{ lat: 40.0150, lng: -105.2705 }} />
                {/* Fort Collins */}
                <MarkerF position={{ lat: 40.5853, lng: -105.0844 }} />
                {/* Grand Junction */}
                <MarkerF position={{ lat: 39.0639, lng: -108.5506 }} />
                {/* Durango */}
                <MarkerF position={{ lat: 37.2753, lng: -107.8801 }} />
                {/* Pueblo */}
                <MarkerF position={{ lat: 38.2544, lng: -104.6091 }} />
                {/* Aspen */}
                <MarkerF position={{ lat: 39.1911, lng: -106.8175 }} />
                {/* Steamboat Springs */}
                <MarkerF position={{ lat: 40.4850, lng: -106.8317 }} />
                {/* Trinidad */}
                <MarkerF position={{ lat: 37.1715, lng: -104.5062 }} />
              </GoogleMap>
          )}
        </div>
      );

}

export default Map;