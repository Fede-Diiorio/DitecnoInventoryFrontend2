import classes from "./Product.module.scss";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks";
import { getProductById } from "../../services";
import { Container } from "../../styled-components";
import { useCallback } from "react";

export const Product = () => {
  const { productId } = useParams();
  const fetchProduct = useCallback(
    () => getProductById(productId),
    [productId]
  );
  const { data: product, loading, error } = useFetch(fetchProduct);

  if (loading) return <h2>Cargando...</h2>;
  if (error) return <h2>Acceso denegado</h2>;

  console.log(product);

  return (
    <Container>
      <h2>Probando mi amor por yi</h2>
    </Container>
  );
};
