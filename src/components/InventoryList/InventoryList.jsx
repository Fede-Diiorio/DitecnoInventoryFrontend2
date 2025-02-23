import { getInventory } from "../../services";
import { useAsync } from "../../hooks";
import { ProductItem } from "./ProductItem/ProductItem";
import { Container } from "../../styled-components";

export const InventoryList = () => {
  const products = useAsync(getInventory);

  return (
    <Container>
      <section>
        {products?.map((product) => {
          return <ProductItem key={product.id} {...product} />;
        })}
      </section>
    </Container>
  );
};
