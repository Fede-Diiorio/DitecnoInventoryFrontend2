import classes from "./Header.module.scss";
import icon from "../../assets/ditecnoLogoCompleto.png";
import { Container } from "../../styled-components";

export const Header = () => {
  return (
    <header className={classes.background}>
      <Container>
        <div className={classes.flexbox}>
          <img className={classes.logo} src={icon} alt="Logo de DiTecno" />
        </div>
      </Container>
    </header>
  );
};
