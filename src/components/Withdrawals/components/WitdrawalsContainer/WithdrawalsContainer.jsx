import { Container, FlexContainerColumn } from "../../../../styled-components";
import { WithdrawalCard } from "../../components";

export const WithdrawalsContainer = ({ withdrawals }) => {
  return (
    <Container>
      <section>
        <FlexContainerColumn>
          {withdrawals?.map((withdrawal) => {
            return <WithdrawalCard key={withdrawal.id} {...withdrawal} />;
          })}
        </FlexContainerColumn>
      </section>
    </Container>
  );
};
