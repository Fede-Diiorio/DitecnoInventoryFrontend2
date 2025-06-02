import { useState } from "react";
import { createSupplier } from "../../../services";
import classes from "./AddSupplier.module.scss";
import { Button } from "../../../components";
import { toast } from "react-toastify";

export const AddSupplier = ({ onRefresh }) => {
  const [supplierName, setSupplierName] = useState("");
  const [discount, setDiscount] = useState(0);
  const [nestedDiscount, setNestedDiscount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState("Dolar");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!supplierName.trim()) return;

    await createSupplier(
      supplierName,
      Number(discount),
      Number(nestedDiscount),
      exchangeRate
    );

    setSupplierName("");
    setDiscount(0);
    setNestedDiscount(0);
    setExchangeRate("Dolar");
    onRefresh();
  };

  return (
    <form className={classes.form}>
      <h4>Agregar un nuevo proveedor:</h4>
      <div className={classes.formGroup}>
        <label>
          Nombre del proveedor:
          <input
            type="text"
            placeholder="Proveedor S.A."
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
          />
        </label>

        <label>
          Descuento (%):
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            min={0}
            max={100}
          />
        </label>

        <label>
          Descuento anidado (%):
          <input
            type="number"
            value={nestedDiscount}
            onChange={(e) => setNestedDiscount(e.target.value)}
            min={0}
            max={100}
          />
        </label>

        <label>
          Tipo de cambio:
          <select
            value={exchangeRate}
            onChange={(e) => setExchangeRate(e.target.value)}
          >
            <option value="Dolar">Dólar</option>
            <option value="Euro">Euro</option>
            <option value="ARS">ARS</option>
          </select>
        </label>

        <div>
          <Button label={"Agregar"} parentMethod={handleSubmit} />
        </div>
      </div>
    </form>
  );
};
