import { getAllUsers } from "../../../../services";
import { useFetch } from "../../../../hooks";
import { useReload } from "../../../../context";
import classes from "./UsersList.module.scss";
import { Button } from "../../..";
import { useNavigate } from "react-router-dom";
import { FlexContainerRow } from "../../../../styled-components";

export const UserList = () => {
  const { reloadFlag } = useReload();

  const { data: users, loading, error } = useFetch(getAllUsers, [reloadFlag]);

  const navigate = useNavigate();

  if (loading) return <h2>Cargando</h2>;
  if (error) return <h2>Hubo un error</h2>;

  return (
    <div className={classes.box}>
      <h4>Lista de usuarios:</h4>
      {users.map((u) => (
        <FlexContainerRow key={u.id} className={classes.user}>
          <p>
            {u.name} {u.lastname}
          </p>
          <Button
            label={"Editar"}
            parentMethod={() => navigate(`/usuarios/${u.id}`)}
          />
        </FlexContainerRow>
      ))}
    </div>
  );
};
