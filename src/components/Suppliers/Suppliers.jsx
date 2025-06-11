import classes from "./Suppliers.module.scss";
import { Container } from "../../styled-components";
import { FileUploader, AddSupplier, SuppliersList } from "./components";

export const Suppliers = () => {
  return (
    <section className={classes.box}>
      <h3>Proveedores</h3>
      <Container>
        <div className={classes.container}>
          <div className={classes.addSupplier}>
            <h4>Agregar un nuevo proveedor:</h4>
            <AddSupplier />
          </div>
          <div>
            <FileUploader />
            <SuppliersList />
          </div>
        </div>
      </Container>
    </section>
  );
};
