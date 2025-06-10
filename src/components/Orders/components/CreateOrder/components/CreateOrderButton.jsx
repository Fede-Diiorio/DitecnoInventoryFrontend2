import { Button } from "../../../../../components";
import Swal from "sweetalert2";
import { createOrder } from "../../../../../services";
import { useNavigate } from "react-router-dom";

export const CreateOrderButton = ({ supplier, products }) => {
  const payload = {
    supplier: supplier,
    products: products.map((p) => ({
      id: p.id,
      quantity: p.quantityToLoad,
    })),
  };

  const navigate = useNavigate();

  const handleFormSubmit = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Seguro que deseas cargar esta orden al sistema?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, cargar",
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      try {
        const response = await createOrder(payload.products, payload.supplier);
        if (response.message === "Orden generada correctamente") {
          navigate("/ordenes");
        }
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
  };

  return <Button label={"Crear orden"} parentMethod={handleFormSubmit} />;
};
