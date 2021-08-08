import clienteAxios from "../config/axios";
import tokenAuth from "../config/token";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Groups = () => {
  const history = useHistory();
  const [groups, setGroups] = useState(null);

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
      <h2>Mis grupos</h2>
      {groups && (
        <ul>
          {groups.map((group) => {
            const groupName = `${group.grade}o ${group.name} Ciclo: ${group.cicle}`;
            return (
              <li key={group._id} className="py-2">
                {groupName}
                <button
                  className="btn btn-primary mx-2"
                  onClick={() =>
                    chargeGroup(group._id, "diagnostic", "diagnosticAvr")
                  }
                >
                  Diagnóstico
                </button>
                <button
                  className="btn btn-primary mx-2"
                  onClick={() =>
                    chargeGroup(group._id, "firstPartial", "firstPartialAvr")
                  }
                >
                  1er Parcial
                </button>
                <button
                  className="btn btn-primary mx-2"
                  onClick={() =>
                    chargeGroup(group._id, "secondPartial", "secondPartialAvr")
                  }
                >
                  2o Parcial
                </button>
                <button
                  className="btn btn-primary mx-2"
                  onClick={() =>
                    chargeGroup(group._id, "thirdPartial", "thirdPartialAvr")
                  }
                >
                  3er Parcial
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Groups;
