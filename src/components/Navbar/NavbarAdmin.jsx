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

      <Button label={"Bajo stock"} />
      <Button label={"Lista de precios"} />
    </FlexContainerRow>
  );
};
