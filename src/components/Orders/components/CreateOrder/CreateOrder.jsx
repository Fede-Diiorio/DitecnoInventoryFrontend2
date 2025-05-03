import { useState, useEffect } from "react";
import classes from "./CreateOrder.module.scss";
import {
  getAllSuppliers,
  getProductByCodeAndSupplier,
  createOrder,
} from "../../../../services";
import { useFetch } from "../../../../hooks";
import Swal from "sweetalert2";
import { Container } from "../../../../styled-components";
import { OrderProductsTable } from "./components";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components";

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
    if (!codeInput.trim()) return;

    try {
      const product = await getProductByCodeAndSupplier(
        codeInput.trim(),
        selectedSupplier
      );

      if (product) {
        setProducts((prev) => {
          const existingProduct = prev.find((p) => p.id === product.id);

          if (existingProduct) {
            return prev.map((p) =>
              p.id === product.id
                ? { ...p, quantityToLoad: (p.quantityToLoad || 1) + 1 }
                : p
            );
          }

          // Asegurar que quantityToLoad comience en 1 si es nuevo
          return [...prev, { ...product, quantityToLoad: 1 }];
        });

        setCodeInput("");
      } else {
        Swal.fire("Error", "Producto no encontrado", "error");
      }
    } catch (error) {
      Swal.fire("Error", "No se pudo obtener el producto", "error");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddProduct();
    }
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
    const payload = {
      supplier: selectedSupplier,
      products: products.map((p) => ({
        id: p.id,
        quantity: p.quantityToLoad,
      })),
    };

    console.log(payload);
    await createOrder(payload.products, payload.supplier);
    navigate("/ordenes");
  };

  if (supplierLoading) return <h2>Cargando...</h2>;
  if (supplierError) return <h2>Ha ocurrido un error</h2>;

  return (
    <section className={classes.container}>
      <h2>Crear Orden</h2>

      <Container>
        {selectedSupplier && <p>Proveedor seleccionado: {selectedSupplier}</p>}

        <div className={classes.inputGroup}>
          <input
            type="text"
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ingresá el código del producto"
          />
          <button onClick={handleAddProduct}>Agregar</button>
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
