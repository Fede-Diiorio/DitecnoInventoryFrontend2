import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { TableInputSearch } from "../../../../components"; // tu input personalizado
import { withdrawalColumns } from "./utilities/dataTableUtilities";
import { customStyles } from "../../../../utilities";
import { Container } from "../../../../styled-components";

export const WithdrawalsContainer = ({ withdrawals }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (Array.isArray(withdrawals)) setFilteredData(withdrawals);
  }, [withdrawals]);

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);
    const filtered = withdrawals.filter((item) =>
      `${item.name} ${item.lastname}`.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  const handleRowClick = (row) => {
    navigate(`/retiros/${row.id}`);
  };

  return (
    <Container>
      <TableInputSearch
        value={searchValue}
        onChange={handleSearchChange}
        placeholder="Buscar por operario"
      />
      <DataTable
        columns={withdrawalColumns}
        data={filteredData}
        customStyles={customStyles}
        noDataComponent="No hay retiros"
        highlightOnHover
        dense
        pagination
        onRowClicked={handleRowClick}
      />
    </Container>
  );
};
