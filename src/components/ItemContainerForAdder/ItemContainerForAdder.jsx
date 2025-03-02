import classes from "./ItemContainerForAdder.module.scss";
import { ItemDetailForAdder } from "./components";
import { Container } from "../../styled-components";

export const ItemContainerForAdder = ({ items }) => {
  return (
    <Container>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>Código</th>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {items?.map((item) => (
            <ItemDetailForAdder key={item.id} {...item} />
          ))}
        </tbody>
      </table>
    </Container>
  );
};
