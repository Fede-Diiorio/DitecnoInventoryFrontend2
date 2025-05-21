import classes from "./Button.module.scss";

export const Button = ({ label, parentMethod, type = "button" }) => {
  return (
    <button onClick={parentMethod} className={classes.button} type={type}>
      {label}
    </button>
  );
};
