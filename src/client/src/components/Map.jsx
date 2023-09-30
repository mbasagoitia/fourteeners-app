import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useState, useRef } from "react";
import ".././App.css";
  
  const Map = ({ apiKey, setDisplayMap, setLocationName, setUserLocation }) => {
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: apiKey,
    });

    const mapRef = useRef(null);

    const coloradoBounds = {
        north: 41.003444,
        south: 36.993076,
        west: -109.045223,
        east: -102.041524,
      };

    const greenMarker = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
    const blueMarker = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";

    const [markers, setMarkers] = useState([
        { lat: 39.7392, lng: -104.9903, icon: greenMarker, name: "Denver" },
        { lat: 38.8339, lng: -104.8214, icon: greenMarker, name: "Colorado Springs" },
        { lat: 40.0150, lng: -105.2705, icon: greenMarker, name: "Boulder" },
        { lat: 40.5853, lng: -105.0844, icon: greenMarker, name: "Fort Collins" },
        { lat: 39.0639, lng: -108.5506, icon: greenMarker, name: "Grand Junction" },
        { lat: 37.2753, lng: -107.8801, icon: greenMarker, name:  "Durango"},
        { lat: 38.2544, lng: -104.6091, icon: greenMarker, name: "Pueblo" },
        { lat: 39.1911, lng: -106.8175, icon: greenMarker, name: "Aspen" },
        { lat: 40.4850, lng: -106.8317, icon: greenMarker, name: "Steamboat Springs" },
        { lat: 37.1715, lng: -104.5062, icon: greenMarker, name: "Trinidad" }
    ]);
  
    const onMapLoad = (map) => {
      mapRef.current = map;
    };
  
    const handleMarkerClick = (lat, lng, name) => {
      mapRef.current.panTo({ lat, lng });
      setUserLocation({lat: lat, lng: lng});
      setMarkers([...markers.slice(0, 10)]);       
      setLocationName(name);
    };
  
    const handleNonMarkerClick = (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        if (
            lat < coloradoBounds.south ||
            lat > coloradoBounds.north ||
            lng < coloradoBounds.west ||
            lng > coloradoBounds.east
        ) {
            setUserLocation(null);
            setDisplayMap(false);
        } else {
            mapRef.current.panTo({ lat, lng });
            setMarkers([...markers.slice(0, 10), { lat: lat, lng: lng, icon: blueMarker }]);
            setUserLocation({lat: lat, lng: lng});
            setLocationName(`${lat}, ${lng}`);
        }
    }

    return (
      <div className="App">
        {!isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap
            center={{ lat: 39.5501, lng: -105.7821 }}
            zoom={7}
            mapContainerClassName="map-container"
            onLoad={onMapLoad}
            onClick={handleNonMarkerClick}
            ref={mapRef}
          >
            {markers.map(({ lat, lng, icon, name }, ind) => (
              <MarkerF
                key={ind}
                position={{ lat, lng }}
                icon={icon}
                onClick={() => {
                  handleMarkerClick(lat, lng, name);
                }}
              />
            ))}
          </GoogleMap>
        )}
      </div>
    );
  };
  
  export default Map;