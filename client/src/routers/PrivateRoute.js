import { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { context } from "../context/context";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useContext(context);
  useEffect(() => {
  }, [isLoggedIn])
  console.log(isLoggedIn);
  return (
    // <Route exact={props.exact} path={props.path} component={props.component} />
    //<Route {...props} />
    <Route {...rest}>{isLoggedIn ? <Component /> : <Redirect to="/" />}</Route>
  );
};

export default PrivateRoute;
