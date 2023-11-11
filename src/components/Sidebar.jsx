import styles from "./Sidebar.module.scss";
import Message from "./Message";
import UserPosition from "./UserPosition";

function Sidebar({ mapPosition, geolocationPosition, setMapPosition }) {
  return (
    <div className={styles.info}>
      {!mapPosition && (
        <Message message="Start by clicking on your location on the map 🙂" />
      )}

      {mapPosition && (
        <UserPosition
          mapPosition={mapPosition}
          geolocationPosition={geolocationPosition}
          setMapPosition={setMapPosition}
        />
      )}
    </div>
  );
}

export default Sidebar;

{
  /* reverse geocoding ubaci sledece */
}
