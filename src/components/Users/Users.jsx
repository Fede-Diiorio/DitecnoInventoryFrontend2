import classes from "./Users.module.scss";
import { Container } from "../../styled-components";
import { UserList, AddUser } from "./components";

export const Users = () => {
  return (
    <Container>
      <h3>Usuarios</h3>
      <div className={classes.container}>
        <div className={classes.addUser}>
          <h4>Agregar un nuevo usuario:</h4>
          <AddUser />
        </div>
        <UserList />
      </div>
    </Container>
  );
};
