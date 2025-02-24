import { getInventory } from "../../services";
import { useAsync } from "../../hooks";
import { ItemMapper } from "../../components";
import { FlexContainerColumn } from "../../styled-components";

export const InventoryList = () => {
  const { data: products, loading, error } = useAsync(getInventory);

  if (loading) return <h3>Cargando...</h3>;

  if (error)
    return (
      <FlexContainerColumn>
        <h3>Ups! Hubo un error :(</h3>
        <p>{JSON.stringify(error)}</p>
      </FlexContainerColumn>
    );

  return <ItemMapper items={products} />;
};
