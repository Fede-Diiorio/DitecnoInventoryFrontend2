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
