import classes from "./UserForm.module.scss";

export const UserForm = ({ formData, handleChange }) => {
  return (
    <form className={classes.form}>
      <div className={classes.formGroup}>
        <label>
          Nombre:
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nombre del usuario"
            value={formData.name}
            onChange={handleChange}
          />
        </label>

        <label>
          Apellido:
          <input
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Apellido del usuario"
            value={formData.lastname}
            onChange={handleChange}
          />
        </label>

        <label>
          Código de usuario:
          <input
            type="text"
            id="code"
            name="code"
            placeholder="Código del usuario"
            value={formData.code}
            onChange={handleChange}
          />
        </label>

        <label>
          Rol:
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="user">Usuario</option>
            <option value="supervisor">Supervisor</option>
            <option value="admin">Administrador</option>
          </select>
        </label>

        <label>
          Email:
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
          />
        </label>

        <label>
          Contraseña:
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
      </div>
    </form>
  );
};
