import { AuthContext } from "../../context";
import { useContext } from "react";
import { AdminDashboard, UserDashboard } from "./components";

export const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (user.role === "user") {
    return <UserDashboard />;
  }

  if (user.role === "admin") {
    return <AdminDashboard />;
  }
};
