import { useState, useContext } from "react";
import clienteAxios from "../config/axios";
import { context } from "../context/context";
import swal from "sweetalert2";

const Login = (props) => {
  const { authenticateUser, logUser } = useContext(context);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData.email.trim() || !userData.password.trim()) {
      return swal.fire({
        icon: "error",
        title: "Introduce tu email y password",
        confirmButtonColor: "#1a202d",
      });
    }
    try {
      const respuesta = await clienteAxios.post("/api/auth", userData);
      localStorage.setItem("token", respuesta.data.token);
      logUser();
      swal.fire({
        icon: "success",
        title: respuesta.data.msg,
        confirmButtonColor: "#1a202d",
      });
      authenticateUser();
      props.history.push("/profile");
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
            <div className="mb-3 form-check"></div>
            <button
              type="submit"
              className="btn btn-success"
              onClick={handleSubmit}
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <p>o</p>
          <button
              type="button"
              className="btn btn-primary"
              onClick={() => {props.history.push("/signup")}}
            >
              Regístrate
            </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
