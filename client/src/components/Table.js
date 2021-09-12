import clienteAxios from "../config/axios";
import { Fragment, useContext, useEffect, useState } from "react";
import { context } from "../context/context";
import tokenAuth from "../config/token";
import swal from "sweetalert2";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

const Table = () => {
  let partial = sessionStorage.getItem("partial");
  let avr = sessionStorage.getItem("avr");

  const [students, setStudents] = useState([]);
  const [btnActive, setBtnActive] = useState([]);
  const [charging, setCharging] = useState(true);

  const { actualGroup, actualizeTable } = useContext(context);

  const [changeAverage, setChangeAverage] = useState(false);
  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    chargeStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actualizeTable, actualGroup]);

  useEffect(() => {
    setAverage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeAverage]);

  const chargeStudents = async () => {
    partial = sessionStorage.getItem("partial");
    avr = sessionStorage.getItem("avr");
    const token = localStorage.getItem("token");
    try {
      if (token && actualGroup) {
        tokenAuth(token);
        const students = await clienteAxios.get(
          `/api/student/${actualGroup._id}`
        );
        setStudents(students.data);
        if (partial === "diagnostic") setBtnActive([1, 0, 0, 0]);
        else if (partial === "firstPartial") setBtnActive([0, 1, 0, 0]);
        else if (partial === "secondPartial") setBtnActive([0, 0, 1, 0]);
        else if (partial === "thirdPartial") setBtnActive([0, 0, 0, 1]);
        setCharging(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setAverage = () => {
    if (students) {
      setStudents(
        students.map((student) => ({
          ...student,
          [avr]:
            Math.round(
              (10 * student[partial].reduce((acc, curr) => acc + curr)) /
                student[partial].length
            ) / 10,
        }))
      );
    }
  };

  const changeTable = () => {
    partial = sessionStorage.getItem("partial");
    avr = sessionStorage.getItem("avr");
    if (partial === "diagnostic") setBtnActive([1, 0, 0, 0]);
    else if (partial === "firstPartial") setBtnActive([0, 1, 0, 0]);
    else if (partial === "secondPartial") setBtnActive([0, 0, 1, 0]);
    else if (partial === "thirdPartial") setBtnActive([0, 0, 0, 1]);
  };

  const setStudent = (student) => {
    sessionStorage.setItem("student", student);
  };

  const handleChange = (e) => {
    const [id, index] = e.target.id.split("-");
    let data = parseFloat(e.target.value);
    if (data < 0) data = 0;
    if (data > 10) data = 10;
    setStudents(
      students.map((student) => {
        return student._id === id
          ? {
              ...student,
              [partial]: student[partial].map((value, ind) => {
                // eslint-disable-next-line eqeqeq
                return ind == index ? data : value;
              }),
            }
          : student;
      })
    );
    setChangeAverage(!changeAverage);
    setDisableButton(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (token && actualGroup) {
        tokenAuth(token);
        await students.forEach((student) => {
          clienteAxios.put(`/api/student/${student._id}`, {
            diagnostic: student.diagnostic,
            diagnosticAvr: student.diagnosticAvr,
            firstPartial: student.firstPartial,
            firstPartialAvr: student.firstPartialAvr,
            secondPartial: student.secondPartial,
            secondPartialAvr: student.secondPartialAvr,
            thirdPartial: student.thirdPartial,
            thirdPartialAvr: student.thirdPartialAvr,
          });
        });
        swal.fire({
          icon: "success",
          title: "Actualizado",
          confirmButtonColor: "#1a202d",
        });
        setDisableButton(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      {charging ? (
        <Spinner />
      ) : students.length !== 0 ? (
        <Fragment>
          <div className="sticky-top mt-3 d-flex justify-content-center btn-container flex-wrap">
            <button
              className={
                btnActive[0] ? "btn btn-primary m-2" : "btn btn-light m-2"
              }
              onClick={() => {
                sessionStorage.setItem("partial", "diagnostic");
                sessionStorage.setItem("avr", "diagnosticAvr");
                changeTable();
              }}
            >
              Diagnóstico
            </button>
            <button
              className={
                btnActive[1] ? "btn btn-primary m-2" : "btn btn-light m-2"
              }
              onClick={() => {
                sessionStorage.setItem("partial", "firstPartial");
                sessionStorage.setItem("avr", "firstPartialAvr");
                changeTable();
              }}
            >
              1er Parcial
            </button>
            <button
              className={
                btnActive[2] ? "btn btn-primary m-2" : "btn btn-light m-2"
              }
              onClick={() => {
                sessionStorage.setItem("partial", "secondPartial");
                sessionStorage.setItem("avr", "secondPartialAvr");
                changeTable();
              }}
            >
              2o Parcial
            </button>
            <button
              className={
                btnActive[3] ? "btn btn-primary m-2" : "btn btn-light m-2"
              }
              onClick={() => {
                sessionStorage.setItem("partial", "thirdPartial");
                sessionStorage.setItem("avr", "thirdPartialAvr");
                changeTable();
              }}
            >
              3er Parcial
            </button>
            <button
              type="button"
              className="btn btn-success m-2"
              onClick={handleSubmit}
              disabled={disableButton}
            >
              Guardar Cambios
            </button>
          </div>
          <div className="table-responsive main-table">
            <table className="table table-striped text-center">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col" className="first-col">
                    Nombre
                  </th>
                  <th scope="col">Esp</th>
                  <th scope="col">Mat</th>
                  <th scope="col">C.N.</th>
                  <th scope="col">Geo</th>
                  <th scope="col">FCE</th>
                  <th scope="col">His</th>
                  <th scope="col">Art</th>
                  <th scope="col">E.F.</th>
                  <th scope="col">Prom</th>
                </tr>
              </thead>
              <tbody>
                {students &&
                  students.map(
                    (student, indexStudent) =>
                      student && (
                        <tr key={student._id}>
                          <th scope="row">{indexStudent + 1}</th>
                          <td className="text-left sticky">
                            <Link
                              className="link text-dark"
                              to="/student-detail"
                              onClick={() => setStudent(student._id)}
                            >
                              {student.fatherLastname} {student.motherLastname}{" "}
                              {student.name}
                            </Link>
                          </td>
                          {student[partial].map((grade, indexSubject) => {
                            const id = `${student._id}-${indexSubject}`;
                            return (
                              <td key={indexSubject}>
                                <input
                                  type="number"
                                  id={id}
                                  min="5"
                                  max="10"
                                  step="0.5"
                                  value={grade}
                                  onChange={handleChange}
                                ></input>
                              </td>
                            );
                          })}
                          <td>
                            {Math.round(
                              (10 *
                                student[partial].reduce(
                                  (acc, curr) => (acc || 0) + (curr || 0)
                                )) /
                                student[partial].length
                            ) / 10}
                          </td>
                        </tr>
                      )
                  )}
              </tbody>
            </table>
          </div>
        </Fragment>
      ) : (
        <h3 className="p-2">No hay alumnos registrados aún</h3>
      )}
    </Fragment>
  );
};

export default Table;
