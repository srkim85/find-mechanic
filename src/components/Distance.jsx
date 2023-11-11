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

  console.log(distances);
  console.log(minValue);
  console.log(index);

  return (
    <div>
      <p>Your nearest mechanic distance: {minValue.toFixed(2)} km </p>
      <p>Your nearest mechanic location: {mechanics.at(index).cityName} </p>
      <p>
        Mechanic info: {mechanics.at(index).mechanicName},{" "}
        {mechanics.at(index).phoneNumber}
      </p>
    </div>
  );
}

export default Distance;
