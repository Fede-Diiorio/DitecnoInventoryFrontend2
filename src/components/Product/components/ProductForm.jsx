import classes from "../Product.module.scss";
import { getAllSuppliers } from "../../../services";
import { useFetch } from "../../../hooks";

export const ProductForm = ({ formData, handleChange }) => {
  const { data: suppliers, loading, error } = useFetch(getAllSuppliers);

  if (loading) return <h2>Cargando</h2>;
  if (error) return <h2>Hubo un error</h2>;

  return (
    <form>
      <div className={classes.fields}>
        <label htmlFor="code">Código:</label>
        <input
          type="text"
          id="code"
          name="code"
          value={formData.code}
          onChange={handleChange}
          required
        />
        <label htmlFor="description">Descripción:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <label htmlFor="stock">Stock:</label>
        <input
          type="number"
          id="stock"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          required
        />
        <label htmlFor="stock_alert">Alerta de Stock:</label>
        <input
          type="number"
          id="stock_alert"
          name="stock_alert"
          value={formData.stock_alert}
          onChange={handleChange}
          required
        />
        <label htmlFor="price">Precio: </label>
        <input
          type="number"
          id="price"
          name="price"
          step={0.001}
          min={0.01}
          value={formData.price}
          onChange={handleChange}
          required
        />
        <label htmlFor="supplier">Proveedor:</label>
        <select
          id="supplier"
          name="supplier"
          value={formData.supplier}
          onChange={handleChange}
        >
          <option value="">Selecciona un proveedor</option>
          {suppliers.map((supplier) => (
            <option key={supplier.id} value={supplier.name}>
              {supplier.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};
