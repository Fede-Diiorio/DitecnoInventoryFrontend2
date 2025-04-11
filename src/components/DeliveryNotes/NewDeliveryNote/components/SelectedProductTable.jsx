import DataTable from "react-data-table-component";

export const SelectedProductsTable = ({
  products,
  onQuantityChange,
  onRemove,
}) => {
  const columns = [
    {
      name: "Código",
      selector: (row) => row.code,
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Cantidad Disponible",
      selector: (row) => row.quantity,
    },
    {
      name: "Cantidad a Cargar",
      cell: (row) => (
        <input
          type="number"
          value={row.quantityToLoad}
          min={0}
          max={row.quantity}
          onChange={(e) => onQuantityChange(row.id, e.target.value)}
          style={{ width: "80px" }}
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
      customStyles={{
        headCells: {
          style: {
            fontWeight: "bold",
            fontSize: "14px",
          },
        },
      }}
    />
  );
};
