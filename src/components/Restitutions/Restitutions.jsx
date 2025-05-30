import { useFetch } from "../../hooks";
import { getAllRestitutions } from "../../services";
import classes from "./Restitutions.module.scss";
import { RestitutionsContainer } from "./components/RestitutionsContainer";

export const Restitutions = () => {
  const { data: restitutions, loading, error } = useFetch(getAllRestitutions);

  if (loading) return <h3>Cargando...</h3>;

  if (error) return <h3>Acceso denegado</h3>;

  return (
    <div className={classes.box}>
      <h3>Reposiciones de Material</h3>
      <RestitutionsContainer restitutions={restitutions} />
    </div>
  );
};
