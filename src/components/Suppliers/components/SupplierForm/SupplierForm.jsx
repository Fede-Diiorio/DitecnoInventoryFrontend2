import classes from "./SupplierForm.module.scss";

export const SupplierForm = ({ formData, handleChange }) => {
  return (
    <form className={classes.form}>
      <div className={classes.formGroup}>
        <label>
          Nombre del proveedor:
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Proveedor S.A."
            value={formData.name}
            onChange={handleChange}
          />
        </label>

        <label>
          Descuento (%):
          <input
            type="number"
            id="discount"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            min={0}
            max={100}
          />
        </label>

        <label>
          Descuento anidado (%):
          <input
            type="number"
            id="nestedDiscount"
            name="nestedDiscount"
            value={formData.nestedDiscount}
            onChange={handleChange}
            min={0}
            max={100}
          />
        </label>

        <label>
          Tipo de cambio:
          <select
            value={formData.exchangeRate}
            onChange={handleChange}
            id="exchangeRate"
            name="exchangeRate"
          >
            <option value="Dolar">Dólar</option>
            <option value="Euro">Euro</option>
            <option value="ARS">ARS</option>
          </select>
        </label>
      </div>
    </form>
  );
};
