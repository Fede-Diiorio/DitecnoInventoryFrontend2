import { CommandForm } from "../../../components";
import { authUserByCode } from "../../../services";
import { AuthContext } from "../../../context";
import { useContext, useState } from "react";

export const LoginFrom = () => {
  const [code, setCode] = useState("");
  const { login } = useContext(AuthContext);

  const handleInputChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        type="password"
        placeholder="Código de Usuario"
        value={code}
        onChange={handleInputChange}
      />
    </CommandForm>
  );
};
