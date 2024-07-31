
import { AllRoutes } from "./Components/AllRoutes/AllRoutes";
import {GoogleAuthentication} from "./Pages/GoogleAuthentication";
import { DummyGoogleCalendar } from "./Pages/DummyGoogleCalendar";

function App() {
  return (
    <div className="App">
      <AllRoutes />
      {/* <GoogleAuthentication/> */}
      {/* <DummyGoogleCalendar /> */}
    </div>
  );
}

export default App;