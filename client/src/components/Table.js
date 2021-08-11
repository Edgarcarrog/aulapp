import clienteAxios from "../config/axios";
import { Fragment, useContext, useEffect, useState } from "react";
import { context } from "../context/context";
import tokenAuth from "../config/token";
import swal from "sweetalert2";
import { Link } from "react-router-dom";

const Table = () => {
  let partial = sessionStorage.getItem("partial");
  let avr = sessionStorage.getItem("avr");

  const { actualGroup, actualizeTable } = useContext(context);
  const [students, setStudents] = useState(null);
  const [changeAverage, setChangeAverage] = useState(false);

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
          `/api/student/${actualGroup._id}?partial=${partial}&avr=${avr}`
        );
        setStudents(students.data);
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

  const setStudent = (student) => {
    sessionStorage.setItem("student", student);
  };

  const handleChange = (e) => {
    const [id, index] = e.target.id.split("-");
    const data = parseFloat(e.target.value);
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (token && actualGroup) {
        tokenAuth(token);
        await students.forEach((student) => {
          //const diagnostic = student[partial];
          //const diagnosticAvr = student.diagnosticAvr;
          clienteAxios.put(`/api/student/${student._id}`, {
            [partial]: student[partial],
            [avr]: student[avr],
          });
        });
        swal.fire({
          icon: "success",
          title: "Actualizado",
          confirmButtonColor: "#1a202d",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <button
        className="btn btn-primary m-2"
        onClick={() => {
          sessionStorage.setItem("partial", "diagnostic");
          sessionStorage.setItem("avr", "diagnosticAvr");
          chargeStudents();
        }}
      >
        Diagnóstico
      </button>
      <button
        className="btn btn-primary m-2"
        onClick={() => {
          sessionStorage.setItem("partial", "firstPartial");
          sessionStorage.setItem("avr", "firstPartialAvr");
          chargeStudents();
        }}
      >
        1er Parcial
      </button>
      <button
        className="btn btn-primary m-2"
        onClick={() => {
          sessionStorage.setItem("partial", "secondPartial");
          sessionStorage.setItem("avr", "secondPartialAvr");
          chargeStudents();
        }}
      >
        2o Parcial
      </button>
      <button
        className="btn btn-primary m-2"
        onClick={() => {
          sessionStorage.setItem("partial", "thirdPartial");
          sessionStorage.setItem("avr", "thirdPartialAvr");
          chargeStudents();
        }}
      >
        3er Parcial
      </button>
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
                          className="link"
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
                              /* name="tentacles" */
                              min="5"
                              max="10"
                              step="0.5"
                              value={
                                grade
                              }
                              onChange={handleChange}
                            ></input>
                          </td>
                        );
                      })}
                      <td>
                        {Math.round(
                          (10 *
                            student[partial].reduce(
                              (acc, curr) => acc + curr
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
      <button
        type="button"
        className="btn btn-success m-2"
        onClick={handleSubmit}
      >
        Guardar
      </button>
    </Fragment>
  );
};

export default Table;
