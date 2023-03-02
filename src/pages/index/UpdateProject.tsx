import { Button, Form, Input, Select } from "antd";

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import TinyMce from "../../components/TinyMce";
import { useAppDispatch, useAppSelector } from "../../Hooks/HooksRedux";
import {
  getAllProjectManager,
  getProjectByIdApi,
  project,
} from "../../redux/Reducers/projectReducer";
import { http } from "../../utils/setting";

type Category = {
  id: number | string;
  projectCategoryName: string;
};

type updateProject = {
  id: number;
  projectName: string;
  creator: number;
  description: string;
  categoryId: string;
};

const { Option } = Select;
type Props = {};
function UpdateProject({}: Props) {
  const editorRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [category, setCategory] = useState<Category[]>();
  // const [project, setProject] = useState<project>();
  const { arrProject } = useAppSelector((state) => state.projectReducer);
  const { detailProject } = useAppSelector((state) => state.projectReducer);


  const [inputProject, setInputProject] = useState<updateProject>({
    id: 0,
    projectName: "",
    creator: 0,
    description: "",
    categoryId: "",
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

  const onFinish = async (values: updateProject) => {
    if (editorRef.current) {
      values.description = editorRef.current.getContent();
    }
    let data = {
      id: Number(id),
      projectName: values.projectName,
      creator: values.creator,
      description:values.description,
      categoryId: values.categoryId? values.categoryId: detailProject?.projectCategory.id,
    };
    try {
      let createProject = await http.put(`/Project/updateProject?projectId=${id}`, data);
      if (createProject) {
        alert("update success");
      }
    } catch (e) {
      alert("update failure");
    }
  };
  const getProject = () => {
    // let pro = arrProject?.find((project: project) => project.id === Number(id));
    // if (pro) {
    //   setProject(pro);
    // }
    dispatch(getProjectByIdApi(Number(id)))
  };
  useEffect(() => {
    if (arrProject.length === 0) {
      dispatch(getAllProjectManager());
    }
    getProject();
  }, [id]);
  return (
    <div className="">
      <h2 className="text-3xl font-semibold bg-white ">Update Project</h2>
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
            <Input className="rounded-sm" placeholder={detailProject?.projectName} />
          </Form.Item>

          <Form.Item
            label="Description"
            name="Description"
            rules={[{ message: "Please input your Description!" }]}
            className="formItem"
          >
            <TinyMce
              editorRef={editorRef}
              initialValue={detailProject?.description}
            />
          </Form.Item>

          <Form.Item name="categoryId" label="Category" className="formItem ">
            <Select
              defaultValue={detailProject?.projectCategory.name}
              className="w-full"
              placeholder={detailProject?.projectCategory.name}
            >
              {category?.map((item: Category) => {
                return (
                  <Option value={item.id} key={item.id} className="mt-1 ">
                    {item.projectCategoryName}
                  </Option>
                );
              })}
            </Select>
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
}

export default UpdateProject;
