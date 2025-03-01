import classes from "./ItemDetailForAdder.module.scss";

export const ItemDetailForAdder = ({ name, code, quantity, stock }) => {
  const handleStock = () => {};

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
        <span>Cantidad: </span> {quantity || stock}
      </p>
      <p>
        <span>Stock: </span> {stock - quantity}
      </p>
    </div>
  );
};
