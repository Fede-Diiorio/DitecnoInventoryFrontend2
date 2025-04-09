import DataTable from "react-data-table-component";
import { OrderQuantityUpdater } from "../OrderQuantityUpdater/OrderQuantityUpdater";

export const OrderItemContainer = ({ items, orderNumber, orderId }) => {
  const showUpdateColumn = orderNumber === "Sin asignar";

  // Definimos las columnas de la tabla
  const columns = [
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
      selector: (row) => row.quantity,
      sortable: true,
    },
  ];

  // Agregamos columna dinámica si corresponde
  if (showUpdateColumn) {
    columns.push({
      name: "Modificar cantidad",
      cell: (row) => (
        <OrderQuantityUpdater orderId={orderId} productId={row.id} />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    });
  }

  return (
    <DataTable
      title="Lista de productos"
      columns={columns}
      data={items}
      responsive
      highlightOnHover
    />
  );
};
