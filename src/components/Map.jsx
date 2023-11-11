import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Map.module.scss";
import Button from "./Button";

function Map({
  mapPosition,
  setMapPosition,
  geolocationPosition,
  getPosition,
}) {
  const initialMapPosition = [44, 20];

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button onClick={getPosition} type="geolocation">
          Get current position
        </Button>
      )}
      <MapContainer
        center={mapPosition || initialMapPosition}
        zoom={8}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {mapPosition && (
          <Marker position={mapPosition}>
            <Popup>Your position</Popup>
          </Marker>
        )}
        {mapPosition && <ChangeCenter position={mapPosition} />}
        <DetectClick setMapPosition={setMapPosition} />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);

  return null;
}

function DetectClick({ setMapPosition }) {
  // const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      // console.log(e);
      setMapPosition([e.latlng.lat, e.latlng.lng]);
      // navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
