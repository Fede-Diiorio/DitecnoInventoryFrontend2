import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import { useFetch } from "../../hooks";
import { TableInputSearch } from "../../components";
import { customStyles, columnsForInventory } from "../../utilities";
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
    const filtered = data.filter(
      (item) =>
        item.description.toLowerCase().includes(inputValue) ||
        item.code.toLowerCase().includes(inputValue)
    );
    setFilteredData(filtered);
  };

  const handleRowClick = (row) => {
    navigate(`/inventario/${row.id}`);
  };

  console.log(products);

  return (
    <Container>
      {loading && <h3>Cargando...</h3>}
      {error && <h3>Acceso denegado</h3>}
      {!loading && !error && (
        <section className={classes.background}>
          <TableInputSearch value={searchValue} onChange={handleSearchChange} />

          <DataTable
            columns={columnsForInventory}
            data={filteredData}
            customStyles={customStyles}
            noDataComponent="No hay nada por aquí"
            pagination
            highlightOnHover
            onRowClicked={handleRowClick}
            dense
            paginationComponentOptions={{
              rowsPerPageText: "Filas por página",
              rangeSeparatorText: "de",
            }}
          />
        </section>
      )}
    </Container>
  );
};
