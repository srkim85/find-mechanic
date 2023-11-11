import { createContext, useState, useEffect, useContext } from "react";

const BASE_URL = `http://localhost:9000`;

const MechanicsContext = createContext();

function MechanicsProvider({ children }) {
  const [mechanics, setMechanics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchMechanics() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/mechanics`);
        const data = await res.json();
        setMechanics(data);
      } catch (err) {
        alert("There was an error loading data...");
      }
    }
    fetchMechanics();
  }, []);

  return (
    <MechanicsContext.Provider value={{ mechanics, isLoading }}>
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
}

export { MechanicsProvider, useMechanics };
