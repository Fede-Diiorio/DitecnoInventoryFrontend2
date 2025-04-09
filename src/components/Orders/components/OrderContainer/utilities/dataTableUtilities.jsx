// ordersTableColumns.js
import { formatDate, formatTime } from "../../../../../utilities";
import { Link } from "react-router-dom";

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
