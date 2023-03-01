import React, { useEffect, useMemo, useState } from "react";
import { TiDelete } from "react-icons/ti";

import { Button, Popover, Select, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { getStoreJSON, http, USER_LOGIN } from "../../utils/setting";
import { toast } from "react-toastify";
import { toastOptionsErr, toastOptionsSuccess } from "../../App";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { user } from "../../redux/Reducers/userReducer";
import { useAppDispatch, useAppSelector } from "../../Hooks/HooksRedux";
import { getAllProjectManager } from "../../redux/Reducers/projectReducer";

interface project {
  members: {
    avatar: string;
    name: string;
    userId: number | string;
  }[];
  creator: {
    id: number;
    name: string;
  };
  id: number;
  projectName: string;
  description: string;
  categoryId: number;
  categoryName: string;
  alias: string;
  deleted: boolean;
}

type Member = {
  avatar: string;
  name: string;
  userId: number | string;
};

type Props = {};

export default function ListProjectManager({}: Props) {
  const dispatch=useAppDispatch()
  const {arrProject} =useAppSelector((state)=>state.projectReducer);
  
  const [content, setContent] = useState<JSX.Element[]>();
  const [addUser, setAddUser] = useState<user>();
  const [allUser, setAllUser] = useState<user[]>();
  const { Option } = Select;
  const navigate = useNavigate();

  const setContentMember = (id: number) => {
    let findProject = arrProject?.find(
      (project: project) => Number(project.id) == id
    );
    let contentHtml = [
      <>
        <table>
          <tr className="text-center">
            <th>id</th>
            <th>avatar</th>
            <th>name</th>
            <th></th>
          </tr>
          {findProject?.members.map((member: Member, index: number) => {
            return (
              <tr className="text-center border-b-[1px]">
                <td>{member.userId}</td>
                <td className="flex justify-center items-center">
                  <img
                    src={member.avatar}
                    alt="avatar"
                    className="w-7 h-7 rounded-full"
                  />
                </td>
                <td>{member.name}</td>
                <td>
                  <button
                    className=" text-base flex justify-center items-center  "
                    onClick={() => {
                      if (findProject) {
                        deleteMember(findProject?.id, Number(member.userId));
                      }
                    }}
                  >
                    <TiDelete className="text-2xl hover:shadow-lg text-red-700" />
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </>,
    ];
    setContent(contentHtml);
  };

  const deleteMember = async (idProject: number, userId: number) => {
    let dataDelete = {
      projectId: idProject,
      userId: userId,
    };
    console.log(dataDelete);
    // let deleteMember = await http.post(
    //   "/Project/removeUserFromProject",
    //   dataDelete
    // );
    // if (deleteMember) {
    //   toast.success("deleted user successfully", toastOptionsSuccess);
    // } else {
    //   toast.error("deleted user failed", toastOptionsErr);
    // }
  };

  const columns: ColumnsType<project> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "projectName",
      dataIndex: "projectName",
      key: "projectName",
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "creator",
      dataIndex: "creator",
      key: "creator",
      render: (_, { creator }) => (
        <div>{creator.name.slice(0, 10) + "..."}</div>
      ),
    },
    {
      title: "members",
      key: "members",
      dataIndex: "members",
      render: (_, { members, id }) => (
        <>
          <div className="flex">
            <Popover
              placement="bottom"
              content={content}
              className="flex"
              title={
                <>
                  <span>Member</span>
                </>
              }
              onOpenChange={() => {
                setContentMember(id);
              }}
            >
              {members.map((member) => {
                return (
                  <div>
                    <div className=" w-7 h-7 mr-1 relative">
                      <img
                        src={member.avatar}
                        alt=""
                        className="w-7 h-7 absolute rounded-full top-0 left-0 inline"
                      />
                    </div>
                  </div>
                );
              })}
            </Popover>
            <Popover
              placement="bottom"
              content={
                <>
                  <Select className="w-full" onChange={(value)=>{
                    console.log(value)
                  }}>
                    {allUser?.map((item: user) => {
                      return (
                        <Option
                          value={item.name}
                          key={item.id}
                          className="mt-1 "
                        >
                          {item.name}
                        </Option>
                      );
                    })}
                  </Select>
                </>
              }
              className="flex"
              title={
                <>
                  <span>Add member</span>
                </>
              }
            >
              <button>
                <div className="rounded-full w-7 h-7 bg-slate-100 p-[0.5px] mr-1 ">
                  <div className="flex justify-center items-center w-full h-full">
                    <AiOutlinePlus className="inline" />
                  </div>
                </div>
              </button>
            </Popover>
          </div>
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];


  // const getAllUser = async () => {
  //   let allUser = await http.get(`/Users/getUser?Keyword=${name}`);
  //   if (allUser) {
  //     setAllUser(allUser.data.content);
  //   } else {
  //     alert("please select task of your project");
  //   }
  // };

  useEffect(() => {
    let userLogin = getStoreJSON(USER_LOGIN);
    if (userLogin) {
      dispatch(getAllProjectManager());
      // getAllUser();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="">
      <h1 className="text-3xl font-semibold">Project Manager</h1>
      <div className="h-[600px] overflow-y-auto">
        <Table columns={columns} dataSource={arrProject} />
      </div>
    </div>
  );
}
