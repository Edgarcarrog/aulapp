import { createContext, useReducer, useEffect } from "react";
import clienteAxios from "../config/axios";
import tokenAuth from "../config/token";
import reducer from "./reducer";

export const context = createContext();

const Provider = (props) => {
  const initialState = {
    user: null,
    isLoggedIn: false,
    actualGroup: null,
    actualizeTable: false,
  };

  //Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(reducer, initialState);

  const addUser = (data) => {
    dispatch({
      type: "ADD_USER",
      payload: data,
    });
  };

  const logUser = () => {
    dispatch({
      type: "LOG_USER",
    });
  };

  const deleteUser = () => {
    dispatch({
      type: "DELETE_USER",
    });
  };

  const setActualGroup = async (id) => {
    const grupo = await clienteAxios.get(`/api/group/${id}`);
    dispatch({
      type: "SET-GROUP",
      payload: grupo.data,
    });
  };

  const changeActualizeTable = () => {
    dispatch({
      type: "CHANGE-ACTUALIZETABLE",
    });
  };

  useEffect(() => {
    setUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setUser = async () => {
    await authenticateUser();
  };

  const authenticateUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        tokenAuth(token);
        const respuesta = await clienteAxios.get("/api/auth");
        addUser(respuesta.data);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const logout = () => {
    sessionStorage.clear();
    localStorage.removeItem("token");
    deleteUser();
  };

  return (
    <context.Provider
      value={{
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        actualGroup: state.actualGroup,
        actualizeTable: state.actualizeTable,
        addUser,
        authenticateUser,
        logUser,
        logout,
        setActualGroup,
        changeActualizeTable,
      }}
    >
      {props.children}
    </context.Provider>
  );
};

export default Provider;
