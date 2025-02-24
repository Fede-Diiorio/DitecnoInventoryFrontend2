import { getProductsWithLowStock } from "../../services";
import { useAsync } from "../../hooks";
import { ItemMapper } from "../../components";

export const LowStockList = () => {
  const products = useAsync(getProductsWithLowStock);
  return <ItemMapper items={products} />;
};
