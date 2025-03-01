import { ItemDetail, ItemDetailForAdder } from "./components";
import { Container } from "../../styled-components";

export const ItemContainer = ({ items, useAdder = false }) => {
  return (
    <Container>
      <section>
        {items?.map((item) =>
          useAdder ? (
            <ItemDetailForAdder key={item.id} {...item} />
          ) : (
            <ItemDetail key={item.id} {...item} />
          )
        )}
      </section>
    </Container>
  );
};
