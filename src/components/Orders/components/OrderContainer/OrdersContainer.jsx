import { Container, FlexContainerColumn } from "../../../../styled-components";
import { OrdersCard } from "..";

export const OrdersContainer = ({ orders }) => {
  return (
    <Container>
      <section>
        <FlexContainerColumn>
          {orders?.map((order) => {
            return <OrdersCard key={order.id} {...order} />;
          })}
        </FlexContainerColumn>
      </section>
    </Container>
  );
};
