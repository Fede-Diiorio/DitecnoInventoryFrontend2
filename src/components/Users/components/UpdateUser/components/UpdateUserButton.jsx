import { Button } from "../../../../../components";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../../../../services";

export const UpdateUserButton = ({ userInfo }) => {
  const { id, name, lastname, code, role } = userInfo;

  const navigate = useNavigate();
  const handleFormSubmit = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿En verdad desea actualizar los datos de este usuario?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, actualizar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const response = await updateUser(id, name, lastname, code, role);
        console.log(response);
        if (response.user) {
          navigate("/usuarios");
        }
      } catch (error) {
        console.error("Error updating product:", error);
        Swal.fire("Error", "No se pudo actualizar el producto.", "error");
      }
    }
  };

  return <Button label={"Guardar cambios"} parentMethod={handleFormSubmit} />;
};
