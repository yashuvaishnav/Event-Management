import { AllRoutes } from "./Components/AllRoutes/AllRoutes";
import { GoogleAuthentication } from "./Pages/GoogleAuthentication";
import { DummyGoogleCalendar } from "./Pages/DummyGoogleCalendar";
import { Navbar } from "./Pages/Navbar";
import { useLocation } from "react-router-dom";
import { AdminNavbar } from "./Pages/AdminNavbar";
import { Footer } from "./Pages/Footer";

function App() {
  const location = useLocation();
  console.log("location", location);

  return (
    <div>
      {location.pathname === "/adminDashboard" ||
      location.pathname === "/allEvents" ||
      location.pathname === "/participants" ||
      location.pathname === "/participated" ||
      location.pathname === "/dummyHostEvent" ? (
        <AdminNavbar />
      ) : (
        <Navbar />
      )}

      <AllRoutes />
      {/* <GoogleAuthentication/> */}
      {/* <DummyGoogleCalendar /> */}
      {location.pathname !== "/adminDashboard" ||
        location.pathname !== "/allEvents" ||
        location.pathname !== "/participants" ||
        location.pathname !== "/participated" ||
        (location.pathname !== "/dummyHostEvent" && <Footer />)}
    </div>
  );
}

export default App;
