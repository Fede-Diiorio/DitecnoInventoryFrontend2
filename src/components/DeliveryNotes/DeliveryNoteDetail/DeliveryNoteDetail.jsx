import {
  formatDate,
  columnsForInventory,
  customStyles,
} from "../../../utilities";
import classes from "./DeliveryNoteDetail.module.scss";
import DataTable from "react-data-table-component";

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

      <DataTable
        columns={columnsForInventory}
        data={products}
        customStyles={customStyles}
        noDataComponent="No hay nada por aquí"
        highlightOnHover
        dense
      />
    </div>
  );
};
