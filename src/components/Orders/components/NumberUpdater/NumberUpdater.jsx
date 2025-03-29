import { Button } from "../../../../components";
import Swal from "sweetalert2";
import { updateOrdernumber } from "../../../../services";
import { useRefreshContext } from "../../../../context";

export const NumberUpdates = ({ orderId }) => {
  const { toggleRefresh } = useRefreshContext();

  const handleAssignOrder = async () => {
    const { value: orderNumber } = await Swal.fire({
      title: "Ingresa el número de orden",
      input: "text",
      inputPlaceholder: "Ej: 12345",
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value) {
          return "Debes ingresar un número";
        }
      },
    });

    if (orderNumber) {
      try {
        await updateOrdernumber(orderId, orderNumber);
        Swal.fire("Asignado", `Número asignado: ${orderNumber}`, "success");
        toggleRefresh();
      } catch (error) {
        Swal.fire("Error", "No se pudo asignar el número", "error");
      }
    }
  };

  return <Button label={"Asignar número"} parentMethod={handleAssignOrder} />;
};
