import { Redirect, Route } from "react-router-dom";

const LoggedRoute = ({ component: Component, ...props }) => {
  /* const { isLoggedIn } = useContext(context);
  useEffect(() => {
  }, [isLoggedIn])
  console.log(isLoggedIn); */
  const token = localStorage.getItem("token");
  //console.log(props);
  return (
    <Route
      {...props}
      render={(props) =>
        !token ? <Component {...props} /> : <Redirect to="/profile" />
      }
    />
  );
};

export default LoggedRoute;
