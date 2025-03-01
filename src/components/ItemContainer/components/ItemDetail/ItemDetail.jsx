import classes from "./ItemDetail.module.scss";

export const ItemDetail = ({ name, code, stock, quantity }) => {
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
        <span>Cantidad: </span> {stock || quantity}
      </p>
    </div>
  );
};
