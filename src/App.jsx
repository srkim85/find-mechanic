import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Map from "./components/Map";
import { MechanicsProvider } from "./contexts/MechanicsContext";

function App() {
  return (
    <MechanicsProvider>
      <Header />
      <Sidebar />
      <Map />
    </MechanicsProvider>
  );
}

export default App;
