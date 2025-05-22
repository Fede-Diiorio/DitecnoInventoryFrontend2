import Swal from "sweetalert2";
import { Button } from "../../../components";
import { createNewProduct } from "../../../services";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const CreateProductButton = ({ productInfo }) => {
  const navigate = useNavigate();

  const handleFormSubmit = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Seguro que desean incorporar este nuevo porducto al inventario?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, crear",
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      try {
        const response = await createNewProduct(productInfo);
        if (response.message === "Producto creado") {
          navigate("/inventario");
          toast.success(response.message);
        }
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
  };

  return <Button label={"Crear producto"} parentMethod={handleFormSubmit} />;
};
