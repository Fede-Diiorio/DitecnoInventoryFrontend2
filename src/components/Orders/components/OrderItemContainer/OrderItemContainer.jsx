import { Container } from "../../../../styled-components";
import { OrderItemDetail } from "./components/OrderItemDetail/OrderItemDetail";

export const OrderItemContainer = ({
  items,
  orderNumber,
  orderId,
  onUpdate,
}) => {
  return (
    <Container>
      <section>
        {items?.map((item) => (
          <OrderItemDetail
            key={item.id}
            {...item}
            orderNumber={orderNumber}
            orderId={orderId}
            onUpdate={onUpdate}
          />
        ))}
      </section>
    </Container>
  );
};
