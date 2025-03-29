import { Container } from "../../../../styled-components";
import { OrderItemDetail } from "./components/OrderItemDetail/OrderItemDetail";

export const OrderItemContainer = ({ items, orderNumber, orderId }) => {
  return (
    <Container>
      <section>
        {items?.map((item) => (
          <OrderItemDetail
            key={item.id}
            {...item}
            orderNumber={orderNumber}
            orderId={orderId}
          />
        ))}
      </section>
    </Container>
  );
};
