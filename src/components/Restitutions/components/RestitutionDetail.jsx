import { getRestitutionById } from "../../../services";
import { useFetch } from "../../../hooks";
import { useParams, useNavigate } from "react-router-dom";
import { Container } from "../../../styled-components";
import {
  formatDate,
  formatTime,
  columnsForInventory,
  customStyles,
} from "../../../utilities";
import { Button } from "../../../components";
import classes from "./RestitutionDetail.module.scss";
import DataTable from "react-data-table-component";
import { useCallback } from "react";

export const RestitutionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(-1);
  };

  const asyncFunction = useCallback(() => getRestitutionById(id), [id]);
  const { data, loading, error } = useFetch(asyncFunction);

  if (loading) return <h3>Cargando...</h3>;

  if (error) return <h3>Acceso denegado</h3>;

  const products = data.products;
  const { name, lastname, date } = data.restitution;

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
