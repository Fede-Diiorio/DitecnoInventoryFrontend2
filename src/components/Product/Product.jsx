import { useCallback, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks";
import { getProductById } from "../../services";
import { Container } from "../../styled-components";
import classes from "./Product.module.scss";
import { Button } from "../../components";

export const Product = () => {
  const { productId } = useParams();
  const fetchProduct = useCallback(
    () => getProductById(productId),
    [productId]
  );

  const { data: product, loading, error } = useFetch(fetchProduct);

  const [formData, setFormData] = useState({
    code: "",
    description: "",
    stock: 0,
    stock_alert: 0,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        code: product.code || "",
        description: product.description || "",
        stock: product.stock || 0,
        stock_alert: product.stock_alert || 0,
      });
    }
  }, [product]);

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("DATOS:", formData);
      // ACÁ VA A IR EL CONTENIDO PARA ACTUALIZAR EL PRODUCTO
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) return <h2>Cargando...</h2>;
  if (error) return <h2>Acceso denegado</h2>;

  console.log(product);

  return (
    <Container>
      <h2>Detalles del Producto</h2>
      <form className={classes.productForm}>
        <div className={classes.discButton}>
          <Button label={"Descontinuar producto"} />
        </div>

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
        <div className={classes.buttons}>
          <Button label={"Volver"} parentMethod={() => navigate(-1)} />
          <Button label={"Guardar Cambios"} parentMethod={handleFormSubmit} />
        </div>
      </form>
    </Container>
  );
};
