import Swal from "sweetalert2";
import { Button } from "../../../../../components";
import { useNavigate } from "react-router-dom";
import { createSupplier } from "../../../../../services";
import { toast } from "react-toastify";

export const AddSupplierButton = ({ supplierInfo }) => {
  const navigate = useNavigate();

  console.log(supplierInfo);

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
          navigate("/inventario");
          toast.success(response.message);
        }
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
  };

  return <Button label={"Agregar proveedor"} parentMethod={handleFormSubmit} />;
};
