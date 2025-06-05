import { Button } from "../../../../../components";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { updateSupplier } from "../../../../../services";

export const UpdateSupplierButton = ({ supplierInfo }) => {
  const { id, name, discount, nestedDiscount, exchangeRate } = supplierInfo;

  const navigate = useNavigate();
  const handleFormSubmit = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿En verdad desea actualizar los datos de este proveedor?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, actualizar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const response = await updateSupplier(
          id,
          name,
          discount,
          nestedDiscount,
          exchangeRate
        );
        if (response.updatedSupplier) {
          navigate("/proveedores");
        }
      } catch (error) {
        console.error("Error updating product:", error);
        Swal.fire("Error", "No se pudo actualizar el producto.", "error");
      }
    }
  };

  return <Button label={"Guardar cambios"} parentMethod={handleFormSubmit} />;
};
