import classes from "./ProductAdder.module.scss";
import { CommandForm, ItemMapper } from "../../components";
import { useAutoFocus } from "../../hooks";
import { useAdderContext } from "../../context";
import { useState } from "react";
import { getProductByCode, descountStock } from "../../services";

export const ProductAdder = () => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const { cart, addItem, clearCart } = useAdderContext();
  const inputRef = useAutoFocus();

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setError("");

      if (query === "CMD00001") {
        clearCart();
      }

      if (query === "CMD00002") {
        await descountStock(cart);
        clearCart();
      }

      const product = await getProductByCode(query);

      if (!product.error) {
        addItem(product);
      }

      setQuery("");
      inputRef.current?.focus();
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      setError("Hubo un problema al buscar el producto.");
    }
  };

  return (
    <section>
      <CommandForm
        legend={"Ingrese el código de producto o comando"}
        label={"Buscar"}
        onSubmit={handleSearch}
        error={error}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Ingresar código o comando"
          value={query}
          onChange={handleInputChange}
          className={classes.input}
        />
      </CommandForm>

      <ItemMapper items={cart} />
    </section>
  );
};
