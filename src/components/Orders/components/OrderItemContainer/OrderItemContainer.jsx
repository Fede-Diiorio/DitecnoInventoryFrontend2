import DataTable from "react-data-table-component";
import { customStyles } from "../../../../utilities";
import { formatCurrency } from "../../../../utilities";

export const OrderItemContainer = ({ items, orderNumber }) => {
  // Definimos las columnas de la tabla
  const columns = [
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

  return (
    <DataTable
      columns={columns}
      data={items}
      customStyles={customStyles}
      responsive
      highlightOnHover
    />
  );
};
