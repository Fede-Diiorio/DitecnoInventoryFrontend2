import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Container } from "../../../../styled-components";
import { TableInputSearch } from "../../../../components";
import { ordersColumns, customStyles } from "./utilities/dataTableUtilities";
import { useNavigate } from "react-router-dom";

export const OrdersContainer = ({ orders }) => {
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleRowClick = (row) => {
    navigate(`/ordenes/${row.id}`);
  };

  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);

  console.log(orders[0]);

  const handleSearchChange = (e) => {
    const input = e.target.value.toLowerCase();
    setSearchValue(input);
    const filtered = orders.filter(
      (order) =>
        `${order.user_name} ${order.user_lastname}`
          .toLowerCase()
          .includes(input) ||
        (order.order_number && order.order_number.toLowerCase().includes(input))
    );
    setFilteredOrders(filtered);
  };

  return (
    <Container>
      <section>
        <TableInputSearch
          value={searchValue}
          onChange={handleSearchChange}
          placeholder={"Buscar por usuario o número de orden"}
        />
        <DataTable
          columns={ordersColumns}
          data={filteredOrders}
          customStyles={customStyles}
          noDataComponent="No se encontraron órdenes"
          pagination
          highlightOnHover
          dense
          onRowClicked={handleRowClick}
          paginationComponentOptions={{
            rowsPerPageText: "Filas por página",
            rangeSeparatorText: "de",
          }}
        />
      </section>
    </Container>
  );
};
