import DataTable from "react-data-table-component";
import {
  customStyles,
  columnsForCreateDeliveryNote,
} from "../../../../utilities";

export const SelectedProductsTable = ({
  products,
  onQuantityChange,
  onRemove,
}) => {
  return (
    <DataTable
      columns={columnsForCreateDeliveryNote(onQuantityChange, onRemove)}
      data={products}
      noDataComponent="No hay productos seleccionados"
      dense
      highlightOnHover
      customStyles={customStyles}
    />
  );
};
