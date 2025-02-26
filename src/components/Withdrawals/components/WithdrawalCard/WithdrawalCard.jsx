import classes from "./WithdrawalCard.module.scss";
import { FlexContainerRow } from "../../../../styled-components";
import { Link } from "react-router-dom";
import { formatDate, formatTime } from "../../../../utilities";

export const WithdrawalCard = ({ name, lastname, date, id }) => {
  return (
    <Link to={`/retiros/${id}`}>
      <div className={classes.box}>
        <FlexContainerRow>
          <p>
            <span>Nombre: </span>
            {name} {lastname}
          </p>
          <p>
            <span>Fecha: </span> {formatDate(date)}
          </p>
          <p>
            <span>Hora: </span> {formatTime(date)}
          </p>
        </FlexContainerRow>
      </div>
    </Link>
  );
};
