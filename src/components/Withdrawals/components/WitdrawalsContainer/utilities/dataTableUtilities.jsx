import { formatDate, formatTime } from "../../../../../utilities";

export const withdrawalColumns = [
  {
    name: "Nombre",
    selector: (row) => `${row.name} ${row.lastname}`,
    sortable: true,
  },
  {
    name: "Fecha",
    selector: (row) => row.date,
    sortable: true,
    format: (row) => formatDate(row.date),
  },
  {
    name: "Hora",
    selector: (row) => row.date,
    format: (row) => formatTime(row.date),
  },
];
