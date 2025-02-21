import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import MainRoute from "./route";

const { Content } = Layout;
const items = [
  {
    label: "User config",
    key: "userconfig",
  },
  {
    label: "error",
    key: "/error",
  },
  {
    label: "Setting",
    key: "setting",
    disabled: true,
  },
];

const App = () => {
  const [current, setCurrent] = useState("/");
  const navigate = useNavigate();
  return (
    <Layout>
      <Content
        style={{
          height: "100vh",
        }}
      >
        <Menu
          onClick={(e) => {
            console.log("click ", e);
            setCurrent(e);
            navigate(e.key);
          }}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
        <MainRoute />
      </Content>
    </Layout>
  );
};
export default App;
