export const columns = [
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
