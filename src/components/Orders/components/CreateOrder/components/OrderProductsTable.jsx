import DataTable from "react-data-table-component";
import { customStyles } from "../../../../../utilities";

export const OrderProductsTable = ({
  products,
  onQuantityChange,
  onRemove,
}) => {
  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.name,
    },
    {
      name: "Código",
      selector: (row) => row.code,
    },
    {
      name: "Descripción",
      selector: (row) => row.description,
    },
    {
      name: "Precio",
      selector: (row) => row.price,
    },
    {
      name: "Cantidad",
      cell: (row) => (
        <input
          type="number"
          value={row.quantityToLoad}
          min={1}
          defaultValue={1}
          max={row.quantity}
          onChange={(e) => onQuantityChange(row.id, e.target.value)}
          style={{ width: "80px", textAlign: "center" }}
        />
      ),
    },
    {
      name: "Subtotal",
      cell: (row) =>
        (row.price * row.quantityToLoad || row.price * 1).toFixed(2),
    },
    {
      name: "Eliminar",
      button: true,
      cell: (row) => <button onClick={() => onRemove(row.id)}>🗑️</button>,
    },
  ];

  return (
    <DataTable
      data={products}
      columns={columns}
      noDataComponent="La orden no tiene productos"
      dense
      highlightOnHover
      customStyles={customStyles}
    />
  );
};
