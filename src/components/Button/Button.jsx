import classes from "./Button.module.scss";

export const Button = ({ label, parentMethod }) => {
  return (
    <button onClick={parentMethod} className={classes.button}>
      {label}
    </button>
  );
};
