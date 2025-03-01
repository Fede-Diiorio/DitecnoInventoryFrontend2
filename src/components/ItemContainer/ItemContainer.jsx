import { ItemDetail } from "../../components";
import { Container } from "../../styled-components";

export const ItemContainer = ({ items }) => {
  return (
    <Container>
      <section>
        {items?.map((item) => {
          return <ItemDetail key={item.id} {...item} />;
        })}
      </section>
    </Container>
  );
};
