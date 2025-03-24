import classes from "./OrdersCard.module.scss";
import { FlexContainerRow } from "../../../../styled-components";
import { Link } from "react-router-dom";
import { formatDate, formatTime } from "../../../../utilities";

export const OrdersCard = ({
  user_name,
  user_lastname,
  order_date,
  id,
  order_number,
}) => {
  const number = order_number ? order_number : "Sin asignar";

  return (
    <Link to={`/ordenes/${id}`}>
      <div className={classes.box}>
        <FlexContainerRow>
          <p>
            <span>Nombre: </span>
            {user_name} {user_lastname}
          </p>
          <p>
            <span>Numero de orden: </span>
            {number}
          </p>
          <p>
            <span>Fecha: </span> {formatDate(order_date)}
          </p>
          <p>
            <span>Hora: </span> {formatTime(order_date)}
          </p>
        </FlexContainerRow>
      </div>
    </Link>
  );
};
