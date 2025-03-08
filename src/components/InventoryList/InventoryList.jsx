import { getInventory } from "../../services";
import { useAsync } from "../../hooks";
import { ItemContainer } from "../../components";
import { FlexContainerColumn } from "../../styled-components";

export const InventoryList = () => {
  const { data: products, loading, error } = useAsync(getInventory);
  console.log(error);

  if (loading) return <h3>Cargando...</h3>;

  if (error) return <h3>Acceso denegado</h3>;

  return <ItemContainer items={products} />;
};
