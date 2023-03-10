import { Button, Form, Input, Select, Slider } from "antd";
import { TreeSelect } from "antd";

import React, { useEffect, useRef, useState } from "react";
import {
  getALLPriority,
  getAllProjectManager,
  getAllStatus,
  getAllTaskType,
  getProjectByUser,
} from "../../redux/Reducers/projectReducer";
import { getAllUserApi } from "../../redux/Reducers/userReducer";
import { getStoreJSON, http, USER_LOGIN } from "../../utils/setting";
import { InputNumber } from "antd";
import TinyMce from "../../components/TinyMce";
import { useAppDispatch, useAppSelector } from "../../Hooks/HooksRedux";
import { user } from "../../utils/type/TypeUser";
import {
  AssignTask,
  ListTask,
  Priority,
  project,
  Status,
  TaskDeTail,
  TaskType,
  UpdTask,
} from "../../utils/type/TypeProject";
import { apiGetProjectDetail, apiUpdateTask } from "../../utils/api/projectApi";
import {
  apiAddUserAssignTask,
  apiGetUserByProjectId,
} from "../../utils/api/userApi";
import { Editor as TinyMCEEditor } from "tinymce";
import { toast } from "react-toastify";
import { toastOptionsErr, toastOptionsSuccess } from "../../App";

const { SHOW_PARENT } = TreeSelect;
const { Option } = Select;

type Props = {};

