import DataTable from "react-data-table-component";
import { customStyles, formatCurrency } from "../../../../../utilities";

export const OrderProductsTable = ({
  products,
  onQuantityChange,
  onRemove,
}) => {
  const calculateMin = (row) => {
    const result = row.packaging / row.unit_value;
    console.log(row);
    return result;
  };

  const columns = [
    {
      name: "Código",
      selector: (row) => row.code,
    },
    {
      name: "Descripción",
      selector: (row) => row.description,
      width: "600px",
    },

    {
      name: "Cantidad",
      cell: (row) => (
        <input
          type="number"
          value={row.quantityToLoad || calculateMin(row)}
          min={calculateMin(row)}
          max={row.quantity}
          step={calculateMin(row)}
          onChange={(e) => onQuantityChange(row.id, e.target.value)}
          style={{ width: "80px", textAlign: "center" }}
        />
      ),
    },
    {
      name: "Precio",
      selector: (row) => formatCurrency(row.price),
    },
    {
      name: "Subtotal",
      cell: (row) => (row.price * (row.quantityToLoad || 1)).toFixed(2),
    },
    {
      name: "Eliminar",
      cell: (row) => <button onClick={() => onRemove(row.id)}>🗑️</button>,
    },
  ];

  const total = products.reduce(
    (acc, p) => acc + p.price * (p.quantityToLoad || 1),
    0
  );

  return (
    <>
      <DataTable
        data={products}
        columns={columns}
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
