import { Fragment, useContext } from "react";
import Table from "./Table";
import { context } from "../context/context";
import { useHistory } from "react-router-dom";

const Main = ({props}) => {

  const { logout, user } = useContext(context);
  const history = useHistory();
  return (
    <Fragment>
      <main className="row">
        <div className="col">
          <h2>{user && user.name}</h2>
          <h3>Período</h3>
          <Table />
        </div>
      </main>
      <div className="row">
        <div className="col-md-6">
          <p>o</p>
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
      </div>
    </Fragment>
  );
};

export default Main;
