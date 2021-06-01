import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import App from './App';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import Register from './screens/Register';
import Login from './screens/Login';
import Activate from './screens/Activate';

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" exact render={props => <App {...props} />} />
      <Route path="/register" exact render={props => <Register {...props} />} />
      <Route path="/login" exact render={props => <Login {...props} />} />
      <Route path="/users/activate/:token" exact render={props => <Activate {...props} />} />
    </Switch>
  </Router>,
  document.getElementById('root')
);

