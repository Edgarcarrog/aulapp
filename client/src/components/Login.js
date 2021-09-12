import { useState } from "react";
import clienteAxios from "../config/axios";
import swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import Spinner from "./Spinner";

const Login = (props) => {
  //console.log(props);
  const history = useHistory();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [charging, setCharging] = useState(false);

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
      setCharging(true);
      const respuesta = await clienteAxios.post("/api/auth", userData);
      localStorage.setItem("token", respuesta.data.token);
      //console.log(respuesta);
      swal.fire({
        icon: "success",
        title: respuesta.data.msg,
        confirmButtonColor: "#1a202d",
      });

      history.push("/");
    } catch (error) {
      console.log(error.response);
      setCharging(false);
      swal.fire({
        icon: "error",
        title: error.response.data.msg,
        confirmButtonColor: "#1a202d",
      });
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-2">
        {charging ? (
          <Spinner />
        ) : (
          <div className="col-11 col-md-6 col-lg-4 box mx-2">
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
                  autoFocus
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
              <button
                type="submit"
                className="btn btn-main form-control mt-3"
                onClick={handleSubmit}
              >
                Iniciar Sesión
              </button>
            </form>
            <p className="paragraph text-center m-0 mt-3">
              ¿No tienes cuenta aún?
            </p>
            <button
              type="button"
              className="btn btn-secondary form-control mt-1"
              onClick={() => {
                props.history.push("/signup");
              }}
            >
              Regístrate
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
