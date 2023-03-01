import { Button, Form, Input, Select } from "antd";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Hooks/HooksRedux";
import {
  getAllProjectManager,
  project,
} from "../../redux/Reducers/projectReducer";
import { http } from "../../utils/setting";

type CrTask = {
  listUserAsign: { uniqueItems: boolean }[];
  taskName: string;
  description: string;
  statusId: string;
  originalEstimate: number;
  timeTrackingSpent: number;
  timeTrackingRemaining: number;
  projectId: number;
  typeId: number;
  priorityId: number;
};

type Status = {
  statusId: number | string;
  statusName: string;
  alias: string;
  deleted: boolean;
};

type TaskType={
   id: number|string,
   taskType:string
}

type Priority={
    priorityId: number|string,
    priority: string,
    description: string,
    deleted: boolean,
    alias: string
}

type Props = {};

export default function CreateTask({}: Props) {
  const [status, setStatus] = useState<Status[]>();
  const [taskType,setTaskType]=useState<TaskType[]>();
  const [priority,setPriority]=useState<Priority[]>();

  const { arrProject } = useAppSelector((state) => state.projectReducer);
  const dispatch = useAppDispatch();
  const { Option } = Select;
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const getStatus = async () => {
    let result = await http.get("/Status/getAll");
    if (result) {
      setStatus(result.data.content);
    }
  };

  const getTaskType= async()=>{
    let result = await http.get("/TaskType/getAll");
    if (result) {
      setTaskType(result.data.content);
    }
  }
  const getPriority= async()=>{
    let result = await http.get("/Priority/getAll");
    if (result) {
        setPriority(result.data.content);
    }
  }

  useEffect(() => {
    if (arrProject.length == 0) {
      dispatch(getAllProjectManager());
      getStatus();
      getPriority();
      getTaskType();
    }
  }, []);

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
            label="Project"
            name="project"
            rules={[{ message:"Please input Project name!" }]}
          >
            <Select className="w-full" defaultValue={arrProject[0]?.projectName}>
              {arrProject?.map((item: project) => {
                return (
                  <Option
                    value={item.projectName}
                    key={item.id}
                    className="mt-1 "
                  >
                    {item.projectName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="Task Name"
            name="task"
            rules={[{ message: "Please input task name!" }]}
          >
            <Input className="rounded-sm" />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ message: "Please input Status!" }]}
          >
            <Select className="w-full">
              {status?.map((item: Status) => {
                return (
                  <Option
                    value={item.statusName}
                    key={item.statusId}
                    className="mt-1 "
                  >
                    {item.statusName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <div className="flex justify-between gap-3">
            <Form.Item
              label="Priority"
              name="Priority"
              rules={[{ message: "Please input Priority!" }]}
              className="w-full"
            >
              <Select className="w-full" defaultValue={'High'}>
                {priority?.map((item: Priority) => {
                  return (
                    <Option
                      value={item.description}
                      key={item.priorityId}
                      className="mt-1 "
                    >
                      {item.description}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
             className="w-full"
              label="Task Type"
              name="TaskType"
              rules={[{ message: "Please input Task Type!" }]}
            >
              <Select className="w-full" defaultValue={'bug'}>
                {taskType?.map((item: TaskType) => {
                  return (
                    <Option
                      value={item.taskType}
                      key={item.id}
                      className="mt-1 "
                    >
                      {item.taskType}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </div>
          
          <div>
          <Form.Item
            label="Project"
            name="project"
            rules={[{ message:"Please input Project name!" }]}
          >
            <Select className="w-full" defaultValue={arrProject[0]?.projectName}>
              {arrProject?.map((item: project) => {
                return (
                  <Option
                    value={item.projectName}
                    key={item.id}
                    className="mt-1 "
                  >
                    {item.projectName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          </div>
          <Form.Item
            label="Description"
            name="Description"
            rules={[{ message: "Please input your Description!" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="Dự án web"></Form.Item>
          <Form.Item wrapperCol={{}}>
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
