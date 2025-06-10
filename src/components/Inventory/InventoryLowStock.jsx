import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import { useFetch } from "../../hooks";
import { TableInputSearch, Button } from "../../components";
import { customStyles, columnsForInventoryWithNavigate } from "../../utilities";
import { getProductsWithLowStock } from "../../services";
import { Container } from "../../styled-components";
import classes from "./Inventory.module.scss";
import { useNavigate } from "react-router-dom";

export const InventoryLowStock = () => {
  const { data: products, loading, error } = useFetch(getProductsWithLowStock);
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
        item.description.toLowerCase().includes(inputValue) ||
        item.code.toLowerCase().includes(inputValue) ||
        item.supplier.toLowerCase().includes(inputValue)
    );
    setFilteredData(filtered);
  };

  return (
    <Container>
      {loading && <h3>Cargando...</h3>}
      {error && <h3>Acceso denegado</h3>}
      {!loading && !error && (
        <section className={classes.background}>
          <h3>Productos con bajo stock</h3>
          <TableInputSearch
            value={searchValue}
            onChange={handleSearchChange}
            placeholder={"Buscar por código, descripción o proveedor"}
          />

          <DataTable
            columns={columnsForInventoryWithNavigate(navigate)}
            data={filteredData}
            customStyles={customStyles}
            noDataComponent="No hay nada por aquí"
            pagination
            highlightOnHover
            dense
            paginationComponentOptions={{
              rowsPerPageText: "Filas por página",
              rangeSeparatorText: "de",
            }}
          />
        </section>
      )}
      <Button label={"Volver"} parentMethod={() => navigate(-1)} />
    </Container>
  );
};
