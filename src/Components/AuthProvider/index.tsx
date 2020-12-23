import React, { useEffect, useState } from "react";

import { Auth } from "../../Services/firebase";
import firebase from "firebase";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export const AuthContext = React.createContext<any>(null);

const AuthProvider = (props: { children: any }) => {
  const [currentUser, setCurrentUser] = useState<null | firebase.User>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 96, color: "#021529" }} spin />
  );
  useEffect(() => {
    const listenerStop = Auth.onAuthStateChanged((user) => {
      console.log({ user });
      setCurrentUser(user);
      setLoading(false);
    });
    return () => {
      listenerStop();
    };
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {loading ? (
        <div className="login-form-container">
          <Spin indicator={antIcon} />
        </div>
      ) : (
        props.children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
