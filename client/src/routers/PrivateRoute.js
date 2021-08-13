
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("token");
  return (
    // <Route exact={props.exact} path={props.path} component={props.component} />
    //<Route {...props} />
    <Route {...rest}>{token ? <Component /> : <Redirect to="/" />}</Route>
  );
};

export default PrivateRoute;
