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
