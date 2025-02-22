export const ProductItem = ({ name, code, stock }) => {
  return (
    <div>
      <p>
        <span>Nombre: </span>
        {name}
      </p>
      <p>
        <span>Código: </span>
        {code}
      </p>
      <p>
        <span>Stock: </span>
        {stock}
      </p>
    </div>
  );
};
