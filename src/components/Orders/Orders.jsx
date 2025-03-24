import { getAllOrders } from "../../services";
import { useAsync } from "../../hooks";
import { OrdersContainer } from "../../components";
import classes from "./Orders.module.scss";

export const Orders = () => {
  const { data: orders, error, loading } = useAsync(getAllOrders);

  if (loading) return <h3>Cargando...</h3>;

  if (error) return <h3>Acceso denegado</h3>;

  return (
    <div className={classes.box}>
      <OrdersContainer orders={orders} />;
    </div>
  );
};
