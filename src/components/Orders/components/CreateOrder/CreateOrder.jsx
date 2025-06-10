import { useState, useRef, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Container } from "../../../../styled-components";
import { addProduct } from "./utilities/componentFunctions";
import {
  columnsForCreateOrder,
  formatCurrency,
  customStyles,
} from "../../../../utilities";
import classes from "./CreateOrder.module.scss";
import Swal from "sweetalert2";
import { getAllSuppliers, getSupplierByName } from "../../../../services";
import { CreateOrderButton } from "./components/CreateOrderButton";

export const CreateOrder = () => {
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [products, setProducts] = useState([]);
  const [codeInput, setCodeInput] = useState("");
  const [exchangeRate, setExchangeRate] = useState("1");
  const [discount, setDiscount] = useState(0);
  const [nestedDiscount, setNestedDiscount] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchAndSelect = async () => {
      try {
        const suppliers = await getAllSuppliers();

        if (suppliers && suppliers.length > 0) {
          const { value, isConfirmed } = await Swal.fire({
            title: "Seleccioná un proveedor",
            input: "select",
            inputOptions: suppliers.reduce((acc, s) => {
              acc[s.id] = s.name;
              return acc;
            }, {}),
            inputPlaceholder: "Seleccioná un proveedor",
            showCancelButton: true,
          });

          if (isConfirmed) {
            const selected = suppliers.find((s) => s.id === Number(value));
            setSelectedSupplier(selected?.name || null);

            const supplier = await getSupplierByName(selected.name);

            setDiscount(supplier.discount);
            setNestedDiscount(supplier.nested_discount);
          }
        }
      } catch (error) {
        console.error("Error al obtener proveedores:", error);
      }
    };

    fetchAndSelect();
  }, []);

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

  const baseTotal = products.reduce(
    (acc, p) => acc + p.price * (p.quantityToLoad || 1),
    0
  );

  const discountedTotal =
    baseTotal * (1 - discount / 100) * (1 - nestedDiscount / 100);

  const discountedTotalArs = discountedTotal * exchangeRate;

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
        <div className={classes.commands}>
          <div className={classes.supplierAndCode}>
            <p>Proveedor seleccionado: {selectedSupplier}</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddProduct();
                inputRef.current?.focus();
              }}
              className={classes.codeForm}
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

          <div className={classes.controlsRow}>
            <div className={classes.discountControls}>
              <label>
                Tipo de cambio:
                <input
                  type="number"
                  step={0.01}
                  value={exchangeRate}
                  onChange={(e) => setExchangeRate(e.target.value)}
                />
              </label>
              <label>
                Descuento:
                <input
                  type="number"
                  step="1"
                  value={discount}
                  onChange={(e) => setDiscount(parseInt(e.target.value) || 0)}
                />
              </label>
              <label>
                Descuento anidado:
                <input
                  type="number"
                  step="1"
                  value={nestedDiscount}
                  onChange={(e) =>
                    setNestedDiscount(parseInt(e.target.value) || 0)
                  }
                />
              </label>
            </div>
          </div>
          <div className={classes.totalGroup}>
            <span>Total: {formatCurrency(discountedTotal)}</span>
            <span>Total ARS: {formatCurrency(discountedTotalArs)}</span>
          </div>
        </div>

        <DataTable
          data={products}
          columns={columnsForCreateOrder(handleQuantityChange, (id) =>
            setProducts((prev) => prev.filter((p) => p.id !== id))
          )}
          noDataComponent="La orden no tiene productos"
          dense
          highlightOnHover
          customStyles={customStyles}
        />

        <CreateOrderButton supplier={selectedSupplier} products={products} />
      </Container>
    </section>
  );
};
