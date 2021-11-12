import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Navbar from "./Components/Navbar";
import App from "./Components/App";
import CustomerSignIn from "./Components/CustomerSignIn";
import CustomerSignUp from "./Components/CustomerSignUp";
import HousingCooperativeSignIn from "./Components/HousingCooperativeSignIn";
import RegisterHousingCooperative from "./Components/RegisterHousingCooperative";
import HousingCooperative from "./Components/HousingCooperative";
import Admin from "./Components/Admin";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

ReactDOM.render(
  <Router>
    <Navbar />
    <Switch>
      <Route path="/" component={App} exact />
      <Route path="/customersignin" component={CustomerSignIn} />
      <Route path="/customersignup" component={CustomerSignUp} />
      <Route
        path="/housingcooperativesignin"
        component={HousingCooperativeSignIn}
      />
      <Route path="/housingcooperative" component={HousingCooperative} />
      <Route path="/admin" component={Admin} />
      <Route
        path="/registerHousingCooperative"
        component={RegisterHousingCooperative}
      />
    </Switch>
  </Router>,

  document.getElementById("root")
);
