import DataTable from "react-data-table-component";
import { Container } from "../../../../styled-components";
import classes from "../../DataTable.module.scss";
import { customStyles, columnsForinventory } from "../../../../utilities";

export const SimpleDataTable = ({ data, onRowClick }) => {
  return (
    <Container>
      <section className={classes.background}>
        <DataTable
          columns={columnsForinventory}
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
