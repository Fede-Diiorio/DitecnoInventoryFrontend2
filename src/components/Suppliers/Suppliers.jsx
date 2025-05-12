import { getAllSuppliers } from "../../services";
import { useFetch, useReload } from "../../hooks";
import classes from "./Suppliers.module.scss";
import { Container } from "../../styled-components";
import { FileUploader, AddSupplier } from "./components";

export const Suppliers = () => {
  const { reloadFlag, reload } = useReload();
  const {
    data: suppliers,
    loading,
    error,
  } = useFetch(getAllSuppliers, [reloadFlag]);

  if (loading) return <h2>Cargando</h2>;
  if (error) return <h2>Hubo un error</h2>;

  return (
    <section>
      <h2>Proveedores</h2>
      <Container>
        <div className={classes.box}>
          <h4>Proveedores registrados:</h4>
          {suppliers.map((p) => (
            <p key={p.id}>{p.name}</p>
          ))}
        </div>
        <FileUploader />
        <AddSupplier onRefresh={reload} />
      </Container>
    </section>
  );
};
