import { createContext, useState, useEffect, useContext } from "react";
import { useGeoLocation } from "../hooks/useGeoLocation";
import { calculateDistance } from "../helper/helper";

// const BASE_URL = `http://localhost:9000`;
const BASE_URL = `https://find-mechanic-api-3n6i.onrender.com`;

const MechanicsContext = createContext();

function MechanicsProvider({ children }) {
  const [mechanics, setMechanics] = useState([]);
  const [nearestMechanic, setNearestMechanic] = useState(null); // index
  const [minDistance, setMinDistance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [mapPosition, setMapPosition] = useState(null);
  const {
    position: geolocationPosition,
    isLoading: isLoadingGeolocation,
    getPosition,
  } = useGeoLocation();

  useEffect(function () {
    async function fetchMechanics() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/mechanics`);
        const data = await res.json();
        setMechanics(data);
      } catch (err) {
        alert("There was an error loading data...");
      } finally {
        setIsLoading(false);
      }
    }
    fetchMechanics();
  }, []);

  useEffect(
    function () {
      if (geolocationPosition) {
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
      }
    },
    [geolocationPosition, setMapPosition]
  );

  useEffect(
    function () {
      if (!mapPosition) return;

      const distances = mechanics.map((mechanic) =>
        calculateDistance(
          mapPosition?.at(0),
          mapPosition?.at(1),
          mechanic.position.lat,
          mechanic.position.lng
        )
      );
      console.log(distances);
      if (distances) {
        setMinDistance(Math.min(...distances));
        setNearestMechanic(distances.indexOf(minDistance));
      }
    },
    [mapPosition, mechanics, minDistance]
  );

  return (
    <MechanicsContext.Provider
      value={{
        isLoading,
        mechanics,
        mapPosition,
        setMapPosition,
        geolocationPosition,
        getPosition,
        nearestMechanic,
        minDistance,
      }}
    >
      {children}
    </MechanicsContext.Provider>
  );
}

function useMechanics() {
  const context = useContext(MechanicsContext);
  if (context === undefined)
    throw new Error(
      "MechanicsContext was used outside of the MechanicsProvider"
    );
  return context;
}

export { MechanicsProvider, useMechanics };
