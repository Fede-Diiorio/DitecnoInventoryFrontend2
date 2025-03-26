import { updateOrderQuantity } from "../../../../../../services";
import { Button } from "../../../../../../components";
import Swal from "sweetalert2";

export const OrderQuantityUpdater = ({ orderId, productId, onUpdate }) => {
  const updateQuantity = async () => {
    const { value: quantity } = await Swal.fire({
      title: "Ingresa la cantidad deseada",
      input: "number",
      inputPlaceholder: "Ej: 10",
      showCancelButton: true,
      confirmButtonText: "Actualizar",
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value) {
          return "Debes ingresar un número";
        }
      },
    });

    if (quantity) {
      try {
        await updateOrderQuantity(orderId, productId, quantity);
        Swal.fire("Asignado", `Cantidad actualizada: ${quantity}`, "success");
        onUpdate((prev) => !prev); // 🔄 Refrescar OrderDetail
      } catch (error) {
        Swal.fire("Error", "No se pudo asignar el número", "error");
      }
    }
  };

  return <Button label={"Actualizar cantidad"} parentMethod={updateQuantity} />;
};
