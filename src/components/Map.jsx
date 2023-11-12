import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import styles from "./Map.module.scss";
import Button from "./Button";
import { useMechanics } from "../contexts/MechanicsContext";

function Map() {
  const {
    mapPosition,
    geolocationPosition,
    getPosition,
    nearestMechanic,
    mechanics,
  } = useMechanics();
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
        zoom={7}
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
        {(nearestMechanic > 0 || nearestMechanic === 0) && (
          <Marker
            position={[
              mechanics.at(nearestMechanic).position.lat,
              mechanics.at(nearestMechanic).position.lng,
            ]}
          >
            <Popup>Nearest Mechanic</Popup>
          </Marker>
        )}
        {mapPosition && <ChangeCenter position={mapPosition} />}
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);

  return null;
}

function DetectClick() {
  const { setMapPosition } = useMechanics();
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
