import { Button } from "../../components";
import { FlexContainerRow } from "../../styled-components";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context";
import { useContext } from "react";

export const NavbarAdmin = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout(), navigate("/");
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
      <Button label={"Lista de precios"} />

      <Button label={"Cerrar sesión"} parentMethod={handleLogout} />
    </FlexContainerRow>
  );
};
