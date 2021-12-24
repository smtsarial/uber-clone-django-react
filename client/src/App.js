import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Login from "./views/auth/Login";
import Signup from "./views/auth/Signup";
import Logout from "./views/auth/Logout";
import Dashboard from "./views/app/Dashboard";
import Driver from "./views/app/driver";
import Traveller from "./views/app/traveller";
import Settings from "./views/app/settings"
import CarPooling from "./views/app/carpooling"
import Trips from './views/app/trips'

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" component={Dashboard} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/signup" component={Signup} exact />
          <Route path="/logout" component={Logout} exact />
          <Route path="/dashboard" component={Dashboard} exact />
          <Route path="/settings" component={Settings} exact />
          <Route path="/car-pooling" component={CarPooling} exact />
          <Route path="/driver" component={Driver} exact />
          <Route path="/traveller" component={Traveller} exact />
          <Route path="/trips" component={Trips} exact />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