export default function UpdateTask({}: Props) {
  // const [inputValue, setInputValue] = useState(1);
  // const [value, setValue] = useState<string>();
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [treeData, setTreeData] =
    useState<
      { title: string | number; value: string | number; key: string | number }[]
    >();
  const { arrProject } = useAppSelector((state) => state.projectReducer);
  const { status } = useAppSelector((state) => state.projectReducer);
  const { taskType } = useAppSelector((state) => state.projectReducer);
  const { priority } = useAppSelector((state) => state.projectReducer);
  const { userAll } = useAppSelector((state) => state.userReducer);
  const { projectByUserLogin } = useAppSelector(
    (state) => state.projectReducer
  );

  //get taskID
  const [lstTaskDeTail, setLstTaskDeTail] = useState<TaskDeTail[]>([]);
  const [lstDeTail, setDeTail] = useState<TaskDeTail[]>([]);
  const [projectName, setProjectName] = useState<string>("");
  const [userAssign, setUserAssign] = useState<user[]>();
  const dispatch = useAppDispatch();

  //change list user for render
  const covertListUser = () => {
    let treeData: {
      title: string | number;
      value: string | number;
      key: string | number;
    }[] = [];
    for (let user in userAssign) {
      let userEl = userAssign[Number(user)];
      treeData.push({
        title: userEl.name,
        value: userEl.userId,
        key: userEl.userId,
      });
    }

    setTreeData(treeData);
  };

  const tProps = {
    treeData,
    // value,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "Please select",
    style: {
      width: "100%",
    },
  };

  // const handleGetTaskId
  const handleGetArrTask = (status: string) => {
    lstTaskDeTail.map(async (item: any) => {
      if (item.statusId === status) {
        await setDeTail(item.lstTaskDeTail);
      }
    });
  };

  const onFinish = async (values: UpdTask) => {
    if (editorRef.current) {
      values.description = editorRef.current.getContent();
    }
    if (typeof values.taskId === "number") {
      values = { ...values, statusId: Number(values.statusId) };
      try {
        let dataUser: AssignTask[] = [];
        for (let u in values.listUserAsign) {
          dataUser.push({
            taskId: Number(values.taskId),
            userId: Number(values.listUserAsign[u]),
          });
        }
        if (dataUser.length > 0) {
          let assignTask = dataUser.map(
            (item) =>
              new Promise((resolve, reject) => {
                const api = apiAddUserAssignTask(item);
                api.then((result) => {
                  resolve(result);
                });
              })
          );
          Promise.all(assignTask)
            .then((result) => {
              toast.success("success assign task", toastOptionsSuccess);
            })
            .catch((err) => {
              toast.error("error", toastOptionsErr);
            });
        }

        await apiUpdateTask(values);
        toast.success("update task  success", toastOptionsSuccess);
      } catch (e) {
        toast.error("task failed", toastOptionsErr);
      }
    } else {
      toast.error("create task for the project", toastOptionsErr);
    }
  };

  const getListTask = async (idProject: number) => {
    try {
      let dataDetail = await apiGetProjectDetail(idProject);
      let ListTask: ListTask = dataDetail.data.content;
      setLstTaskDeTail(ListTask.lstTask);
    } catch (e) {
      toast.error("error", toastOptionsErr);
    }
  };

  const getUserByProject = async (idProject: number) => {
    try {
      let result = await apiGetUserByProjectId(idProject);
      await setUserAssign(result.data.content);
    } catch (e) {}
  };

  useEffect(() => {
    covertListUser();
  }, [userAssign]);

  useEffect(() => {
    if (!status) {
      dispatch(getAllStatus());
    } else if (!priority) {
      dispatch(getALLPriority());
    } else if (!taskType) {
      dispatch(getAllTaskType());
    } else if (!arrProject) {
      dispatch(getAllProjectManager());
    }
    dispatch(getAllUserApi());
    dispatch(getProjectByUser(getStoreJSON(USER_LOGIN).content.id));
    if (userAll) {
      covertListUser();
    }
  }, []);

  return (
    <div className=" ">
      <h2 className="text-3xl font-semibold">Update Task</h2>
      <div className="ml-2 content-container overflow-y-auto">
        <Form
          name="vertical"
          style={{ maxWidth: 700 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="Project" name="projectId" className="formItem">
            <Select
              className="w-full"
              defaultValue={projectByUserLogin[0]?.projectName}
              onChange={(value) => {
                setProjectName(value);
                getUserByProject(Number(value));
                getListTask(Number(value));
              }}
              onClick={async () => {
                if (projectByUserLogin.length == 0) {
                  await dispatch(getAllProjectManager());
                  await dispatch(
                    getProjectByUser(getStoreJSON(USER_LOGIN).content.id)
                  );
                  await dispatch(getALLPriority());
                  await dispatch(getAllStatus());
                  await dispatch(getAllTaskType());
                  toast.error("await", toastOptionsErr);
                }
              }}
            >
              {projectByUserLogin?.map((item: project) => {
                return (
                  <Option value={item.id} key={item.id} className="mt-1 ">
                    {item.projectName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="Status"
            name="statusId"
            rules={[{ message: "Please input Status!" }]}
            className="formItem"
          >
            <Select
              className="w-full"
              disabled={projectName ? false : true}
              onChange={(value) => {
                handleGetArrTask(value);
              }}
            >
              {status?.map((item: Status) => {
                return (
                  <Option
                    value={item.statusId}
                    key={item.statusId}
                    className="mt-1 "
                  >
                    {item.statusName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item label="TaskID" name="taskId" className="formItem">
            <Select className="w-full">
              {lstDeTail.length > 0 ? (
                lstDeTail.map((item: TaskDeTail) => {
                  return (
                    <Option
                      value={item.taskId}
                      key={item.taskId}
                      className="mt-1 "
                    >
                      {item.taskId}
                    </Option>
                  );
                })
              ) : (
                <p>Not task, you cannot update task</p>
              )}
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

          <div className="flex justify-between gap-3">
            <Form.Item
              label="Priority"
              name="priorityId"
              className="w-full  formItem"
            >
              <Select className="w-full" onClick={() => {}}>
                {priority?.map((item: Priority) => {
                  return (
                    <Option
                      value={item.priorityId}
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
              name="typeId"
            >
              <Select className="w-full" onClick={() => {}}>
                {taskType?.map((item: TaskType) => {
                  return (
                    <Option value={item.id} key={item.id} className="mt-1 ">
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
              name="listUserAsign"
              className="formItem w-full"
            >
              <TreeSelect {...tProps} />
            </Form.Item>
            <Form.Item
              label="Time tracking"
              name="timeTracking"
              className="w-full formItem"
            >
              <Slider min={0} max={30} value={0} />
            </Form.Item>
          </div>

          <div className="flex justify-center gap-3">
            <Form.Item
              label="Original Estimate"
              name="originalEstimate"
              className="formItem "
            >
              <InputNumber
                min={0}
                max={100000}
                defaultValue={0}
                className="w-full"
              />
            </Form.Item>
            <Form.Item
              label="Time Spent"
              name="timeTrackingSpent"
              className="formItem "
            >
              <InputNumber
                min={0}
                max={100000}
                defaultValue={0}
                className="w-full"
              />
            </Form.Item>
            <Form.Item
              label="Time Remaining"
              name="timeTrackingRemaining"
              className="formItem   "
            >
              <InputNumber
                min={0}
                max={100000}
                defaultValue={0}
                className="w-full"
              />
            </Form.Item>
          </div>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ message: "Please input your Description!" }]}
          >
            <TinyMce editorRef={editorRef} initialValue={""} />
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
