import { useState } from "react";
import classes from "./AddUser.module.scss";
import { UserForm } from "../../components";
import { AddUserButton } from "./components";

export const AddUser = () => {
  const initialState = {
    name: "",
    lastname: "",
    code: "",
    role: "user",
  };

  const [formData, setFormData] = useState(initialState);

  const resetForm = () => setFormData(initialState);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={classes.frame}>
      <UserForm formData={formData} handleChange={handleChange} />
      <div className={classes.button}>
        <AddUserButton userInfo={formData} resetForm={resetForm} />
      </div>
    </div>
  );
};
