import { formatDate, formatTime, formatCurrency } from "../utilities";
import { OrderQuantityUpdater } from "../components";

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

// Se utiliza principalmente para el inventario
export const columnsForInventory = [
  {
    name: "Código",
    selector: (row) => row.code,
  },
  {
    name: "Descripción",
    selector: (row) => row.description,
    width: "550px",
    sortable: true,
  },
  {
    name: "Cantidad",
    selector: (row) =>
      row.stock != null ? row.stock : row.quantity != null ? row.quantity : "0",
  },
];

const calculateMin = (row) => {
  const result = row.packaging / row.unit_value;
  return result;
};

// Se utiliza para cargar nuevas ordenes al sistema
export const columnsForCreateOrder = (onQuantityChange, onRemove) => [
  {
    name: "Código",
    selector: (row) => row.code,
    width: "175px",
  },
  {
    name: "Descripción",
    selector: (row) => row.description,
    width: "550px",
  },
  {
    name: "Unidad",
    selector: (row) => row.unit_value,
  },
  {
    name: "PK",
    selector: (row) => row.packaging,
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
    cell: (row) =>
      formatCurrency((row.price * (row.quantityToLoad || 1)).toFixed(2)),
    width: "120px",
  },
  {
    name: "Eliminar",
    cell: (row) => <button onClick={() => onRemove(row.id)}>🗑️</button>,
  },
];

// Se utiliza para mostrar todas las ordenes al picar el botón de ordenes
export const ordersColumns = [
  {
    name: "Nombre",
    selector: (row) => `${row.user_name} ${row.user_lastname}`,
    sortable: true,
  },
  {
    name: "Número de orden",
    selector: (row) => row.order_number || "Sin asignar",
    sortable: true,
  },
  {
    name: "Fecha de carga",
    selector: (row) => formatDate(row.order_date),
    sortable: true,
  },
  {
    name: "Hora de carga",
    selector: (row) => formatTime(row.order_date),
  },
  {
    name: "Orden completa",
    selector: (row) => (row.is_complete === 1 ? "Sí" : "No"),
    sortable: true,
  },
];

// Cargar un nuevo remito (desde dentro de las ordenes)
export const columnsForCreateDeliveryNote = (onQuantityChange, onRemove) => [
  {
    name: "Código",
    selector: (row) => row.code,
  },
  {
    name: "Descripción",
    selector: (row) => row.description,
    width: "550px",
  },
  {
    name: "Cantidad a Cargar",
    cell: (row) => (
      <input
        type="number"
        value={row.quantityToLoad}
        min={1}
        max={row.pending}
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

// Lista de productos que tienen las ordenes
export const columnsForOrder = (orderNumber, orderId) => {
  const showUpdateColumn = orderNumber === "Sin asignar";

  const columns = [
    {
      name: "Código",
      selector: (row) => row.code,
    },
    {
      name: "Descripción",
      selector: (row) => row.description,
      sortable: true,
      width: "550px",
    },
    {
      name: "Cantidad",
      selector: (row) => row.quantity,
    },
    {
      name: "Pendiente",
      selector: (row) => row.pending,
    },
  ];

  // Agregamos columna dinámica si corresponde
  if (showUpdateColumn) {
    columns.push({
      name: "Modificar cantidad",
      cell: (row) => (
        <OrderQuantityUpdater orderId={orderId} productId={row.id} />
      ),
      ignoreRowClick: true,
      width: "200px",
    });
  }

  return columns;
};

export const columnsForDeliveryNote = [
  {
    name: "Código",
    selector: (row) => row.code,
  },
  {
    name: "Descripción",
    selector: (row) => row.description,
    sortable: true,
    width: "550px",
  },
  {
    name: "Cantidad",
    selector: (row) => row.quantity,
  },
  {
    name: "Pendiente",
    selector: (row) => row.pending,
  },
];

export const columnsForIndex = [
  {
    name: "Código",
    selector: (row) => row.code,
  },
  {
    name: "Descripción",
    selector: (row) => row.description,
    sortable: true,
    width: "550px",
  },
  {
    name: "Cantidad",
    selector: (row) => (row.quantity !== 0 ? row.quantity : 0),
  },
  {
    name: "Stock",
    selector: (row) =>
      row.stock !== 0 ? `${row.stock - row.quantity}` : "Sin stock",
  },
];
