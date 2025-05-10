import { getWithdrawalById } from "../../../../services/WithdrawalsManager";
import { useAsync } from "../../../../hooks";
import { useParams, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { Container } from "../../../../styled-components";
import {
  formatDate,
  formatTime,
  columnsForInventory,
  customStyles,
} from "../../../../utilities";
import { Button } from "../../../../components";
import classes from "./WithdrawalDetail.module.scss";
import DataTable from "react-data-table-component";

export const WithdrawalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(-1);
  };
  const fetchWithdrawal = useCallback(() => getWithdrawalById(id), [id]);
  const { data, loading, error } = useAsync(fetchWithdrawal);

  if (loading) return <h3>Cargando...</h3>;

  if (error) return <h3>Ups! Ocurrió un error</h3>;

  const products = data.products;
  const { name, lastname, date } = data.withdrawal;

  return (
    <Container>
      <section className={classes.box}>
        <div className={classes.userInfo}>
          <p>
            <span>Nombre: </span>
            {name} {lastname}
          </p>
          <p>
            <span>Fecha: </span> {formatDate(date)}
          </p>
          <p>
            <span>Hora: </span> {formatTime(date)}
          </p>
          <h4>Productos: </h4>
        </div>

        <DataTable
          data={products}
          columns={columnsForInventory}
          customStyles={customStyles}
        />
        <Button label={"Volver"} parentMethod={handleNavigate} />
      </section>
    </Container>
  );
};
