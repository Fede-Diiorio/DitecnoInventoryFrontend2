import { Button } from "../../components";
import { UserInfo } from "./components";
import { FlexContainerRow } from "../../styled-components";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context";
import { useContext } from "react";

export const NavbarMaster = () => {
  const { logout } = useContext(AuthContext);

  const hadleLogout = () => {
    logout();
  };

  return (
    <div>
      <UserInfo />
      <FlexContainerRow>
        <Link to={"/inventario"}>
          <Button label={"Inventario"} />
        </Link>

        <Link to={"/movimientos/retiros"}>
          <Button label={"Movimientos"} />
        </Link>

        <Link to={"/proveedores"}>
          <Button label={"Proveedores"} />
        </Link>

        <Link to={"/usuarios"}>
          <Button label={"Usuarios"} />
        </Link>

        <Link to={"/"}>
          <Button label={"Cerrar sesión"} parentMethod={hadleLogout} />
        </Link>
      </FlexContainerRow>
    </div>
  );
};
