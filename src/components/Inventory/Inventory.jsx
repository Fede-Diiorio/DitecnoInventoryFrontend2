import DataTable from "react-data-table-component";
import { useFetch } from "../../hooks";
import { columns, customStyles } from "./utilities/dataTableUtilities";
import { Container } from "../../styled-components";

export const InventoryView = ({ fetchFunction }) => {
  const { data, loading, error } = useFetch(fetchFunction);

  if (loading) return <h3>Cargando...</h3>;

  if (error) return <h3>Acceso denegado</h3>;

  return (
    <Container>
      <DataTable
        columns={columns}
        data={data}
        customStyles={customStyles}
        pagination
        highlightOnHover
        dense
      />
    </Container>
  );
};
