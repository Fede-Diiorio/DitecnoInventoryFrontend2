import { useState } from "react";
import { createSupplier } from "../../../services";

export const AddSupplier = ({ onRefresh }) => {
  const [supplierName, setSupplierName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!supplierName.trim()) return;

    await createSupplier(supplierName);

    setSupplierName("");
    onRefresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Agregar un nuevo proveedor:</h4>
      <input
        type="text"
        placeholder="Nombre del proveedor"
        value={supplierName}
        onChange={(e) => setSupplierName(e.target.value)}
      />
      <button type="submit">Agregar</button>
    </form>
  );
};
