import { useEffect, useState, useContext, useRef } from "react";
import { toast } from "react-toastify";
import classes from "./ProductAdder.module.scss";
import { ItemContainerForAdder } from "../../components";
import { useAutoFocus } from "../../hooks";
import { useAdderContext, AuthContext } from "../../context";
import { getProductByCode, descountStock, createOrder } from "../../services";

export const ProductAdder = () => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const { cart, addItem, clearCart } = useAdderContext();
  const inputRef = useAutoFocus();
  const successNotify = (message) => toast.success(message);
  const errorNotify = (message) => toast.error(message);

  const { logout, resetLogoutTimer } = useContext(AuthContext);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setError("");

      if (query === "CMD00001" && cart.length !== 0) {
        successNotify("Carrito vaciado");
        clearCart();
      } else if (query === "CMD00001" && cart.length === 0) {
        errorNotify("El carrito ya se ecuentra vacío");
      }

      if (query === "CMD00002" && cart.length !== 0) {
        await descountStock(cart);
        successNotify("Items descontados");
        clearCart();
      } else if (query === "CMD00002" && cart.length === 0) {
        errorNotify("El carrito se ecuentra vacío");
      }

      if (query === "CMD00004" && cart.length !== 0) {
        await createOrder(cart);
        successNotify("Orden creada");
        clearCart();
      } else if (query === "CMD00004" && cart.length === 0) {
        errorNotify("No se pudo crear la orden");
      }

      if (query === "CMD00003") {
        logout();
      }

      const product = await getProductByCode(query);

      if (!product.error) {
        addItem(product);
      }

      resetLogoutTimer();
      setQuery("");
      inputRef.current?.focus();
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      setError("Hubo un problema al buscar el producto.");
    }
  };

  return (
    <section>
      <form onSubmit={handleSearch}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Ingresar código o comando"
          value={query}
          onChange={handleInputChange}
          className={classes.input}
        />
        <button type="submit"></button>
      </form>
      <ItemContainerForAdder items={cart} useAdder={true} />
    </section>
  );
};
