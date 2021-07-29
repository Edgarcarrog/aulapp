import { useState, useContext } from "react";
import clienteAxios from "../config/axios";
import { context } from "../context/context";
import swal from "sweetalert2";

const Signup = (props) => {
  const { authenticateUser } = useContext(context);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.password.trim().length < 6) {
      return swal.fire({
        icon: "error",
        title: "El password debe tener mínimo 6 caracteres",
        confirmButtonColor: "#1a202d",
      });
    } else if (userData.password.trim() !== userData.confirmPassword.trim()) {
      return swal.fire({
        icon: "error",
        title: "Los passwords deben ser iguales",
        confirmButtonColor: "#1a202d",
      });
    }
    try {
      const respuesta = await clienteAxios.post("/api/users", userData);
      localStorage.setItem("token", respuesta.data.token);
      props.history.push("/profile");
      swal.fire({
        icon: "success",
        title: respuesta.data.msg,
        confirmButtonColor: "#1a202d",
      });
      authenticateUser();
    } catch (error) {
      swal.fire({
        icon: "error",
        title: error.response.data.msg,
        confirmButtonColor: "#1a202d",
      });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                onChange={handleChange}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                name="email"
                onChange={handleChange}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                onChange={handleChange}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirma el Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                onChange={handleChange}
              ></input>
            </div>
            <div className="mb-3 form-check"></div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
