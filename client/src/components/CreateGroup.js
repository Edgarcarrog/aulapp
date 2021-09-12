import { useState } from "react";
import clienteAxios from "../config/axios";
import swal from "sweetalert2";
import { useHistory } from "react-router-dom";

const CreateGroup = () => {
  const history = useHistory();
  const [group, setGroup] = useState({
    grade: "",
    name: "",
    cicle: "",
  });

  const handleChange = (e) => {
    setGroup({ ...group, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { grade, name, cicle } = group;
    if (grade === "" || name === "" || cicle === "") {
      return swal.fire({
        icon: "error",
        title: "Todos los campos son obligatorios",
        confirmButtonColor: "#1a202d",
      });
    }
    try {
      await clienteAxios.post("/api/group", group);
      swal.fire({
        icon: "success",
        title: "Grupo creado",
        confirmButtonColor: "#1a202d",
      });
      setGroup({
        grade: "",
        name: "",
        cicle: "",
      });
      history.push("/groups");
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
      <div className="row justify-content-center mt-3">
        <div className="col-sm-8 col-md-6 col-lg-4">
          <form
            className="mt-4 g-3 needs-validation justify-content-center group-form"
            noValidate
          >
            <div className="my-2">
              <label htmlFor="grado" className="form-label">
                Grado
              </label>
              <select
                className="form-select"
                id="grado"
                required
                name="grade"
                onChange={handleChange}
                value={group.grade}
              >
                <option disabled value="">
                  Selecciona un grado
                </option>
                <option value="1">1o</option>
                <option value="2">2o</option>
                <option value="3">3o</option>
                <option value="4">4o</option>
                <option value="5">5o</option>
                <option value="6">6o</option>
              </select>
              <div className="invalid-feedback">
                Please select a valid state.
              </div>
            </div>
            <div className="my-2">
              <label htmlFor="grupo" className="form-label">
                Grupo
              </label>
              <select
                className="form-select"
                id="grupo"
                required
                name="name"
                onChange={handleChange}
                value={group.name}
              >
                <option disabled value="">
                  Selecciona un grupo
                </option>
                <option value="A">"A"</option>
                <option value="B">"B"</option>
                <option value="C">"C"</option>
                <option value="D">"D"</option>
                <option value="E">"E"</option>
              </select>
              <div className="invalid-feedback">
                Please select a valid state.
              </div>
            </div>
            <div className="my-2">
              <label htmlFor="ciclo" className="form-label">
                Ciclo Escolar
              </label>
              <select
                className="form-select"
                id="ciclo"
                required
                name="cicle"
                onChange={handleChange}
                value={group.cicle}
              >
                <option disabled value="">
                  Selecciona un ciclo escolar
                </option>
                <option value="2020-2021">2020-2021</option>
                <option value="2021-2022">2021-2022</option>
                <option value="2022-2023">2022-2023</option>
                <option value="2023-2024">2023-2024</option>
                <option value="2024-2025">2024-2025</option>
              </select>
              <div className="invalid-feedback">
                Please select a valid state.
              </div>
            </div>
            <button
              className="btn btn-primary form-control my-2"
              type="submit"
              onClick={handleSubmit}
            >
              Agregar Grupo
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
