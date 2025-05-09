import { formatCurrency } from "../../../../utilities";

export const columns = [
  {
    name: "Código",
    selector: (row) => row.code,
  },
  {
    name: "Description",
    selector: (row) => row.description,
    width: "600px",
  },
  {
    name: "Cantidad",
    selector: (row) => row.quantity,
  },
  {
    name: "Precio unitario",
    selector: (row) => formatCurrency(row.price),
  },
  {
    name: "Subtotal",
    selector: (row) => formatCurrency(row.quantity * row.price),
  },
];
