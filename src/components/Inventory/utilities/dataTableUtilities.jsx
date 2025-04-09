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

export const customStyles = {
  rows: {
    style: {
      alignItems: "center",
    },
  },
  headCells: {
    style: {
      textAlign: "center", // ✅ centra el texto del encabezado
      justifyContent: "center", // opcional si hay flex
      fontWeight: "bold",
      display: "flex", // ✅ fuerza el layout en flex
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
