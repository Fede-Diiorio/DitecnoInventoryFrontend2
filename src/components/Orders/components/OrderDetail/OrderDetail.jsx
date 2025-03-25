import { getOrderById } from "../../../../services";
import { useAsync } from "../../../../hooks";
import { useParams, useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { Container } from "../../../../styled-components";
import { orderHanlder } from "../../../../utilities";
import {
  ItemContainer,
  Button,
  DeliveryNotes,
  NumberUpdates,
} from "../../../../components";
import classes from "./OrderDetail.module.scss";

export const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const handleNavigate = () => {
    navigate(-1);
  };

  const fetchOrder = useCallback(() => getOrderById(id), [id, refresh]);

  const { data, loading, error } = useAsync(fetchOrder);

  if (loading) return <h3>Cargando...</h3>;

  if (error) return <h3>Ups! Ocurrió un error</h3>;

  const { order, user, products, deliveryNotes } = orderHanlder(data);

  return (
    <Container>
      <section className={classes.box}>
        <div className={classes.orderInfo}>
          <p>
            <span>Nombre: </span>
            {user.name} {user.lastname}
          </p>
          <p>
            <span>Fecha: </span> {order.date}
          </p>
          <p>
            <span>Hora: </span> {order.time}
          </p>
          <p>
            <span>Número de orden: </span>
            {order.number === "Sin asignar" ? (
              <NumberUpdates orderId={order.id} onUpdate={setRefresh} />
            ) : (
              order.number
            )}
          </p>
          <h4>Productos: </h4>
        </div>
        <ItemContainer items={products} />
        <DeliveryNotes deliveryNotes={deliveryNotes} />
        <Button label={"Volver"} parentMethod={handleNavigate} />
      </section>
    </Container>
  );
};
