import classes from "./Product.module.scss";
import { Button } from "../../components";
import { ProductForm, CreateProductButton } from "./components";
import { Container, FlexContainerRow } from "../../styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateProduct = () => {
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    stock: 0,
    stock_alert: 0,
    supplierName: "",
    price: 1,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container>
      <div className={classes.frame}>
        <h3>Crear producto</h3>
        <ProductForm formData={formData} handleChange={handleChange} />
        <FlexContainerRow className={classes.buttons}>
          <Button label={"Volver"} parentMethod={() => navigate(-1)} />
          <CreateProductButton productInfo={formData} />
        </FlexContainerRow>
      </div>
    </Container>
  );
};
