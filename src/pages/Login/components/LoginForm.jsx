import classes from "./LoginFrom.module.scss";
import { Button } from "../../../components";
import { FlexContainerColumn } from "../../../styled-components";
import { authUserByCode } from "../../../services";
import { AuthContext } from "../../../context";
import { useContext, useState } from "react";
import { useAutoFocus } from "../../../hooks";

export const LoginFrom = () => {
  const [code, setCode] = useState("");
  const { login, userInfo } = useContext(AuthContext);
  const inputRef = useAutoFocus();

  const handleInputChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    inputRef.current?.focus();

    try {
      const response = await authUserByCode(code);
      userInfo(response.userInfo.user);
      login(response.userInfo.token);
    } catch (err) {
      console.error("Error inesperado:", err.message);
    } finally {
      setCode("");
    }
  };

  return (
    <section className={classes.section}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <FlexContainerColumn>
          <legend>{"Ingrese su código de usuario para continuar"}</legend>
          <input
            ref={inputRef}
            type="password"
            placeholder="Código de Usuario"
            value={code}
            onChange={handleInputChange}
            className={classes.input}
          />
          <Button type="submit" label={"Ingresar"} />
        </FlexContainerColumn>
      </form>
    </section>
  );
};
