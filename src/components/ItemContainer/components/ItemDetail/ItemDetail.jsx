import classes from "./ItemDetail.module.scss";

export const ItemDetail = ({ name, code, stock, quantity }) => {
  const handleStock = stock !== 0 ? stock : "0";

  return (
    <div className={classes.box}>
      <p>
        <span>Nombre: </span>
        {name}
      </p>
      <p>
        <span>Código: </span> {code}
      </p>
      <p>
        <span>Cantidad: </span> {handleStock || quantity}
      </p>
    </div>
  );
};
