import { useEffect, useState } from "react";
import styles from "./UserPosition.module.scss";
import { useMechanics } from "../contexts/MechanicsContext";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function UserPosition() {
  const [city, setCity] = useState("");
  const { mapPosition, geolocationPosition, setMapPosition } = useMechanics();

  const [lat, lng] = [...mapPosition];
  // console.log(lat, lng);

  useEffect(
    function () {
      if (!lat && !lng) return; //vidi da li ti ovo treba

      async function fetchLocationInfo() {
        try {
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          setCity(data.city, data.locality, data.countryName);
          // console.log(data.city, data.locality, data.countryName);
        } catch (err) {
          console.log(err.message);
        }
      }
      fetchLocationInfo();
    },
    [lat, lng]
  );

  return (
    <div className={styles.userPosition}>
      <span>Your current position:</span> {city}
    </div>
  );
}

export default UserPosition;
