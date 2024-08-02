import { AllRoutes } from "./Components/AllRoutes/AllRoutes";
import { Navbar } from "./Pages/Navbar";
import { useLocation } from "react-router-dom";
import { AdminNavbar } from "./Pages/AdminNavbar";
import { Footer } from "./Pages/Footer";

function App() {
  const location = useLocation();

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
      {location.pathname !== "/adminDashboard" ||
        location.pathname !== "/allEvents" ||
        location.pathname !== "/participants" ||
        location.pathname !== "/participated" ||
        (location.pathname !== "/dummyHostEvent" && <Footer />)}
    </div>
  );
}

export default App;
