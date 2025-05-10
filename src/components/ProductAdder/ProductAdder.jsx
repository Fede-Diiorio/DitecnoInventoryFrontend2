import { useState, useContext } from "react";
import { toast } from "react-toastify";
import classes from "./ProductAdder.module.scss";
import { useAutoFocus } from "../../hooks";
import { useAdderContext, AuthContext } from "../../context";
import { getProductByCode, descountStock } from "../../services";
import DataTable from "react-data-table-component";
import { columnsForIndex, customStyles } from "../../utilities";
import { Container } from "../../styled-components";

export const ProductAdder = () => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const { cart, addItem, clearCart } = useAdderContext();
  const inputRef = useAutoFocus();
  const successNotify = (message) => toast.success(message);

  const { logout, resetLogoutTimer } = useContext(AuthContext);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setError("");

      if (query === "CMD00001") {
        successNotify("Carrito está vacío");
        clearCart();
      }

      if (query === "CMD00002") {
        setQuery("");
        await descountStock(cart);
        successNotify("Items descontados");
        clearCart();
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
      <Container>
        <DataTable
          data={cart}
          columns={columnsForIndex}
          customStyles={customStyles}
          noDataComponent="Sin productos para descontar"
        />
      </Container>
    </section>
  );
};
