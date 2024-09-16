import { AllRoutes } from "./Components/AllRoutes/AllRoutes";
import { ClientRegistrationForm } from "./Form/ClientRegistrationForm";
import { ClientsTable } from "./Form/ClientsTable";
import { EventCreateForm } from "./Form/EventCreateForm";
function App() {
  return (
    <div>
      {/* <ClientRegistrationForm /> */}
      {/* <ClientsTable /> */}
      {/* <EventCreateForm /> */}
      <AllRoutes />
    </div>
  );
}

export default App;

// "mongodb://localhost:27017/event-management"
