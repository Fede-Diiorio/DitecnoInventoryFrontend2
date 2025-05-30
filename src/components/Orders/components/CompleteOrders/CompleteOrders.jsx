import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Container } from "../../../../styled-components";
import { TableInputSearch, Button } from "../../../../components";
import { getAllCompleteOrders } from "../../../../services";
import { useFetch } from "../../../../hooks";
import { customStyles, ordersColumns } from "../../../../utilities";
import classes from "../../Orders.module.scss";

export const CompleteOrders = () => {
  const { data: orders, error, loading } = useFetch(getAllCompleteOrders);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (orders) setFilteredOrders(orders);
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

  const handleRowClick = (row) => {
    navigate(`/ordenes/${row.id}`);
  };

  if (loading) return <h3>Cargando...</h3>;
  if (error) return <h3>Acceso denegado</h3>;

  return (
    <div className={classes.box}>
      <h3>Ordenes Completas</h3>
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

        <Button label={"Volver"} parentMethod={() => navigate(-1)} />
      </Container>
    </div>
  );
};
