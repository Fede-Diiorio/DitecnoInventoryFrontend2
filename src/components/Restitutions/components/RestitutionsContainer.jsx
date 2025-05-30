import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { TableInputSearch, Button } from "../../../components";
import { customStyles, columnsRestitutionWhitdrawal } from "../../../utilities";
import { Container, FlexContainerRow } from "../../../styled-components";

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
    navigate(`/movimientos/reposiciones/${row.id}`);
  };

  return (
    <Container>
      <FlexContainerRow>
        <TableInputSearch
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Buscar por operario"
        />
        <Button
          label={"Retiros"}
          parentMethod={() => navigate("/movimientos/retiros")}
        />
      </FlexContainerRow>

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
