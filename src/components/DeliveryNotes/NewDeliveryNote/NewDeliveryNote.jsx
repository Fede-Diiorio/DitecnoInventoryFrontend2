import { useDeliveryNoteContext } from "../../../context";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { SimpleDataTable, Button } from "../../../components";
import { SelectedProductsTable } from "./components/SelectedProductTable";
import { Container } from "../../../styled-components";
import { createDeliveryNote } from "../../../services";
import { getPendingQuantities } from "../../../utilities";
import { toast } from "react-toastify";

export const NewDeliveryNote = () => {
  const { order, products, clearDeliveryNote, deliveryNotes } =
    useDeliveryNoteContext();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [deliveryNoteNumber, setDeliveryNoteNumber] = useState("");
  const navigate = useNavigate();

  const productsWithPending = useMemo(() => {
    return getPendingQuantities(products, deliveryNotes);
  }, [products, deliveryNotes]);

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
    const pendingMap = getPendingQuantities(products, deliveryNotes).reduce(
      (acc, p) => ({ ...acc, [p.id]: p.pending }),
      {}
    );

    for (const product of selectedProducts) {
      if (product.quantityToLoad > pendingMap[product.id]) {
        toast.error(
          `La cantidad ingresada de "${
            product.name
          }" supera la cantidad pendiente (${pendingMap[product.id]}).`
        );
        return;
      }
    }

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
      <SimpleDataTable
        data={productsWithPending}
        onRowClick={handleSelectProduct}
      />

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

      <Button label="Guardar Remito" parentMethod={handleSave} />
    </Container>
  );
};
