import { Fragment, useContext } from "react";
import { context } from "../context/context";
import { useHistory, Link } from "react-router-dom";

const Main = ({ props }) => {
  const { logout, user } = useContext(context);
  const history = useHistory();
  return (
    <Fragment>
      <main className="row pt-2">
        <div className="col">
          <h3>Profesor(a): {user && user.name}</h3>
        </div>
      </main>
      <div className="row d-flex justify-content-center">
        <div className="col-11 col-md-5 m-2">
          <Link className="link" to="/groups">
            <div className="classroom">
              <h3 className="text-light subtext">Mis grupos</h3>
            </div>
          </Link>
        </div>
        <div className="col-11 col-md-5 m-2">
          <Link className="link" to="/createGroup">
            <div className="group">
              <h3 className="text-dark subtext">Crear grupo</h3>
            </div>
          </Link>
        </div>
      </div>
      {/* <div className="row">
        <div className="col-md-6">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              logout();
              history.push("/");
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      </div> */}
    </Fragment>
  );
};

export default Main;
