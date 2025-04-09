export const columns = [
  {
    name: "Nombre",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Código",
    selector: (row) => row.code,
    sortable: true,
  },
  {
    name: "Cantidad",
    selector: (row) => (row.stock !== 0 ? row.stock : "0"),
    sortable: true,
  },
];
