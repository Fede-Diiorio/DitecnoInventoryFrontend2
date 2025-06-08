import { useCallback, useState, useEffect } from "react";
import { UserForm } from "../../components";
import { Container } from "../../../../styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById } from "../../../../services";
import { useFetch } from "../../../../hooks";
import classes from "./UpdateUser.module.scss";
import { Button } from "../../../../components";
import { UpdateUserButton } from "./components/UpdateUserButton";

export const UpdateUser = () => {
  const { id } = useParams();
  const fetchUser = useCallback(() => getUserById(id), [id]);

  const { data: user, loading, error } = useFetch(fetchUser);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    lastname: "",
    code: "",
    role: "user",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id || null,
        name: user.name || "",
        lastname: user.lastname || "",
        code: "",
        role: user.role || "user",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) return <h2>Cargando</h2>;
  if (error) return <h2>Hubo un error</h2>;

  return (
    <Container>
      <h3>Actualizar usuario</h3>
      <div className={classes.frame}>
        <UserForm
          formData={formData}
          handleChange={handleChange}
          legend={true}
        />
        <div className={classes.buttons}>
          <Button label={"Volver"} parentMethod={() => navigate(-1)} />
          <UpdateUserButton userInfo={formData} />
        </div>
      </div>
    </Container>
  );
};
