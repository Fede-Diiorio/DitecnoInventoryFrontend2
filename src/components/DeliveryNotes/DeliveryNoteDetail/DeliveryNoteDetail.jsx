import { formatDate } from "../../../utilities";
import { SimpleDataTable } from "../../../components";
import classes from "./DeliveryNoteDetail.module.scss";

export const DeliveryNoteDetail = ({
  deliveryNoteNumber,
  createdAt,
  products,
}) => {
  return (
    <div className={classes.box}>
      <div className={classes.info}>
        <p>
          <span>Número de remito: </span>
          {deliveryNoteNumber}
        </p>
        <p>
          <span>Fecha: </span>
          {formatDate(createdAt)}
        </p>
      </div>

      <SimpleDataTable data={products} />
    </div>
  );
};
