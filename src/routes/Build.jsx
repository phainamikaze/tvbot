import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { dbQuery } from "../control/db";

const App = () => {
  const [form] = Form.useForm();

  const onSave = (values) => {
    Promise.all(
      Object.keys(values).map((key) => {
        console.log(key, values[key]);
        return dbQuery(
          "INSERT INTO userconfig (key,value) VALUES(?,?) ON CONFLICT (key) DO UPDATE SET value=?;",
          [key, values[key], values[key]]
        );
      })
    )
      .then((d) => {
        console.log("done", d);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const loadUserConfig = async () => {
    try {
      const result = await dbQuery("select * from userconfig", []);
      result.map((e) => {
        form.setFieldValue(e.key, e.value);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadUserConfig();
  }, []);

  return (
    <>
      {/* {contextHolder} */}
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        onFinish={onSave}
        autoComplete="off"
      >
        <Form.Item
          label="Server URL"
          name="server"
          rules={[
            {
              required: true,
              message: "Please input your Server URL",
            },
          ]}
        >
          <Input placeholder="https://ts100.x10.asia.travian.com" />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input placeholder="john@gmail.com" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>{" "}
    </>
  );
};
export default App;
