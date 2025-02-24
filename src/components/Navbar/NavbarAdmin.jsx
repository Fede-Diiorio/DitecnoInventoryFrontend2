import { Button } from "..";
import { FlexContainerRow } from "../../styled-components";
import { Link } from "react-router-dom";

export const NavbarAdmin = () => {
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
    </FlexContainerRow>
  );
};
