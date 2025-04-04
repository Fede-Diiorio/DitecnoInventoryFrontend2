import { Button } from "../../components";
import { UserInfo } from "./components";
import { FlexContainerRow } from "../../styled-components";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context";
import { useContext } from "react";

export const NavbarAdmin = () => {
  const { logout } = useContext(AuthContext);

  const hadleLogout = () => {
    logout();
  };

  return (
    <div>
      <UserInfo />
      <FlexContainerRow>
        <Link to={"/"}>
          <Button label={"Agregar productos"} />
        </Link>

        <Link to={"/inventario"}>
          <Button label={"Inventario"} />
        </Link>

        <Link to={"/bajo-stock"}>
          <Button label={"Bajo stock"} />
        </Link>

        <Link to={"/retiros"}>
          <Button label={"Retiros"} />
        </Link>

        <Link to={"/ordenes"}>
          <Button label={"Ordenes"} />
        </Link>

        <Link to={"/"}>
          <Button label={"Cerrar sesión"} parentMethod={hadleLogout} />
        </Link>
      </FlexContainerRow>
    </div>
  );
};
