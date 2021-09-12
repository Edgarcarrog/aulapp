import clienteAxios from "../config/axios";
import { Fragment, useEffect, useState } from "react";
import tokenAuth from "../config/token";
import StudentUpdate from "./StudentUpdate";

const StudentDetail = () => {
  const subjects = [
    "Español",
    "Matématicas",
    "Ciencias Naturales",
    "Geografía",
    "Formación Cívica y Ética",
    "Historia",
    "Artes",
    "Educación Física",
  ];
  const [student, setStudent] = useState(null);
  const [updateStudent, setUpdateStudent] = useState(false);

  useEffect(() => {
    getStudent();
  }, [updateStudent]);

  const getStudent = async () => {
    const studentId = sessionStorage.getItem("student");
    const token = localStorage.getItem("token");

    try {
      if (token && studentId) {
        tokenAuth(token);
        const student = await clienteAxios.get(
          `/api/student/one-student/${studentId}`
        );
        setStudent(student.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {student && (
        <Fragment>
          <div className="d-flex justify-content-center mt-3">
            <h3>{`${student.fatherLastname} ${student.motherLastname} ${student.name}`}</h3>
          </div>

          <div className="table-responsive main-table">
            <table className="table table-striped text-center">
              <thead>
                <tr>
                  <th scope="col">Materia</th>
                  <th scope="col">Primer Parcial</th>
                  <th scope="col">Segundo Parcial</th>
                  <th scope="col">Tercer Parcial</th>
                  <th scope="col">Promedio</th>
                </tr>
              </thead>
              <tbody>
                {student &&
                  student.firstPartial.map((grade, index) => (
                    <tr key={index}>
                      <th scope="row">{subjects[index]}</th>
                      <td className="text-center">{grade}</td>
                      <td className="text-center">
                        {student.secondPartial[index]}
                      </td>
                      <td className="text-center">
                        {student.thirdPartial[index]}
                      </td>

                      <td>
                        {Math.round(
                          (10 *
                            (grade +
                              student.secondPartial[index] +
                              student.thirdPartial[index])) /
                            3
                        ) / 10}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <StudentUpdate
            id={student._id}
            name={student.name}
            fatherLastname={student.fatherLastname}
            motherLastname={student.motherLastname}
            updateStudent={updateStudent}
            setUpdateStudent={setUpdateStudent}
          />
        </Fragment>
      )}
    </div>
  );
};

export default StudentDetail;
