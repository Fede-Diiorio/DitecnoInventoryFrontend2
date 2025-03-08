import classes from "./ItemContainerForAdder.module.scss";
import { ItemDetailForAdder } from "./components";
import { Container } from "../../styled-components";

export const ItemContainerForAdder = ({ items }) => {
  return (
    <Container>
      <table className={classes.table}>
        <thead>
          <tr>
            <th className={classes.code}>Código</th>
            <th className={classes.description}>Descripción</th>
            <th className={classes.number}>Cant</th>
            <th className={classes.number}>Stk</th>
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
