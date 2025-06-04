import { Login, Dashboard } from "./pages";
import {
  AuthContext,
  AdderProvider,
  DeliveryNoteProvider,
  ReloadProvider,
} from "./context";
import { useContext } from "react";
import { ToastContainer } from "react-toastify";

function AppContent() {
  const context = useContext(AuthContext);

  if (!context) {
    // Esto se ejecuta solo si el contexto está roto
    window.location.reload(); // fuerza recarga completa
    return null;
  }

  const { token, user } = context || {};

  if (!token || !user) {
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
      <DeliveryNoteProvider>
        <ReloadProvider>
          <AppContent />
          <ToastContainer position="bottom-right" />
        </ReloadProvider>
      </DeliveryNoteProvider>
    </AdderProvider>
  );
}

export default App;
