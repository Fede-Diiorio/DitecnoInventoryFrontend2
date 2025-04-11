import DataTable from "react-data-table-component";
import { Container } from "../../../../styled-components";
import { columns } from "../../utilities/dataTableUtilities";
import classes from "../../DataTable.module.scss";
import { customStyles } from "../../../../utilities";

export const SimpleDataTable = ({ data, onRowClick }) => {
  return (
    <Container>
      <section className={classes.background}>
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
