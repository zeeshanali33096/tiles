import React, { useContext } from "react";
import { Dropdown, Menu, Typography } from "antd";

import { Avatar } from "antd";
import "./index.css";
import { NavLink } from "react-router-dom";
import { firebaseSignOut } from "../../Services/auth";
import { AuthContext } from "../AuthProvider";
import blankImage from "./blank-profile.png";
import firebase from "firebase";

const { Title } = Typography;

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  console.log({ uid: currentUser?.uid });

  const menu = (
    <Menu>
      <Menu.Item key="0">
        Welcome{" "}
        {(currentUser as firebase.User) === null
          ? ""
          : (currentUser as firebase.User).displayName + " !"}
      </Menu.Item>
      {/* <Menu.Item key="1">
        <NavLink to="/profile">Edit Profile</NavLink>
      </Menu.Item> */}
      <Menu.Divider />
      <Menu.Item key="1">
        <a
          href="#p"
          onClick={(e) => {
            e.preventDefault();
            firebaseSignOut();
          }}
        >
          Logout
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <NavLink to="/">
        <Title style={{ color: "white", margin: 0 }} level={3}>
          Tiles
        </Title>
      </NavLink>
      {currentUser && (
        <Dropdown overlay={menu} trigger={["click"]}>
          <Avatar
            src={
              (currentUser as firebase.User).photoURL === null
                ? blankImage
                : (currentUser as firebase.User).photoURL
            }
            style={{ cursor: "pointer" }}
          />
        </Dropdown>
      )}
    </>
  );
};

export default Navbar;
