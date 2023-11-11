import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import Map from "./components/Map";
import { MechanicsProvider } from "./contexts/MechanicsContext";

function App() {
  return (
    <MechanicsProvider>
      <Header />
      <Main>
        <Sidebar />
        <Map />
      </Main>
    </MechanicsProvider>
  );
}

export default App;
