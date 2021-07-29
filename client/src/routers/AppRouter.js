import { BrowserRouter, Route, Switch } from "react-router-dom";
import Error from "../components/Error";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Profile from "../components/Profile";
import CreateGroup from "../components/CreateGroup";
import Provider from "../context/context";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/createGroup" component={CreateGroup} />
          <Route path="*" component={Error} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default AppRouter;
