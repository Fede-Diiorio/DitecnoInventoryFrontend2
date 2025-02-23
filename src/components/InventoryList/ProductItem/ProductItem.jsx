import classes from "./ProductItem.module.scss";

export const ProductItem = ({ name, code, stock }) => {
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
        <span>Stock: </span> {stock}
      </p>
    </div>
  );
};
