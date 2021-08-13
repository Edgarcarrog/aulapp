import { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import clienteAxios from "../config/axios";
import tokenAuth from "../config/token";
import swal from "sweetalert2";

const StudentUpdate = ({
  name,
  fatherLastname,
  motherLastname,
  id,
  setUpdateStudent,
  updateStudent,
}) => {
  const history = useHistory();
  const [student, setStudent] = useState({
    name: name,
    fatherLastname: fatherLastname,
    motherLastname: motherLastname,
  });

  const deleteStudent = () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
      swal
        .fire({
          title: "¿Deseas continuar?",
          text: "El alumno se eliminará de forma permanente",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#1a202d",
          cancelButtonColor: "#d33",
          cancelButtonText: "Cancelar",
          confirmButtonText: "Aceptar",
        })
        .then((result) => {
          if (result.isConfirmed) {
            clienteAxios
              .delete(`/api/student/${id}`)
              .then((response) => {
                swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Alumno eliminado",
                  showConfirmButton: false,
                  timer: 1500,
                });
                console.log(response);
                history.push("/list-group");
              })
              .catch((error) => {
                swal.fire({
                  icon: "error",
                  title: error.response.data.msg,
                  confirmButtonColor: "#1a202d",
                });
              });
          }
        });
    }
  };

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, fatherLastname, motherLastname } = student;
    if (name === "" || fatherLastname === "" || motherLastname === "") {
      return swal.fire({
        icon: "error",
        title: "Todos los campos son obligatorios",
        confirmButtonColor: "#1a202d",
      });
    }
    try {
      const token = localStorage.getItem("token");
      if (token) {
        tokenAuth(token);
        await clienteAxios.put(`/api/student/${id}`, student);
        swal.fire({
          icon: "success",
          title: "Modificado",
          confirmButtonColor: "#1a202d",
        });
        setUpdateStudent(!updateStudent); 
        /*history.push("/list-group");*/
      }
    } catch (error) {
      swal.fire({
        icon: "error",
        title: error.response.data.msg,
        confirmButtonColor: "#1a202d",
      });
    }
  };
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-primary m-2"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        data-bs-whatever="@mdo"
      >
        Modificar Nombre
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Alumno
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="col-form-label">
                    Nombre:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={student.name}
                    onChange={handleChange}
                  ></input>
                </div>
                <div className="mb-3">
                  <label htmlFor="fatherLastname" className="col-form-label">
                    Apellido Paterno:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fatherLastname"
                    name="fatherLastname"
                    value={student.fatherLastname}
                    onChange={handleChange}
                  ></input>
                </div>
                <div className="mb-3">
                  <label htmlFor="motherLastname" className="col-form-label">
                    Apellido Materno:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="motherLastname"
                    name="motherLastname"
                    value={student.motherLastname}
                    onChange={handleChange}
                  ></input>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleSubmit}
              >
                Actualizar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-danger m-2"
        onClick={deleteStudent}
      >
        Eliminar Alumno
      </button>
    </Fragment>
  );
};

export default StudentUpdate;
