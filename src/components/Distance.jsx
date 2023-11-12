import { useMechanics } from "../contexts/MechanicsContext";
import styles from "./Distance.module.scss";
import { calculateDistance } from "../helper/helper";

function Distance() {
  const { mechanics, mapPosition } = useMechanics();
  const distance = calculateDistance(
    mapPosition.at(0),
    mapPosition.at(1),
    mechanics.at(0).position.lat,
    mechanics.at(0).position.lng
  );
  // console.log(distance);

  const distances = mechanics.map((mechanic) =>
    calculateDistance(
      mapPosition.at(0),
      mapPosition.at(1),
      mechanic.position.lat,
      mechanic.position.lng
    )
  );
  const minValue = Math.min(...distances);
  const index = distances.indexOf(minValue);

  return (
    <div className={styles.distance}>
      <p>
        <span> Your nearest mechanic distance:</span> {Math.round(minValue)} km{" "}
      </p>
      <p>
        <span> Your nearest mechanic location: </span>
        {mechanics.at(index).cityName}{" "}
      </p>
      <p>
        <span>Mechanic info: </span> {mechanics.at(index).mechanicName}
        <span>,</span> {mechanics.at(index).phoneNumber}
      </p>
    </div>
  );
}

export default Distance;
