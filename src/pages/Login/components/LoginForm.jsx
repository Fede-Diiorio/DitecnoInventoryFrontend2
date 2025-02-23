import classes from "./LoginFrom.module.scss";
import { CommandForm } from "../../../components";
import { authUserByCode } from "../../../services";
import { AuthContext } from "../../../context";
import { useContext, useState } from "react";
import { useAutoFocus } from "../../../hooks";

export const LoginFrom = () => {
  const [code, setCode] = useState("");
  const { login } = useContext(AuthContext);
  const inputRef = useAutoFocus();

  const handleInputChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    inputRef.current?.focus();
    const response = await authUserByCode(code);
    login(response.token);
  };

  return (
    <CommandForm
      legend={"Ingrese su código de usuario para continuar"}
      onSubmit={handleSubmit}
      label={"Ingresar"}
    >
      <input
        ref={inputRef}
        type="password"
        placeholder="Código de Usuario"
        value={code}
        onChange={handleInputChange}
        className={classes.input}
      />
    </CommandForm>
  );
};
