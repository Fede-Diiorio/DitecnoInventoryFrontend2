import { Login, Dashboard } from "./pages";
import { AuthContext, AuthProvider, RefreshProvider } from "./context";
import { useContext } from "react";

function AppContent() {
  const { token } = useContext(AuthContext);
  return token ? <Dashboard /> : <Login />;
}

function App() {
  return (
    <AuthProvider>
      <RefreshProvider>
        <AppContent />
      </RefreshProvider>
    </AuthProvider>
  );
}

export default App;
