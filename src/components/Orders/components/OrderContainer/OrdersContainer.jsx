import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Container } from "../../../../styled-components";
import { TableInputSearch, Button } from "../../../../components";
import { useNavigate } from "react-router-dom";
import { customStyles, ordersColumns } from "../../../../utilities";
import classes from "./OrdersContainer.module.scss";

export const OrdersContainer = ({ orders }) => {
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleRowClick = (row) => {
    navigate(`/ordenes/${row.id}`);
  };

  const handleNavigateOrder = () => {
    navigate("/ordenes/crear");
  };

  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);

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
        <div className={classes.box}>
          <TableInputSearch
            value={searchValue}
            onChange={handleSearchChange}
            placeholder={"Buscar por usuario o número de orden"}
          />
          <div className={classes.buttonBox}>
            <Button label="Crear orden" parentMethod={handleNavigateOrder} />
            <Button
              label="Materiales pendientes"
              parentMethod={() => navigate("/ordenes/pendientes")}
            />
            <Button label={"Ordenes completas"} />
          </div>
        </div>

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
