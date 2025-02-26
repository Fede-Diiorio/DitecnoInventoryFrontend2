import { getProductsWithLowStock } from "../../services";
import { useAsync } from "../../hooks";
import { ItemContainer } from "../../components";

export const LowStockList = () => {
  const { data: products, error, loading } = useAsync(getProductsWithLowStock);

  if (loading) return <h3>Cargando...</h3>;

  if (error) return <h3>Acceso denegado</h3>;

  return <ItemContainer items={products} />;
};
