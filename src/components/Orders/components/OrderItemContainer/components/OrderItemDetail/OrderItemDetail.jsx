import classes from "./OrderItemDetail.module.scss";
import { OrderQuantityUpdater } from "../../components";

export const OrderItemDetail = ({
  name,
  code,
  quantity,
  orderNumber,
  id,
  orderId,
}) => {
  return (
    <div className={classes.box}>
      <p>
        <span>Nombre: </span>
        {name}
      </p>
      <p>
        <span>Código: </span> {code}
      </p>
      <p>
        <span>Cantidad: </span> {quantity}
      </p>
      {orderNumber === "Sin asignar" && (
        <OrderQuantityUpdater orderId={orderId} productId={id} />
      )}
    </div>
  );
};
