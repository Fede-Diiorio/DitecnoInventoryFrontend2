import Swal from "sweetalert2";
import { Button } from "../../../components";
import { updateProduct } from "../../../services";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const UpdateProductButton = ({ productId, productInfo }) => {
  const navigate = useNavigate();
  const handleFormSubmit = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Una vez confirmada la actualización, no podrás deshacer los cambios a menos que modifiques la información manualmente.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, actualizar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const response = await updateProduct(productId, productInfo);
        if (response === "Actualizado") {
          navigate("/inventario");
        }
      } catch (error) {
        console.error("Error updating product:", error);
        Swal.fire("Error", "No se pudo actualizar el producto.", "error");
      }
    }
  };

  return <Button label={"Guardar cambios"} parentMethod={handleFormSubmit} />;
};
