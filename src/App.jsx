import { Login, Dashboard } from "./pages";
import { AuthContext, AuthProvider } from "./context";
import { useContext } from "react";

function AppContent() {
  const { token } = useContext(AuthContext);
  return token ? <Dashboard /> : <Login />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
