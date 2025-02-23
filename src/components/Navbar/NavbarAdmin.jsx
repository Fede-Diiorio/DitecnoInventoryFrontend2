import { Button } from "..";
import { FlexContainer } from "../../styled-components";
import { Link } from "react-router-dom";

export const NavbarAdmin = () => {
  return (
    <FlexContainer>
      <Link to={"/"}>
        <Button label={"Agregar productos"} />
      </Link>

      <Link to={"/inventario"}>
        <Button label={"Inventario"} />
      </Link>

      <Button label={"Bajo stock"} />
      <Button label={"Lista de precios"} />
    </FlexContainer>
  );
};
