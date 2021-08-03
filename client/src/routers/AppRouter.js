import { BrowserRouter, Route, Switch } from "react-router-dom";
import Error from "../components/Error";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Profile from "../components/Profile";
import CreateGroup from "../components/CreateGroup";
import Provider from "../context/context";
import PrivateRoute from "./PrivateRoute";
import LoggedRoute from "./LoggedRoute";
import Header from "../components/Header";

const AppRouter = () => {
  return (
    <Provider>
      <BrowserRouter>
        <Header />
        <Switch>
          <LoggedRoute exact path="/" component={Login} />
          <LoggedRoute exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/createGroup" component={CreateGroup} />
          <Route path="*" component={Error} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default AppRouter;
