import { AllRoutes } from "./Components/AllRoutes/AllRoutes";
import { Navbar } from "./Pages/Navbar";
import { useLocation } from "react-router-dom";
import { AdminNavbar } from "./Pages/AdminNavbar";
import { Footer } from "./Pages/Footer";

function App() {
  const location = useLocation();
  const pathArr = [
    "/adminDashboard",
    "/allEvents",
    "/participants",
    "/participated",
    "/dummyHostEvent",
  ];

  return (
    <div>
      {pathArr.includes(location.pathname) ? <AdminNavbar /> : <Navbar />}
      <AllRoutes />
      {!pathArr.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;

// "mongodb://localhost:27017/event-management"
