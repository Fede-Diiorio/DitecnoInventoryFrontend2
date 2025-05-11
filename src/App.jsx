import { Login, Dashboard } from "./pages";
import {
  AuthContext,
  AuthProvider,
  RefreshProvider,
  AdderProvider,
  DeliveryNoteProvider,
} from "./context";
import { useContext } from "react";
import { ToastContainer } from "react-toastify";

function AppContent() {
  const { token, user } = useContext(AuthContext);

  if (!token) {
    return <Login />;
  }

  switch (user.role) {
    case "admin":
      return <Dashboard.Admin />;
    case "user":
      return <Dashboard.User />;
    default:
      return <Login />;
  }
}

function App() {
  return (
    <AdderProvider>
      <RefreshProvider>
        <DeliveryNoteProvider>
          <AppContent />
          <ToastContainer position="bottom-right" />
        </DeliveryNoteProvider>
      </RefreshProvider>
    </AdderProvider>
  );
}

export default App;
