import classes from "./LoginFrom.module.scss";
import { CommandForm } from "../../../components";
import { authUserByCode } from "../../../services";
import { AuthContext } from "../../../context";
import { useContext, useState } from "react";
import { useAutoFocus } from "../../../hooks";

export const LoginFrom = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);
  const { login, userInfo } = useContext(AuthContext);
  const inputRef = useAutoFocus();

  const handleInputChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    inputRef.current?.focus();
    setError(null); // Limpiar error antes de intentar autenticar

    try {
      const response = await authUserByCode(code);

      if (response.error) {
        throw new Error(response.message);
      }

      userInfo(response.userInfo.user);
      login(response.userInfo.token);
    } catch (error) {
      setError(error.message);
    }
    setCode("");
  };

  return (
    <CommandForm
      legend={"Ingrese su código de usuario para continuar"}
      onSubmit={handleSubmit}
      label={"Ingresar"}
      error={error}
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
