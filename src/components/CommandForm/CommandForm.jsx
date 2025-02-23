import classes from "./CommandForm.module.scss";
import { Button } from "../Button/Button";

export const CommandForm = ({ children, legend, label, onSubmit }) => {
  return (
    <section className={classes.section}>
      <form onSubmit={onSubmit} className={classes.form}>
        <legend>{legend}</legend>
        {children}
        <Button type="submit" label={label} />
      </form>
    </section>
  );
};
