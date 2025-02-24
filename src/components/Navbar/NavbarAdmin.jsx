import { Button } from "../../components";
import { FlexContainerRow } from "../../styled-components";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context";
import { useContext } from "react";

export const NavbarAdmin = () => {
  const { logout } = useContext(AuthContext);

  const hadleLogout = () => {
    logout();
  };

  return (
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

      <Link to={"/inventario"}>
        <Button label={"Lista de precios"} />
      </Link>

      <Link to={"/"}>
        <Button label={"Cerrar sesión"} parentMethod={hadleLogout} />
      </Link>
    </FlexContainerRow>
  );
};
