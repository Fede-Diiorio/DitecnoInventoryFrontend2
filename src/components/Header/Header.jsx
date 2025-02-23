import classes from "./Header.module.scss";
import icon from "../../assets/ditecnoLogoCompleto.png";
import { Container } from "../../styled-components";

export const Header = ({ navBar }) => {
  return (
    <header className={classes.background}>
      <Container>
        <div className={classes.flexbox}>
          <img className={classes.logo} src={icon} alt="Logo de DiTecno" />
          {navBar}
        </div>
      </Container>
    </header>
  );
};
