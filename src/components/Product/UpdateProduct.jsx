import { useCallback, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks";
import { getProductById } from "../../services";
import { Container, FlexContainerRow } from "../../styled-components";
import classes from "./Product.module.scss";
import { Button } from "../../components";
import {
  ProductStatusButton,
  UpdateProductButton,
  ProductForm,
} from "./components";

export const UpdateProduct = () => {
  const { productId } = useParams();
  const fetchProduct = useCallback(
    () => getProductById(productId),
    [productId]
  );

  const { data: product, loading, error } = useFetch(fetchProduct);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    code: "",
    description: "",
    stock: 0,
    stock_alert: 0,
    price: 1,
    supplier: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        code: product.code || "",
        description: product.description || "",
        stock: product.stock || 0,
        stock_alert: product.stockAlert || 0,
        price: product.price || 1,
        supplier: product.supplier || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) return <h2>Cargando...</h2>;
  if (error) return <h2>Acceso denegado</h2>;

  return (
    <Container>
      <div className={classes.frame}>
        <h3>Actualizar producto</h3>

        <ProductForm formData={formData} handleChange={handleChange} />
        <FlexContainerRow className={classes.buttons}>
          <Button label={"Volver"} parentMethod={() => navigate(-1)} />
          <UpdateProductButton productId={productId} productInfo={formData} />
        </FlexContainerRow>
      </div>
    </Container>
  );
};
