import { Button, Form, Input, Select, TreeSelect } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Hooks/HooksRedux";
import {
  getAllProjectManager,
  getAllStatus,
  getProjectByUser,
} from "../../redux/Reducers/projectReducer";
import { apiGetProjectDetail } from "../../utils/api/projectApi";
import {
  apiAddUserAssignTask,
  apiGetUserByProjectId,
} from "../../utils/api/userApi";
import { getStoreJSON, USER_LOGIN } from "../../utils/setting";
import {
  ListTask,
  project,
  Status,
  TaskDeTail,
  UpdTask,
} from "../../utils/type/TypeProject";
import { user } from "../../utils/type/TypeUser";

type AddAssignTask = {
  projectId: number;
  taskName: string;
  listUserAsign: {
    userId: number;
  }[];
  taskId: number;
};

type AssignTask = {
  taskId: number;
  userId: number;
};

type Props = {};

export default function AddAssignTask({}: Props) {
  const dispatch = useAppDispatch();
  const [userAssign, setUserAssign] = useState<user[]>();
  const [lstTaskDeTail, setLstTaskDeTail] = useState<TaskDeTail[]>([]);
  const [lstDeTail, setDeTail] = useState<TaskDeTail[]>([]);

  const navigate = useNavigate();
  const { SHOW_PARENT } = TreeSelect;
  const { Option } = Select;
  const [treeData, setTreeData] =
    useState<
      { title: string | number; value: string | number; key: string | number }[]
    >();
  const { status } = useAppSelector((state) => state.projectReducer);
  const { projectByUserLogin } = useAppSelector(
    (state) => state.projectReducer
  );

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

  const onClickCallGetData = async (
    getItem: any,
    message: string,
    nameItem: any
  ) => {
    if (nameItem.length == 0) {
      await dispatch(getItem);
      alert("await loading " + message);
    }
  };

  const getUserByProject = async (idProject: number) => {
    try {
      let result = await apiGetUserByProjectId(idProject);
      // console.log(result.data.content);
      await setUserAssign(result.data.content);
    } catch (e) {}
  };

  const getListTask = async (idProject: number) => {
    try {
      let dataDetail = await apiGetProjectDetail(idProject);
      let ListTask: ListTask = dataDetail.data.content;
      setLstTaskDeTail(ListTask.lstTask);
      // console.log(ListTask.lstTask)
    } catch (e) {
      alert("error");
    }
  };

  const handleGetArrTask = (status: string) => {
    lstTaskDeTail.map(async (item: any) => {
      if (item.statusName === status) {
        await setDeTail(item.lstTaskDeTail);
        console.log("a");
      }
    });
  };

  const onFinish = async (values: AddAssignTask) => {
    try {
      // console.log(values);
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
            console.log(result, "ok");
            alert("success assign task")
          })
          .catch((err) => {
            console.log("error: " + err);
          });
      }

      alert("AssignTask success");
    } catch (e) {
      alert("AssignTask failed");
    }
  };

  useEffect(() => {
    covertListUser();
  }, [userAssign]);

  return (
    <div className=" ">
      <h2 className="text-3xl font-semibold">Add Assign Task</h2>
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
              defaultValue={"Project"}
              onChange={(value) => {
                if (value) {
                  getUserByProject(Number(value));
                  getListTask(Number(value));
                }
              }}
              onFocus={async () => {
                if (projectByUserLogin.length == 0) {
                  await dispatch(getAllProjectManager());
                  await dispatch(
                    getProjectByUser(getStoreJSON(USER_LOGIN).content.id)
                  );
                  alert("please create project for you");
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
              onClick={() => {
                onClickCallGetData(getAllStatus(), "status", status);
              }}
              onChange={(value) => {
                handleGetArrTask(value);
              }}
            >
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
            label="Assignees"
            name="listUserAsign"
            className="formItem w-full"
          >
            <TreeSelect {...tProps} />
          </Form.Item>

          <Form.Item wrapperCol={{}}>
            <Button
              type="default"
              htmlType="submit"
              className="bg-slate-500 text-white mt-2"
            >
              Add Assign Task
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
