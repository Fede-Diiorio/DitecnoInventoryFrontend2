import { useCallback, useState, useEffect } from "react";
import { SupplierForm } from "../../components";
import { Container } from "../../../../styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../../../components";
import { getSupplierByName } from "../../../../services";
import { useFetch } from "../../../../hooks";
import classes from "./UpdateSupplier.module.scss";
import { UpdateSupplierButton } from "./components/UpdateSupplierButton";

export const UpdateSupplier = () => {
  const { supplierName } = useParams();
  const fetchSupplier = useCallback(
    () => getSupplierByName(supplierName),
    [supplierName]
  );

  const { data: supplier, loading, error } = useFetch(fetchSupplier);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    discount: 0,
    nestedDiscount: 0,
    exchangeRate: "Dolar",
  });

  useEffect(() => {
    if (supplier) {
      setFormData({
        id: supplier.id || null,
        name: supplier.name || "",
        discount: supplier.discount || 0,
        nestedDiscount: supplier.nested_discount || 0,
        exchangeRate: supplier.exchange_rate || "Dolar",
      });
    }
  }, [supplier]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) return <h2>Cargando</h2>;
  if (error) return <h2>Hubo un error</h2>;

  return (
    <Container>
      <h3>Actualizar proveedor</h3>
      <div className={classes.frame}>
        <SupplierForm formData={formData} handleChange={handleChange} />
        <div className={classes.buttons}>
          <Button label={"volver"} parentMethod={() => navigate(-1)} />
          <UpdateSupplierButton supplierInfo={formData} />
        </div>
      </div>
    </Container>
  );
};
