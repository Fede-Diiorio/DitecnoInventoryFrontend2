import classes from "./TableInputSearch.module.scss";

export const TableInputSearch = ({ value, onChange, placeholder, ref }) => {
  return (
    <input
      type="text"
      placeholder={
        placeholder ? placeholder : "Buscar por nombre o código de producto"
      }
      value={value}
      onChange={onChange}
      className={classes.input}
      ref={ref}
    />
  );
};
