import { Button } from "..";
import { FlexContainer } from "../../styled-components";

export const NavbarAdmin = () => {
  return (
    <FlexContainer>
      <Button label={"Agregar productos"} />
      <Button label={"Inventario"} />
      <Button label={"Bajo stock"} />
      <Button label={"Lista de precios"} />
    </FlexContainer>
  );
};
