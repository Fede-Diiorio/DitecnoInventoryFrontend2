import DataTable from "react-data-table-component";
import { customStyles, columnsForCreateOrder } from "../../../../../utilities";

export const OrderProductsTable = ({
  products,
  onQuantityChange,
  onRemove,
}) => {
  const total = products.reduce(
    (acc, p) => acc + p.price * (p.quantityToLoad || 1),
    0
  );

  return (
    <>
      <DataTable
        data={products}
        columns={columnsForCreateOrder(onQuantityChange, onRemove)}
        noDataComponent="La orden no tiene productos"
        dense
        highlightOnHover
        customStyles={customStyles}
      />
      {products.length > 0 && (
        <div
          style={{ marginTop: "1rem", textAlign: "right", fontWeight: "bold" }}
        >
          Total: ${total.toFixed(2)}
        </div>
      )}
    </>
  );
};
