import { Button, Form, Input, Select, Slider } from "antd";
import { TreeSelect } from "antd";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Hooks/HooksRedux";
import {
  getALLPriority,
  getAllProjectManager,
  getAllStatus,
  getAllTaskType,
  Priority,
  project,
  Status,
  TaskType,
} from "../../redux/Reducers/projectReducer";
import { getAllUserApi, user } from "../../redux/Reducers/userReducer";
import { http } from "../../utils/setting";
import { InputNumber, Space } from "antd";
type CrTask = {
  listUserAsign: [];
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

const { SHOW_PARENT } = TreeSelect;
const { Option } = Select;

type Props = {};

export default function CreateTask({}: Props) {
  const [inputValue, setInputValue] = useState(1);
  const [value, setValue] = useState<string[]>();
  // const [treeData, setTreeData] =
  //   useState<{ title: string; value: string; key: string }[]>();

  const { arrProject } = useAppSelector((state) => state.projectReducer);
  const { status } = useAppSelector((state) => state.projectReducer);
  const { taskType } = useAppSelector((state) => state.projectReducer);
  const { priority } = useAppSelector((state) => state.projectReducer);
  const { userAll } = useAppSelector((state) => state.userReducer);

  const dispatch = useAppDispatch();

  // const onChange = (newValue: string[]) => {
  //   console.log("onChange ", value);
  //   console.log(newValue);
  //   // let findTree=
  //   // setValue(newValue);
  // };

  // const covertListUser = () => {
  //   let treeData: { title: string; value: string; key: string }[] = [];
  //   for (let user of userAll) {
  //     treeData.push({
  //       title: user.name,
  //       value: user.id,
  //       key: user.id,
  //     });
  //   }
  //   setTreeData(treeData);
  // };

  const treeData = [
    {
      title: "Node1",
      value: "Node1",
      key: "1",
    },
    {
      title: "Node2",
      value: "Node2",
      key: "2",
    },
  ];

  const tProps = {
    treeData,
    value,
    // onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "Please select",
    style: {
      width: "100%",
    },
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
    console.log(values["Assignment"]);
  };

  useEffect(() => {
    if (arrProject.length == 0) {
      dispatch(getAllProjectManager());
      dispatch(getAllStatus());
      dispatch(getALLPriority());
      dispatch(getAllTaskType());
      dispatch(getAllUserApi());
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
            rules={[{ message: "Please input Project name!" }]}
            className="formItem"
          >
            <Select
              className="w-full"
              defaultValue={arrProject[0]?.projectName}
            >
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
            name="taskName"
            rules={[{ message: "Please input task name!" }]}
            className="formItem"
          >
            <Input className="rounded-sm" />
          </Form.Item>

          <Form.Item
            label="Status"
            name="statusId"
            rules={[{ message: "Please input Status!" }]}
            className="formItem"
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
              className="w-full  formItem"
            >
              <Select className="w-full">
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
              className="w-full formItem"
              label="TaskType"
              name="TaskType"
            >
              <Select className="w-full">
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

          <div className="flex justify-center gap-3">
            <Form.Item
              label="Assignees"
              name="Assignees"
              className="formItem w-full"
            >
              <TreeSelect {...tProps} />
            </Form.Item>
            <Form.Item
              label="Time tracking"
              name="timeTracking"
              className="w-full formItem"
            >
              <Slider
                min={1}
                max={20}
                value={typeof inputValue === "number" ? inputValue : 0}
              />
            </Form.Item>
          </div>

          <div className="flex justify-center gap-3">
            <Form.Item
              label="Original Estimate"
              name="originalEstimate"
              className="formItem "
            >
              <InputNumber min={0} max={100000} defaultValue={0} className='w-full'/>
            </Form.Item>
            <Form.Item
              label="Time Spent"
              name="timeTrackingSpent"
              className="formItem "
            >
              <InputNumber min={0} max={100000} defaultValue={0}  className='w-full'/>
            </Form.Item>
            <Form.Item
              label="Time Remaining"
              name="timeTrackingRemaining"
              className="formItem   "
            >
              <InputNumber min={0} max={100000} defaultValue={0}  className='w-full'/>
            </Form.Item>
          </div>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ message: "Please input your Description!" }]}
          >
            <Input.TextArea />
          </Form.Item>

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
