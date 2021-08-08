import { useContext, useEffect } from "react";
import tokenAuth from "../config/token";
import { context } from "../context/context";
import StudentForm from "./StudentForm";
import Table from "./Table";

const ListGroup = () => {
  const { setActualGroup } = useContext(context);
  const groupId = sessionStorage.getItem("groupId");

  useEffect(() => {
    chargeGroup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chargeGroup = () => {
    try {
      const token = localStorage.getItem("token");
      if (token && groupId) {
        tokenAuth(token);
        setActualGroup(groupId);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div className="row m-0">
      <div className="col p-0">
        {/* <PartialLinks groupId={groupId} /> */}
        <Table />
        <StudentForm />
      </div>
    </div>
  );
};

export default ListGroup;
