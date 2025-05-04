import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getAllSuppliers } from "../services"; // ruta según tu estructura

export const useSupplierSelector = () => {
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  useEffect(() => {
    const fetchAndSelect = async () => {
      try {
        const suppliers = await getAllSuppliers();

        if (suppliers && suppliers.length > 0) {
          const { value, isConfirmed } = await Swal.fire({
            title: "Seleccioná un proveedor",
            input: "select",
            inputOptions: suppliers.reduce((acc, s) => {
              acc[s.id] = s.name;
              return acc;
            }, {}),
            inputPlaceholder: "Seleccioná un proveedor",
            showCancelButton: true,
          });

          if (isConfirmed) {
            const selected = suppliers.find((s) => s.id === Number(value));
            setSelectedSupplier(selected?.name || null);
          }
        }
      } catch (error) {
        console.error("Error al obtener proveedores:", error);
      }
    };

    fetchAndSelect();
  }, []);

  return selectedSupplier;
};
