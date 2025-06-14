import { getProductByCodeAndSupplier } from "../../../../../services";
import Swal from "sweetalert2";

export const addProduct = async (codeInput, selectedSupplier, setProducts) => {
  if (!codeInput.trim()) return;

  const productsFound = await getProductByCodeAndSupplier(
    codeInput.trim(),
    selectedSupplier
  );

  if (productsFound.length === 0) {
    return Swal.fire("Error", "Producto no encontrado", "error");
  }

  const addOrUpdateProduct = (product) => {
    const minQuantity = product.packaging / product.unit_value;

    setProducts((prev) => {
      const existingProduct = prev.find((p) => p.id === product.id);

      if (existingProduct) {
        return prev.map((p) =>
          p.id === product.id
            ? {
                ...p,
                quantityToLoad: (p.quantityToLoad || minQuantity) + minQuantity,
              }
            : p
        );
      }

      return [...prev, { ...product, quantityToLoad: minQuantity }];
    });
  };

  if (productsFound.length === 1) {
    addOrUpdateProduct(productsFound[0]);
  } else {
    const inputOptions = productsFound.reduce((acc, product, index) => {
      acc[index] = `${product.name} - ${product.description}`;
      return acc;
    }, {});

    const { value: selectedIndex } = await Swal.fire({
      title: "Seleccioná el producto",
      input: "select",
      inputOptions,
      inputPlaceholder: "Seleccioná uno",
      showCancelButton: true,
    });

    if (selectedIndex !== undefined) {
      addOrUpdateProduct(productsFound[selectedIndex]);
    }
  }
};
