import classes from "./ItemDetailForAdder.module.scss";

export const ItemDetailForAdder = ({ name, code, quantity, stock }) => {
  const handleStock = stock !== 0 ? `${stock - quantity}` : "Sin stock";
  const handleQuantity = stock !== 0 ? quantity : 0;

  return (
    <tr className={classes.tr}>
      <td>{code}</td>
      <td>{name}</td>
      <td className={classes.number}>{handleQuantity}</td>
      <td className={classes.number}>{handleStock}</td>
    </tr>
  );
};
