export const customStyles = {
  rows: {
    style: {
      alignItems: "center",
      fontSize: "1rem",
    },
  },
  headCells: {
    style: {
      textAlign: "center", // ✅ centra el texto del encabezado
      display: "flex", // ✅ fuerza el layout en flex
      justifyContent: "center", // opcional si hay flex
      fontWeight: "bold",
      fontSize: "1rem",
    },
  },
  cells: {
    style: {
      textAlign: "center", // ✅ centra el texto de las celdas
      justifyContent: "center",
      display: "flex", // ✅ también puede ayudarte a forzar el centrado
    },
  },
};

export const columnsForinventory = [
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
    selector: (row) =>
      row.stock != null ? row.stock : row.quantity != null ? row.quantity : "0",
  },
];

export const columnsForCreateOrder = [
  {
    name: "Código",
    selector: (row) => row.code,
  },
  {
    name: "Descripción",
    selector: (row) => row.description,
  },
  {
    name: "Unidad",
    selector: (row) => row.unit_value,
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
    name: "Subtotal",
    cell: (row) => (row.price * (row.quantityToLoad || 1)).toFixed(2),
  },
  {
    name: "Eliminar",
    cell: (row) => <button onClick={() => onRemove(row.id)}>🗑️</button>,
  },
];
