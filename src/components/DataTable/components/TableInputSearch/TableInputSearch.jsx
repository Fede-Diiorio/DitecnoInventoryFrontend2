import classes from "./TableInputSearch.module.scss";

export const TableInputSearch = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Buscar por nombre o código de producto"
      value={value}
      onChange={onChange}
      className={classes.input}
    />
  );
};
