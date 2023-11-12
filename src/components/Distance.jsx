import { useMechanics } from "../contexts/MechanicsContext";
import styles from "./Distance.module.scss";

function Distance() {
  const { mechanics, nearestMechanic, minDistance } = useMechanics();

  return (
    <div className={styles.distance}>
      <p>
        <span> Your nearest mechanic distance:</span> {Math.round(minDistance)}{" "}
        km{" "}
      </p>
      <p>
        <span> Your nearest mechanic location: </span>
        {mechanics.at(nearestMechanic).cityName}{" "}
      </p>
      <p>
        <span>Mechanic info: </span>{" "}
        {mechanics.at(nearestMechanic).mechanicName}
        <span>,</span> {mechanics.at(nearestMechanic).phoneNumber}
      </p>
    </div>
  );
}

export default Distance;
