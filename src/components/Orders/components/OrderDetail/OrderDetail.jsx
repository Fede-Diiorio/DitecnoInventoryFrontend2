import { getOrderById } from "../../../../services";
import { useAsync } from "../../../../hooks";
import { useParams, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { Container } from "../../../../styled-components";
import { formatDate, formatTime } from "../../../../utilities";
import { ItemContainer, Button } from "../../../../components";
import classes from "./OrderDetail.module.scss";

export const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(-1);
  };

  const fetchOrder = useCallback(() => getOrderById(id), [id]);

  const { data, loading, error } = useAsync(fetchOrder);

  if (loading) return <h3>Cargando...</h3>;

  if (error) return <h3>Ups! Ocurrió un error</h3>;

  const { user_name, user_lastname, order_number, order_date } =
    data.orderInfo.order;

  const products = data.orderInfo.products;

  const numberOrder = order_number ? order_number : "No asignado";

  return (
    <Container>
      <section className={classes.box}>
        <div className={classes.orderInfo}>
          <p>
            <span>Nombre: </span>
            {user_name} {user_lastname}
          </p>
          <p>
            <span>Fecha: </span> {formatDate(order_date)}
          </p>
          <p>
            <span>Hora: </span> {formatTime(order_date)}
          </p>
          <p>
            <span>Número de orden: </span>
            {numberOrder}
          </p>
          <h4>Productos: </h4>
        </div>
        <ItemContainer items={products} />
        <Button label={"Volver"} parentMethod={handleNavigate} />
      </section>
    </Container>
  );
};
