import { useState } from "react";
import clienteAxios from "../config/axios";

const CreateGroup = () => {
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
    try {
      const resultado = await clienteAxios.post("/api/group", group);
      console.log(resultado);;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <form className="row g-3 needs-validation" novalidate>
        <div className="col-md-12">
          <label htmlFor="grado" className="form-label">
            Grado
          </label>
          <select
            className="form-select"
            id="grado"
            required
            name="grade"
            onChange={handleChange}
          >
            <option selected disabled value="">
              Selecciona un grado
            </option>
            <option value="1">1o</option>
            <option value="2">2o</option>
            <option value="3">3o</option>
            <option value="4">4o</option>
            <option value="5">5o</option>
            <option value="6">6o</option>
          </select>
          <div className="invalid-feedback">Please select a valid state.</div>
        </div>
        <div className="col-md-12">
          <label htmlFor="grupo" className="form-label">
            Grupo
          </label>
          <select
            className="form-select"
            id="grupo"
            required
            name="name"
            onChange={handleChange}
          >
            <option selected disabled value="">
              Selecciona un grupo
            </option>
            <option value="A">"A"</option>
            <option value="B">"B"</option>
            <option value="C">"C"</option>
            <option value="D">"D"</option>
            <option value="E">"E"</option>
          </select>
          <div className="invalid-feedback">Please select a valid state.</div>
        </div>
        <div className="col-md-12">
          <label htmlFor="ciclo" className="form-label">
            Ciclo Escolar
          </label>
          <select
            className="form-select"
            id="ciclo"
            required
            name="cicle"
            onChange={handleChange}
          >
            <option selected disabled value="">
              Selecciona un ciclo escolar
            </option>
            <option value="2020-2021">2020-2021</option>
            <option value="2021-2022">2021-2022</option>
            <option value="2022-2023">2022-2023</option>
            <option value="2023-2024">2023-2024</option>
            <option value="2024-2025">2024-2025</option>
          </select>
          <div className="invalid-feedback">Please select a valid state.</div>
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit" onClick={handleSubmit}>
            Aceptar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateGroup;
