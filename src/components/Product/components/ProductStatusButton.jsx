import Swal from "sweetalert2";
import { Button } from "../../../components";
import { updateProductStatus } from "../../../services";
import { useNavigate } from "react-router-dom";

export const ProductStatusButton = ({ productStatus, productCode }) => {
  const buttonText =
    productStatus === 1 ? "Descontinuar producto" : "Reactivar producto";

  const swalInfo = {
    text:
      productStatus === 1
        ? "Este producto será marcado como descontinuado y no se visualizará en el inventario."
        : "El producto se encuentra descontinuado. ¿Desea reactivarlo?",
    confirmButtonText:
      productStatus === 1 ? "Sí, descontinuar" : "Sí, reactivar",
  };

  const successMessage =
    productStatus === 1 ? "Producto descontinuado" : "Producto reactivado";

  const navigate = useNavigate();

  const handleProductState = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: swalInfo.text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: swalInfo.confirmButtonText,
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await updateProductStatus(productCode);
        Swal.fire(
          successMessage,
          "El producto ha sido actualizado.",
          "success"
        );
        navigate("/inventario");
      } catch (error) {
        console.error("Error al descontinuar producto:", error);
        Swal.fire("Error", "No se pudo descontinuar el producto.", "error");
      }
    }
  };

  return <Button label={buttonText} parentMethod={handleProductState} />;
};
