import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useFetch } from "../../hooks";
import { Container } from "../../styled-components";
import { TableInputSearch } from "../../components";
import { columns } from "./utilities/dataTableUtilities";
import classes from "./DataTable.module.scss";
import { customStyles } from "../../utilities";

export const CustomDataTable = ({ fetchFunction }) => {
  const { data, loading, error } = useFetch(fetchFunction);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (Array.isArray(data)) {
      setFilteredData(data);
    }
  }, [data]);

  const handleSearchChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchValue(inputValue);
    const filtered = data.filter(
      (item) =>
        item.name.toLowerCase().includes(inputValue) ||
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
          <TableInputSearch value={searchValue} onChange={handleSearchChange} />

          <DataTable
            columns={columns}
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
