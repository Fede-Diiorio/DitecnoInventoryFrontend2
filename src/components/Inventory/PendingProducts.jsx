import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useFetch } from "../../hooks";
import { customStyles, columnsForPendingProducts } from "../../utilities";
import { Container } from "../../styled-components";
import { getPendingProducts } from "../../services";
import classes from "./Inventory.module.scss";
import { Button, TableInputSearch } from "../../components";
import { useNavigate } from "react-router-dom";

export const PendingProducts = () => {
  const { data: products, loading, error } = useFetch(getPendingProducts);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (Array.isArray(products)) {
      setFilteredData(products);
    }
  }, [products]);

  const handleSearchChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchValue(inputValue);
    const filtered = products.filter(
      (item) =>
        item.supplier.toLowerCase().includes(inputValue) ||
        item.code.toLowerCase().includes(inputValue) ||
        item.description.toLowerCase().includes(inputValue)
    );
    setFilteredData(filtered);
  };

  return (
    <Container>
      {loading && <h3>Cargando...</h3>}
      {error && <h3>Acceso denegado</h3>}
      {!loading && !error && (
        <section className={classes.background}>
          <h3>Próximos Ingresos</h3>
          <TableInputSearch
            value={searchValue}
            onChange={handleSearchChange}
            placeholder={"Buscar por código, descripción o proveedor"}
          />
          <DataTable
            className={classes.dataTable}
            columns={columnsForPendingProducts}
            data={filteredData}
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
