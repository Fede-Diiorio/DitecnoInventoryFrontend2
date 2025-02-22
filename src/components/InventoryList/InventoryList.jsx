import { getInventory } from "../../services";
import { useAsync } from "../../hooks";
import { ProductItem } from "./ProductItem/ProductItem";

export const InventoryList = () => {
  const products = useAsync(getInventory);

  return (
    <section>
      {products?.map((product) => {
        return <ProductItem key={product.id} {...product} />;
      })}
    </section>
  );
};
