import { useDeliveryNoteContext } from "../../../context";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { SimpleDataTable } from "../../../components";
import { SelectedProductsTable } from "./components/SelectedProductTable";
import { Container } from "../../../styled-components";
import { createDeliveryNote } from "../../../services";

export const NewDeliveryNote = () => {
  const { order, products, clearDeliveryNote } = useDeliveryNoteContext();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [deliveryNoteNumber, setDeliveryNoteNumber] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!order && location.pathname === "/remito") {
      navigate("/ordenes", { replace: true });
    }
  }, [order, location, navigate]);

  if (!order) return null;

  const handleSelectProduct = (product) => {
    // evitar duplicados
    if (!selectedProducts.find((p) => p.id === product.id)) {
      setSelectedProducts([
        ...selectedProducts,
        { ...product, quantityToLoad: 1 },
      ]);
    }
  };

  const handleQuantityChange = (id, value) => {
    setSelectedProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantityToLoad: Number(value) } : p
      )
    );
  };

  const handleSave = async () => {
    const payload = {
      orderNumber: order.number,
      deliveryNoteNumber,
      products: selectedProducts.map((p) => ({
        id: p.id,
        quantity: p.quantityToLoad,
      })),
    };

    await createDeliveryNote(
      payload.orderNumber,
      payload.deliveryNoteNumber,
      payload.products
    );

    clearDeliveryNote();
    navigate(`/ordenes/${order.id}`);
  };

  return (
    <Container>
      <h2>Nuevo Remito para orden {order.number}</h2>
      <h3>Seleccioná los productos a cargar:</h3>
      <SimpleDataTable data={products} onRowClick={handleSelectProduct} />

      <label>
        Número de remito:
        <input
          type="text"
          value={deliveryNoteNumber}
          onChange={(e) => setDeliveryNoteNumber(e.target.value)}
          required
        />
      </label>

      <h3>Productos seleccionados:</h3>
      <SelectedProductsTable
        products={selectedProducts}
        onQuantityChange={handleQuantityChange}
        onRemove={(id) =>
          setSelectedProducts((prev) => prev.filter((p) => p.id !== id))
        }
      />

      <button onClick={handleSave}>Guardar Remito</button>
    </Container>
  );
};
