import styles from "./Sidebar.module.scss";
import Message from "./Message";
import UserPosition from "./UserPosition";
import Distance from "./Distance";
import { useMechanics } from "../contexts/MechanicsContext";

function Sidebar() {
  const { mapPosition } = useMechanics();

  return (
    <div className={styles.sidebar}>
      <div>
        {!mapPosition && (
          <Message
            message="Start by clicking on your location on the map 🙂"
            className={styles.message}
          />
        )}

        {mapPosition && <UserPosition />}
        {mapPosition && <Distance />}
      </div>
    </div>
  );
}

export default Sidebar;

{
  /* reverse geocoding ubaci sledece */
}
