export const ItemDetailForAdder = ({ name, code, quantity, stock }) => {
  const handleStock = stock !== 0 ? `${stock - quantity}` : "Sin stock";
  const handleQuantity = stock !== 0 ? quantity : 0;

  return (
    <tr>
      <td>{code}</td>
      <td>{name}</td>
      <td>{handleQuantity}</td>
      <td>{handleStock}</td>
    </tr>
  );
};
