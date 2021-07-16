
import{ BrowserRouter, Route, Switch } from 'react-router-dom';
import Error from '../components/Error';
import Login from '../components/Login';
import Profile from '../components/Profile';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/profile" component={Profile} />
        <Route path="*" component={Error} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
