import Swal from "sweetalert2";
import { Button } from "../../../../../components";
import { createSupplier } from "../../../../../services";
import { toast } from "react-toastify";
import { useReload } from "../../../../../context";

export const AddSupplierButton = ({ supplierInfo }) => {
  const { reload } = useReload();

  const { name, discount, nestedDiscount, exchangeRate } = supplierInfo;

  const handleFormSubmit = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Seguro que deseas cargar este proveedor?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, crear",
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      try {
        const response = await createSupplier(
          name,
          Number(discount),
          Number(nestedDiscount),
          exchangeRate
        );
        if (response.message === "Proveedor cargado correctamente") {
          toast.success(response.message);
          reload();
        }
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
  };

  return <Button label={"Agregar proveedor"} parentMethod={handleFormSubmit} />;
};
