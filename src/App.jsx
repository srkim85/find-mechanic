import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import Map from "./components/Map";
import { useGeoLocation } from "./hooks/useGeoLocation";
import { MechanicsProvider } from "./contexts/MechanicsContext";

function App() {
  const [mapPosition, setMapPosition] = useState(null);

  const { position: geolocationPosition, getPosition } = useGeoLocation();

  return (
    <MechanicsProvider>
      <Header />
      <Main>
        <Sidebar
          mapPosition={mapPosition}
          setMapPosition={setMapPosition}
          geolocationPosition={geolocationPosition}
        />
        <Map
          mapPosition={mapPosition}
          setMapPosition={setMapPosition}
          geolocationPosition={geolocationPosition}
          getPosition={getPosition}
        />
      </Main>
    </MechanicsProvider>
  );
}

export default App;
