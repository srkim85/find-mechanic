import { createContext, useState, useEffect, useContext } from "react";
import { useGeoLocation } from "../hooks/useGeoLocation";

const BASE_URL = `http://localhost:9000`;

const MechanicsContext = createContext();

function MechanicsProvider({ children }) {
  const [mechanics, setMechanics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [mapPosition, setMapPosition] = useState(null);
  const { position: geolocationPosition, getPosition } = useGeoLocation();

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

  return (
    <MechanicsContext.Provider
      value={{
        mechanics,
        isLoading,
        mapPosition,
        setMapPosition,
        geolocationPosition,
        getPosition,
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
