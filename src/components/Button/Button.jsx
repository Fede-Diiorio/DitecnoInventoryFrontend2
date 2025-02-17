import classes from "./Button.module.scss";

export const Button = ({ label, onClick }) => {
  return (
    <button onClick={onClick} className={classes.button}>
      {label}
    </button>
  );
};
