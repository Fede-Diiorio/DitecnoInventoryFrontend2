import { formatDate } from "../../../utilities";
import { ItemContainer, SimpleDataTable } from "../../../components";

export const DeliveryNoteDetail = ({
  deliveryNoteNumber,
  createdAt,
  products,
}) => {
  return (
    <div>
      <p>
        <span>Número de remito: </span>
        {deliveryNoteNumber}
      </p>
      <p>
        <span>Fecha: </span>
        {formatDate(createdAt)}
      </p>
      <h5>Productos: </h5>
      <SimpleDataTable data={products} />
    </div>
  );
};
