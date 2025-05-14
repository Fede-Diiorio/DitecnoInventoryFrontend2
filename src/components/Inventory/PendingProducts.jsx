import DataTable from "react-data-table-component";
import { useFetch } from "../../hooks";
import { customStyles, columnsForPendingProducts } from "../../utilities";
import { Container } from "../../styled-components";
import { getPendingProducts } from "../../services";
import classes from "./Inventory.module.scss";
import { Button } from "../../components";
import { useNavigate } from "react-router-dom";

export const PendingProducts = () => {
  const { data: products, loading, error } = useFetch(getPendingProducts);
  const navigate = useNavigate();

  return (
    <Container>
      {loading && <h3>Cargando...</h3>}
      {error && <h3>Acceso denegado</h3>}
      {!loading && !error && (
        <section className={classes.background}>
          <DataTable
            className={classes.dataTable}
            columns={columnsForPendingProducts}
            data={products}
            customStyles={customStyles}
            noDataComponent="No hay nada por aquí"
            onRowClicked={(row) => navigate(`/ordenes/${row.order_id}`)}
            pagination
            highlightOnHover
            dense
            paginationComponentOptions={{
              rowsPerPageText: "Filas por página",
              rangeSeparatorText: "de",
            }}
          />
          <Button label={"Volver"} parentMethod={() => navigate(-1)} />
        </section>
      )}
    </Container>
  );
};
