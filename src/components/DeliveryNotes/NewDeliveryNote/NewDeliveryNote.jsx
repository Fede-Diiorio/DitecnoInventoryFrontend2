import { useDeliveryNoteContext } from "../../../context";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { SimpleDataTable } from "../../../components";
import { SelectedProductsTable } from "./components/SelectedProductTable";

export const NewDeliveryNote = () => {
  const { order, products, clearDeliveryNote } = useDeliveryNoteContext();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigate = useNavigate();

  const handleSelectProduct = (product) => {
    // evitar duplicados
    if (!selectedProducts.find((p) => p.id === product.id)) {
      setSelectedProducts([
        ...selectedProducts,
        { ...product, quantityToLoad: 0 },
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

  const handleSave = () => {
    // Acá podés hacer el post a tu backend
    console.log("Remito a guardar:", selectedProducts);
    clearDeliveryNote();
    navigate("/remitos");
  };

  if (!order) return <p>No hay datos de remito cargados.</p>;

  return (
    <div>
      <h2>Nuevo Remito para orden {order.number}</h2>
      <h3>Seleccioná los productos a cargar:</h3>
      <SimpleDataTable data={products} onRowClick={handleSelectProduct} />

      <h3>Productos seleccionados:</h3>
      <SelectedProductsTable
        products={selectedProducts}
        onQuantityChange={handleQuantityChange}
        onRemove={(id) =>
          setSelectedProducts((prev) => prev.filter((p) => p.id !== id))
        }
      />

      <button onClick={handleSave}>Guardar Remito</button>
    </div>
  );
};
