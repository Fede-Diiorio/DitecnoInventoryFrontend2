import Swal from "sweetalert2";
import { Button } from "../../../../../components";
import { useReload } from "../../../../../context";

export const AddUserButton = ({ userInfo }) => {
  const { reload } = useReload();

  const { name, lastname, code, role, email, password } = userInfo;

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
        console.log(name, lastname, code, role, email, password);
        if (response.message === "Proveedor cargado correctamente") {
          reload();
        }
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
  };

  return <Button label={"Agregar usuario"} parentMethod={handleFormSubmit} />;
};
