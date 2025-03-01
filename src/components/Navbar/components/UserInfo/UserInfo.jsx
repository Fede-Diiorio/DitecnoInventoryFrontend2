import { AuthContext } from "../../../../context";
import { useContext } from "react";

export const UserInfo = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <p>No hay usuario logueado</p>;

  return (
    <p>
      <span>Usuario: </span>
      {user.name} {user.lastname}
    </p>
  );
};
