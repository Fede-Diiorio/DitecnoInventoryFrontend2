import classes from "./Input.module.scss";

export const Input = ({ name, label, type, placeholder, value, onChange }) => {
  return (
    <div className={classes.field}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
