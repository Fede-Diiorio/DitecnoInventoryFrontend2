import { useState, useEffect } from "react";
import classes from "./CreateOrder.module.scss";
import { getAllSuppliers } from "../../../../services";
import { useFetch } from "../../../../hooks";
import Swal from "sweetalert2";
import { Container } from "../../../../styled-components";
import { OrderProductsTable } from "./components";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components";
import { addProduct, createNewOrder } from "./utilities/componentFunctions";

export const CreateOrder = () => {
  const {
    data: suppliers,
    supplierLoading,
    supplierError,
  } = useFetch(getAllSuppliers);

  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [products, setProducts] = useState([]);
  const [codeInput, setCodeInput] = useState("");
  const navigate = useNavigate();

  const handleAddProduct = async () => {
    addProduct(codeInput, selectedSupplier, setProducts);
    setCodeInput("");
  };

  const handleInputChange = (e) => {
    setCodeInput(e.target.value);
  };

  const handleQuantityChange = (id, value) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantityToLoad: Number(value) } : p
      )
    );
  };

  useEffect(() => {
    if (suppliers && suppliers.length > 0) {
      Swal.fire({
        title: "Seleccioná un proveedor",
        input: "select",
        inputOptions: suppliers.reduce((acc, supplier) => {
          acc[supplier.id] = supplier.name;
          return acc;
        }, {}),
        inputPlaceholder: "Seleccioná un proveedor",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          const chosen = suppliers.find((s) => s.id === Number(result.value));
          if (chosen) {
            setSelectedSupplier(chosen.name);
          }
        }
      });
    }
  }, [suppliers]);

  const handleCrateOrder = async () => {
    await createNewOrder(selectedSupplier, products);
    navigate("/ordenes");
  };

  if (supplierLoading) return <h2>Cargando...</h2>;
  if (supplierError) return <h2>Ha ocurrido un error</h2>;

  return (
    <section className={classes.container}>
      <h2>Crear Orden</h2>

      <Container>
        {selectedSupplier && <p>Proveedor seleccionado: {selectedSupplier}</p>}

        <form
          className={classes.inputGroup}
          onSubmit={(e) => {
            e.preventDefault();
            handleAddProduct();
          }}
        >
          <input
            type="text"
            value={codeInput}
            onChange={handleInputChange}
            placeholder="Ingresá el código del producto"
          />
          <button type="submit">Agregar</button>
        </form>

        <OrderProductsTable
          products={products}
          onQuantityChange={handleQuantityChange}
          onRemove={(id) =>
            setProducts((prev) => prev.filter((p) => p.id !== id))
          }
        />

        <Button label="Crear orden" parentMethod={handleCrateOrder} />
      </Container>
    </section>
  );
};
