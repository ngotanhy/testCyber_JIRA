import { http } from "../setting";
import { removeOrAddUser } from "../type/TypeProject";

const apiGetAllUser = () => {
  let uri = "/Users/getUser";
  return http.get(uri);
};
const apiAssignUserProject=(data:removeOrAddUser)=>{
  let uri = `/Project/assignUserProject`;
  return http.post(uri,data);
}

const apiGetUserByProjectId = (id: Number) => {
  let uri = `/Users/getUserByProjectId?idProject=${id}`;
  return http.get(uri);
};

const apiRemoveUserFromProject = (dataDelete:removeOrAddUser) => {
  let uri = `/Project/removeUserFromProject`;
  return http.post(uri,dataDelete);
};

const apiAddUserAssignTask=(data:{taskId:number,
  userId: number})=>{
    let uri = `/Project/assignUserTask`;
    return http.post(uri, data);
}

export {
   apiGetAllUser, 
  apiGetUserByProjectId, 
  apiRemoveUserFromProject,
  apiAssignUserProject,
  apiAddUserAssignTask
};
