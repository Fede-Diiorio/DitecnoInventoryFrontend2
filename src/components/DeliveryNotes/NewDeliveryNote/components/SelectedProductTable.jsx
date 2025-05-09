import DataTable from "react-data-table-component";
import { customStyles } from "../../../../utilities";

export const SelectedProductsTable = ({
  products,
  onQuantityChange,
  onRemove,
}) => {
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
      name: "Cantidad a Cargar",
      cell: (row) => (
        <input
          type="number"
          value={row.quantityToLoad}
          min={1}
          max={row.quantity}
          onChange={(e) => onQuantityChange(row.id, e.target.value)}
          style={{ width: "80px", textAlign: "center" }}
        />
      ),
    },
    {
      name: "Eliminar",
      button: true,
      cell: (row) => <button onClick={() => onRemove(row.id)}>🗑️</button>,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={products}
      noDataComponent="No hay productos seleccionados"
      dense
      highlightOnHover
      customStyles={customStyles}
    />
  );
};
