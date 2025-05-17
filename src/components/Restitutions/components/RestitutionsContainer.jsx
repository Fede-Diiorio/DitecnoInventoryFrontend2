import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { TableInputSearch } from "../../../components";
import { customStyles, columnsRestitutionWhitdrawal } from "../../../utilities";
import { Container } from "../../../styled-components";

export const RestitutionsContainer = ({ restitutions }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (Array.isArray(restitutions)) setFilteredData(restitutions);
  }, [restitutions]);

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);
    const filtered = restitutions.filter((item) =>
      `${item.name} ${item.lastname}`.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  const handleRowClick = (row) => {
    navigate(`/reposiciones/${row.id}`);
  };

  return (
    <Container>
      <TableInputSearch
        value={searchValue}
        onChange={handleSearchChange}
        placeholder="Buscar por operario"
      />

      <DataTable
        columns={columnsRestitutionWhitdrawal}
        data={filteredData}
        customStyles={customStyles}
        noDataComponent="No hay retiros"
        highlightOnHover
        dense
        pagination
        onRowClicked={handleRowClick}
        paginationComponentOptions={{
          rowsPerPageText: "Filas por página",
          rangeSeparatorText: "de",
        }}
      />
    </Container>
  );
};
