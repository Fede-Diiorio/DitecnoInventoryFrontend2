import { useState } from "react";
import classes from "./AddUser.module.scss";
import { UserForm } from "../../components";
import { AddUserButton } from "./components";

export const AddUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    code: "",
    role: "user",
    email: "",
    password: "",
  });

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
        <AddUserButton userInfo={formData} />
      </div>
    </div>
  );
};
