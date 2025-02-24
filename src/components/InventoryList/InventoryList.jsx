import { getInventory } from "../../services";
import { useAsync } from "../../hooks";
import { ItemMapper } from "../../components";

export const InventoryList = () => {
  const products = useAsync(getInventory);
  return <ItemMapper items={products} />;
};
