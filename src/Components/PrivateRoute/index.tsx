import React, { useContext } from "react";

import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

const PrivateRoute = (props: any) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...props.rest}
      render={(routeProps: any) =>
        !!currentUser ? (
          <props.component {...routeProps} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
