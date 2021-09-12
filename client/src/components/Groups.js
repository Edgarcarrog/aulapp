import clienteAxios from "../config/axios";
import tokenAuth from "../config/token";
import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Spinner from "./Spinner";

const Groups = () => {
  const history = useHistory();
  const [groups, setGroups] = useState(null);
  const [charging, setCharging] = useState(true);

  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        tokenAuth(token);
        const myGroups = await clienteAxios.get("/api/group");
        setGroups(myGroups.data);
        setCharging(false);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const chargeGroup = (id, partial, avr) => {
    sessionStorage.setItem("groupId", id);
    sessionStorage.setItem("partial", partial);
    sessionStorage.setItem("avr", avr);
    history.push("/list-group");
  };

  return (
    <div>
      {charging ? (
        <Spinner />
      ) : groups.length > 0 ? (
        <>
          <h3 className="m-3">Mis grupos</h3>
          <ul>
            {groups.map((group) => {
              const groupName = `${group.grade}o ${group.name} Ciclo: ${group.cicle}`;
              return (
                <li key={group._id} className="py-2">
                  {groupName}
                  <div className="d-flex justify-content-center flex-wrap">
                    <button
                      className="btn m-2 btn-main"
                      onClick={() =>
                        chargeGroup(group._id, "diagnostic", "diagnosticAvr")
                      }
                    >
                      Diagnóstico
                    </button>
                    <button
                      className="btn m-2 btn-main"
                      onClick={() =>
                        chargeGroup(
                          group._id,
                          "firstPartial",
                          "firstPartialAvr"
                        )
                      }
                    >
                      1er Parcial
                    </button>
                    <button
                      className="btn m-2 btn-main"
                      onClick={() =>
                        chargeGroup(
                          group._id,
                          "secondPartial",
                          "secondPartialAvr"
                        )
                      }
                    >
                      2o Parcial
                    </button>
                    <button
                      className="btn m-2 btn-main"
                      onClick={() =>
                        chargeGroup(
                          group._id,
                          "thirdPartial",
                          "thirdPartialAvr"
                        )
                      }
                    >
                      3er Parcial
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <div className="container-fluid">
          <div className="row pt-2">
            <div className="col">
              <h3>No tienes grupos registrados</h3>
            </div>

            <div className="row d-flex justify-content-center">
              <div className="col-11 col-md-8 col-lg-6 m-2">
                <Link className="link" to="/createGroup">
                  <div className="group">
                    <h3 className="text-dark subtext">Crear grupo</h3>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Groups;
