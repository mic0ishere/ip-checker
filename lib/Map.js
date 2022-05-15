import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
import { Icon } from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

const marker = new Icon({
  iconUrl: "/icon-location.svg",
});

function Map({ data, initialPosition }) {
  const [position, setPosition] = useState([0, 0]);

  useEffect(() => {
    if (data && data.lat && data.lon) {
      setPosition([data.lat, data.lon]);
    }
  }, [data]);

  function ChangeView({ center }) {
    const map = useMap();
    map?.setView(center);
    return null;
  }

  return (
    <MapContainer
      center={position}
      style={{
        width: "100%",
        height: "100%",
      }}
      zoom={15}
    >
      <ChangeView center={position} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={marker}>
        <Tooltip permanent opacity={1} offset={[25, 0]} direction="right">
          {initialPosition && (
            <>
              <strong>You are here!</strong>
              <br />
            </>
          )}
          {data.lat && data.lon ? (
            <>
              ({data.city}, {data.regionName}, {data.country})
              <br />
              ISP: {data.isp} ({data.asname})
            </>
          ) : (
            <>Couldn&apos;t locate!</>
          )}
        </Tooltip>
      </Marker>
    </MapContainer>
  );
}

export default Map;
