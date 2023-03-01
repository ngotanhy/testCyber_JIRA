import { Button, Form, Input, Select } from "antd";

import React, { useEffect, useState } from "react";
import { project } from "../../redux/Reducers/projectReducer";
import { http } from "../../utils/setting";

type Category = {
  id: number | string;
  projectCategoryName: string;
};

type CreateProject = {
  projectName: string;
  description: string;
  categoryId: number | string;
  alias: string;
};

const { Option } = Select;

type Props={
    
}
export default function UpdateProject({}: Props) {
    const [category, setCategory] = useState<Category[]>();

  const [inputProject, setInputProject] = useState<CreateProject>({
    projectName: "",
    description: "",
    categoryId: 0,
    alias: "",
  });

  const getCategory = async () => {
    let category = await http.get("/ProjectCategory");
    if (category.data) {
      setCategory(category.data.content);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };
  return (
    <div className="">
    <h2 className="text-3xl font-semibold">Create Project</h2>
    <div className="ml-2 w-5/6">
      <Form
        name="vertical"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ message: "Please input your name!" }]}
        >
          <Input className="rounded-sm" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="Description"
          rules={[{ message: "Please input your Description!" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="Dự án web">
          <Select defaultValue="Dự án web" className="w-full">
            {category?.map((item: Category) => {
              return (
                <Option
                  value={item.projectCategoryName}
                  key={item.id}
                  className="mt-1 "
                >
                  {item.projectCategoryName}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{}}>
          <Button type="default" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  </div>
  )
}