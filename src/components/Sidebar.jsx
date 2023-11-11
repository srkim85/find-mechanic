import styles from "./Sidebar.module.scss";
import Message from "./Message";
import UserPosition from "./UserPosition";
import Distance from "./Distance";
import { useMechanics } from "../contexts/MechanicsContext";

function Sidebar() {
  const { mapPosition } = useMechanics();

  return (
    <div className={styles.sidebar}>
      {!mapPosition && (
        <Message message="Start by clicking on your location on the map 🙂" />
      )}

      {mapPosition && <UserPosition />}
      {mapPosition && <Distance />}
    </div>
  );
}

export default Sidebar;

{
  /* reverse geocoding ubaci sledece */
}
