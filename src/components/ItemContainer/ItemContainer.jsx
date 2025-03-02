import { ItemDetail } from "./components";
import { Container } from "../../styled-components";

export const ItemContainer = ({ items, useAdder = false }) => {
  return (
    <Container>
      <section>
        {items?.map((item) => (
          <ItemDetail key={item.id} {...item} />
        ))}
      </section>
    </Container>
  );
};
