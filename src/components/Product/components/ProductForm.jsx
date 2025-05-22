import classes from "../Product.module.scss";

export const ProductForm = ({ formData, handleChange }) => {
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
      </div>
    </form>
  );
};
