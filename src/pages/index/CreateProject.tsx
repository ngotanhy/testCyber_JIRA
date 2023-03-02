import { Button, Form, Input, Select } from "antd";

import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { toastOptionsErr, toastOptionsSuccess } from "../../App";
import TinyMce from "../../components/TinyMce";
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

type Props = {};

const CreateProject = ({}: Props) => {
  const editorRef = useRef<any>(null);

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

  const onFinish = async (values: CreateProject) => {
    if (editorRef.current) {
      values.description = editorRef.current.getContent();
    }
    let data = {
      projectName: values.projectName,
      description: values.description,
      categoryId: values.categoryId,
      alias: values.alias,
    };
    if (values) {
      let createProject = await http.post(
        "/Project/createProjectAuthorize",
        data
      );
      console.log(createProject)
      if (createProject?.status==200) {
        alert('project created successfully')
      } else {
        alert('project failed')

      }
    }else{
      alert('require input project')
    }
  };

  return (
    <div className="">
      <h2 className="text-3xl font-semibold bg-white ">Create Project</h2>
      <div className="ml-2 h-[600px] overflow-y-auto">
        <Form
          name="vertical"
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="projectName"
            rules={[{ message: "Please input your name!" }]}
            className="formItem"
          >
            <Input className="rounded-sm" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="Description"
            rules={[{ message: "Please input your Description!" }]}
            className="formItem"
          >
            <TinyMce editorRef={editorRef} initialValue={""}/>
          </Form.Item>
          <Form.Item name="categoryId" label="Category" className="formItem ">
            <Select defaultValue="Dự án web" className="w-full">
              {category?.map((item: Category) => {
                return (
                  <Option value={item.id} key={item.id} className="mt-1 ">
                    {item.projectCategoryName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="Alias"
            name="alias"
            rules={[{ message: "Please input your alias!" }]}
            className="formItem"
          >
            <Input className="rounded-sm" size="small" />
          </Form.Item>

          <Form.Item wrapperCol={{}} className="mt-1">
            <Button
              type="default"
              htmlType="submit"
              className="bg-slate-500 text-white"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateProject;
