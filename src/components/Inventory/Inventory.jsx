import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import { useFetch } from "../../hooks";
import { Button, TableInputSearch } from "../../components";
import { customStyles, columnsForInventoryWithNavigate } from "../../utilities";
import { getInventory } from "../../services";
import { Container, FlexContainerRow } from "../../styled-components";
import classes from "./Inventory.module.scss";
import { useNavigate } from "react-router-dom";

export const Inventory = () => {
  const { data: products, loading, error } = useFetch(getInventory);
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

  return (
    <Container>
      {loading && <h3>Cargando...</h3>}
      {error && <h3>Acceso denegado</h3>}
      {!loading && !error && (
        <section className={classes.background}>
          <h3>Inventario</h3>
          <FlexContainerRow>
            <TableInputSearch
              value={searchValue}
              onChange={handleSearchChange}
            />
            <div className={classes.buttonsBox}>
              <Button
                label={"Crear producto"}
                parentMethod={() => navigate("/inventario/nuevo-producto")}
              />
              <Button
                label={"Stock min"}
                parentMethod={() => navigate("/inventario/bajo-stock")}
              />
            </div>
          </FlexContainerRow>

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
    </Container>
  );
};
