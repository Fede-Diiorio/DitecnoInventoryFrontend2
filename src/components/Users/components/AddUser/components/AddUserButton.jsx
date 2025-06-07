import Swal from "sweetalert2";
import { Button } from "../../../../../components";
import { useReload } from "../../../../../context";
import { createUser } from "../../../../../services";

export const AddUserButton = ({ userInfo }) => {
  const { reload } = useReload();

  const { name, lastname, code, role } = userInfo;

  const handleFormSubmit = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Seguro que deseas cargar este usuario?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, crear",
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      try {
        const response = await createUser(name, lastname, code, role);
        if (response.message === "Usuario registrado") {
          reload();
        }
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
  };

  return <Button label={"Agregar usuario"} parentMethod={handleFormSubmit} />;
};
