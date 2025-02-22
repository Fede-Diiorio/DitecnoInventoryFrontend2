import classes from "./Header.module.scss";
import icon from "../../assets/ditecnoLogoCompleto.png";

export const Header = () => {
  return (
    <header className={classes.header}>
      <div className={`container ${classes.container}`}>
        <img className={classes.logo} src={icon} alt="Logo de DiTecno" />
      </div>
    </header>
  );
};
