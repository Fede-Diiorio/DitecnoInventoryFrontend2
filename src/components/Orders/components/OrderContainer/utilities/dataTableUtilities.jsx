// ordersTableColumns.js
import { formatDate, formatTime } from "../../../../../utilities";

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
