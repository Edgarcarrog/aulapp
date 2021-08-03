import { useState } from "react";
import clienteAxios from "../config/axios";
import swal from "sweetalert2";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  console.log(props);
  const history = useHistory();

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
      console.log(respuesta);
      swal.fire({
        icon: "success",
        title: respuesta.data.msg,
        confirmButtonColor: "#1a202d",
      });

      history.push("/profile");
    } catch (error) {
      console.log(error.response);
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
            onClick={() => {
              props.history.push("/signup");
            }}
          >
            Regístrate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
