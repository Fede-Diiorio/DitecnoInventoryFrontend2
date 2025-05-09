import DataTable from "react-data-table-component";
import { Container } from "../../../../styled-components";
import { customStyles } from "../../../../utilities";

export const SimpleDataTable = ({ data, onRowClick }) => {
  const columns = [
    {
      name: "Código",
      selector: (row) => row.code,
    },
    {
      name: "Descripción",
      selector: (row) => row.description,
    },
    {
      name: "Unidad",
      selector: (row) => row.unit_value,
    },
    {
      name: "Precio",
      selector: (row) => row.price,
    },
    {
      name: "Cantidad",
      cell: (row) => (
        <input
          type="number"
          value={row.quantityToLoad || calculateMin(row)}
          min={calculateMin(row)}
          max={row.quantity}
          step={calculateMin(row)}
          onChange={(e) => onQuantityChange(row.id, e.target.value)}
          style={{ width: "80px", textAlign: "center" }}
        />
      ),
    },
    {
      name: "Subtotal",
      cell: (row) => (row.price * (row.quantityToLoad || 1)).toFixed(2),
    },
    {
      name: "Eliminar",
      cell: (row) => <button onClick={() => onRemove(row.id)}>🗑️</button>,
    },
  ];
  return (
    <Container>
      <section>
        <DataTable
          columns={columns}
          data={data}
          customStyles={customStyles}
          noDataComponent="No hay nada por aquí"
          highlightOnHover
          dense
          onRowClicked={onRowClick}
        />
      </section>
    </Container>
  );
};
