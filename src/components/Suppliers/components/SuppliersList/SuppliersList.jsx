import { getAllSuppliers } from "../../../../services";
import { useFetch } from "../../../../hooks";
import { useReload } from "../../../../context";
import classes from "./SuppliersList.module.scss";
import { Button } from "../../../../components";
import { useNavigate } from "react-router-dom";
import { FlexContainerRow } from "../../../../styled-components";

export const SuppliersList = () => {
  const { reloadFlag } = useReload();
  const {
    data: suppliers,
    loading,
    error,
  } = useFetch(getAllSuppliers, [reloadFlag]);

  const navigate = useNavigate();

  if (loading) return <h2>Cargando</h2>;
  if (error) return <h2>Hubo un error</h2>;

  return (
    <div className={classes.box}>
      <h4>Proveedores registrados:</h4>
      {suppliers.map((p) => (
        <FlexContainerRow key={p.id} className={classes.info}>
          <p>{p.name}</p>
          <Button
            label={"Editar"}
            parentMethod={() => navigate(`/proveedores/${p.name}`)}
          />
        </FlexContainerRow>
      ))}
    </div>
  );
};
