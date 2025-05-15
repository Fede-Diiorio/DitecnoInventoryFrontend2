import { useState, useRef, useEffect } from "react";
import classes from "./CreateOrder.module.scss";
import { useSupplierSelector } from "../../../../hooks";
import { Container } from "../../../../styled-components";
import { OrderProductsTable } from "./components";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components";
import { addProduct, createNewOrder } from "./utilities/componentFunctions";

export const CreateOrder = () => {
  const selectedSupplier = useSupplierSelector();

  const [products, setProducts] = useState([]);
  const [codeInput, setCodeInput] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (selectedSupplier && inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedSupplier]);

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

  const handleCrateOrder = async () => {
    await createNewOrder(selectedSupplier, products);
    navigate("/ordenes");
  };

  if (!selectedSupplier)
    return (
      <Container>
        <p style={{ marginTop: "1rem" }}>Esperando selección de proveedor...</p>
      </Container>
    );

  return (
    <section className={classes.container}>
      <h2>Crear Orden</h2>

      <Container>
        <div className={classes.supplierInfo}>
          {selectedSupplier && (
            <p>Proveedor seleccionado: {selectedSupplier}</p>
          )}

          <form
            className={classes.inputGroup}
            onSubmit={(e) => {
              e.preventDefault();
              handleAddProduct();
              inputRef.current?.focus();
            }}
          >
            <input
              type="text"
              ref={inputRef}
              value={codeInput}
              onChange={handleInputChange}
              placeholder="Ingresá el código del producto"
            />
            <button type="submit">Agregar</button>
          </form>
        </div>

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
