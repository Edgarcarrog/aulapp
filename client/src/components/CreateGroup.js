import { useState } from "react";

const CreateGroup = () => {
  const [group, setGroup] = useState({
    grado: "",
    grupo: "",
    ciclo: "",
  });

  const handleChange = (e) => {
    setGroup({ ...group, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Hola");
  };

  return (
    <div className="container">
      <form class="row g-3 needs-validation" novalidate>
        <div class="col-md-12">
          <label for="grado" class="form-label">
            Grado
          </label>
          <select
            class="form-select"
            id="grado"
            required
            name="grado"
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
          <div class="invalid-feedback">Please select a valid state.</div>
        </div>
        <div class="col-md-12">
          <label for="grupo" class="form-label">
            Grupo
          </label>
          <select
            class="form-select"
            id="grupo"
            required
            name="grupo"
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
          <div class="invalid-feedback">Please select a valid state.</div>
        </div>
        <div class="col-md-12">
          <label for="ciclo" class="form-label">
            Ciclo Escolar
          </label>
          <select
            class="form-select"
            id="ciclo"
            required
            name="ciclo"
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
          <div class="invalid-feedback">Please select a valid state.</div>
        </div>
        <div class="col-12">
          <button class="btn btn-primary" type="submit" onClick={handleSubmit}>
            Aceptar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateGroup;
