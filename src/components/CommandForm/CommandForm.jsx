import classes from "./CommandForm.module.scss";
import { Button } from "../Button/Button";
import { FlexContainerColumn } from "../../styled-components";

export const CommandForm = ({ children, legend, label, onSubmit, error }) => {
  return (
    <section className={classes.section}>
      <form onSubmit={onSubmit} className={classes.form}>
        <FlexContainerColumn>
          <legend>{legend}</legend>
          {children}
          <Button type="submit" label={label} />
        </FlexContainerColumn>
        {error && <p className={classes.error}>{error}</p>}
      </form>
    </section>
  );
};
