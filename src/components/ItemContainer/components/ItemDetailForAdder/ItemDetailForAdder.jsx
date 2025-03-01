import classes from "./ItemDetailForAdder.module.scss";

export const ItemDetailForAdder = ({ name, code, quantity, stock }) => {
  const handleStock = stock !== 0 ? `${stock - quantity}` : "Sin stock";
  const handleQuantity = stock !== 0 ? quantity : 0;

  return (
    <div className={classes.box}>
      <p>
        <span>Código: </span> {code}
      </p>
      <p>
        <span>Nombre: </span>
        {name}
      </p>
      <p>
        <span>Cantidad: </span> {handleQuantity}
      </p>
      <p>
        <span>Stock: </span> {handleStock}
      </p>
    </div>
  );
};
