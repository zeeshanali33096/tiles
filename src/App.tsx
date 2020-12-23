import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
// import Routes from "./Pages/Routes";
import { Layout } from "antd";
import Routes from "./Pages/Routes";
import AuthProvider from "./Components/AuthProvider";

const { Header, Content } = Layout;

const App = () => {
  return (
    <AuthProvider>
      <Layout className="main-layout">
        <Header className="navbar-flex">
          <Navbar />
        </Header>
        <Content className="content-bg">
          <Routes />
        </Content>
        {/* <Footer className="main-footer">Footer</Footer> */}
      </Layout>
    </AuthProvider>
  );
};

export default App;
