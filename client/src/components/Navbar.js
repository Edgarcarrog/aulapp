import { useContext } from "react";
import { context } from "../context/context";
import { NavLink } from "react-router-dom";

const Navbar = () => {

  const { logout } = useContext(context);

  return (
    <div className="col-lg-10 mx-auto">
      <nav className="navbar navbar-expand-lg navbar-light bg-light nav">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            Inicio
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/groups">
                  Grupos
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/createGroup">
                  Crear Grupo
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/"
                  onClick={() => logout()}
                >
                  Cerrar Sesión
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
