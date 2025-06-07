import { useState } from "react";
import classes from "./AddSupplier.module.scss";
import { SupplierForm } from "../../components";
import { AddSupplierButton } from "./components";

export const AddSupplier = () => {
  const initialState = {
    name: "",
    discount: 0,
    nestedDiscount: 0,
    exchangeRate: "Dolar",
  };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => setFormData(initialState);

  return (
    <div className={classes.frame}>
      <SupplierForm formData={formData} handleChange={handleChange} />
      <div className={classes.button}>
        <AddSupplierButton supplierInfo={formData} resetForm={resetForm} />
      </div>
    </div>
  );
};
