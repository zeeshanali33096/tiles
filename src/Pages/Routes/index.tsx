import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "../../Components/PrivateRoute";
import HomePage from "../HomePage";
import LoginPage from "../LoginPage";
// import ProfilePage from "../ProfilePage";

const Routes = () => {
  return (
    <>
      <Switch>
        <PrivateRoute exact path="/" component={HomePage} />
        {/* <PrivateRoute exact path="/profile" component={ProfilePage} /> */}
        <Route exact path="/login" component={LoginPage} />
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default Routes;
