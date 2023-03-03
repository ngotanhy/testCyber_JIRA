import { user } from "./TypeUser";

export interface CreTask {
    listUserAsign: [];
    taskName: string;
    description: string;
    statusId:number;
    originalEstimate: number;
    timeTrackingSpent: number;
    timeTrackingRemaining: number;
    projectId: number;
    typeId: number;
    priorityId: number;
  };

export interface project {
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

export  type Member = {
    avatar: string;
    name: string;
    userId: number | string;
  };
  
 export type Category = {
    id: number | string;
    projectCategoryName: string;
  };
  
export  interface UpdProject  {
    id: number;
    projectName: string;
    creator: number;
    description: string;
    categoryId: string;
  };

export  interface UpdTask {
    listUserAsign: [];
    taskId: number;
    taskName: string;
    description: string;
    statusId: number;
    originalEstimate: number;
    timeTrackingSpent: number;
    timeTrackingRemaining: number;
    projectId: number;
    typeId: number;
    priorityId: number;
  };

  
 export interface CreProject {
    projectName: string;
    description: string;
    categoryId: number | string;
    alias: string;
  };
  export type Status = {
    statusId: number | string;
    statusName: string;
    alias: string;
    deleted: boolean;
  };
  

  
  export type TaskType = {
    id: number | string;
    taskType: string;
  };
  
  export type Priority = {
    priorityId: number | string;
    priority: string;
    description: string;
    deleted: boolean;
    alias: string;
  };
   
 export interface Members{
      userId: number;
      name: string;
      avatar: string;
      email: string ;
      phoneNumber: string ;
  }
  interface listTask{
    lstTaskDeTail: [] ;
    statusId: number;
    statusName: string;
    alias: string;
  }
  

  
export interface ProjectDetail {
  lstTask:listTask[];
  members:Members [];
  creator: {
    id: number;
    name: string;
  };
  id: number;
  projectName: string;
  description: string;
  projectCategory: {
    id: number;
    name: string;
  };
  alias: string;
}


export interface TaskProject {
  lstTaskDeTail: [];
  statusId: number;
  statusName: string;
  alias: string;
}

export interface TaskReturnCreate {
  taskId: number;
  taskName: string;
  alias: string;
  description: string;
  statusId: number;
  originalEstimate: number;
  timeTrackingSpent: number;
  timeTrackingRemaining: number;
  projectId: number;
  typeId: number;
  deleted: boolean;
  reporterId: number;
  priorityId: number;
}

export type removeOrAddUser={
    projectId: number
    userId: number
}



export interface TaskDeTail{
    priorityTask: {
      priorityId: number,
      priority: string
    },
    taskTypeDetail: {
      id: number,
      taskType: string
    },
    assigness: [
      {
        id: number,
        avatar: string
        name:string,
        alias: string
      }
    ],
    lstComment: [],
    taskId: number,
    taskName: string
    alias:string
    description: string
    statusId: number,
    originalEstimate: number,
    timeTrackingSpent: number,
    timeTrackingRemaining: number,
    typeId: number,
    priorityId: number,
    projectId: number
} 

// {
//   "lstTaskDeTail": [
//     {
//       "priorityTask": {
//         "priorityId": 1,
//         "priority": "High"
//       },
//       "taskTypeDetail": {
//         "id": 1,
//         "taskType": "bug"
//       },
//       "assigness": [
//         {
//           "id": 3962,
//           "avatar": "https://ui-avatars.com/api/?name=Nga Ho",
//           "name": "Nga Ho",
//           "alias": "nga-ho"
//         }
//       ],
//       "lstComment": [],
//       "taskId": 9228,
//       "taskName": "oke",
//       "alias": "oke",
//       "description": "string",
//       "statusId": "1",
//       "originalEstimate": 2,
//       "timeTrackingSpent": 2,
//       "timeTrackingRemaining": 4,
//       "typeId": 0,
//       "priorityId": 0,
//       "projectId": 11738
//     }
//   ],
//   "statusId": "1",
//   "statusName": "BACKLOG",
//   "alias": "tồn đọng"
// },
// {
//   "lstTaskDeTail": [],
//   "statusId": "2",
//   "statusName": "SELECTED FOR DEVELOPMENT",
//   "alias": "được chọn để phát triển"
// },
// {
//   "lstTaskDeTail": [],
//   "statusId": "3",
//   "statusName": "IN PROGRESS",
//   "alias": "trong tiến trình"
// },
// {
//   "lstTaskDeTail": [],
//   "statusId": "4",
//   "statusName": "DONE",
//   "alias": "hoàn thành"
// }
export interface ListTask {
  lstTask:TaskDeTail [],
  members:user [],
  creator: {
    id: number,
    name: string
  },
  id: number,
  projectName: string,
  description: string,
  projectCategory: {
    id: number,
    name: string
  },
  alias:string 
}

// export interface itemStatus{
//   alias: "tồn đọng"
//   lstTaskDeTail: Array(1)
//   0: 
//   alias: "oke"
//   assigness: [{…}]
//   description: "string"
//   lstComment: []
//   originalEstimate: 2
//   priorityId :  0
//   priorityTask :  {priorityId: 1, priority: 'High'}
//   projectId:11738
// statusId: "1"
//   taskId:9228
//   taskName: "oke"
//   taskTypeDetail: {id: 1, taskType: 'bug'}
//   timeTrackingRemaining: 4
//   timeTrackingSpent: 
//   2
//   typeId
//   : 
//   0
//   [[Prototype]]
//   : 
//   Object
//   length
//   : 
//   1
//   [[Prototype]]
//   : 
//   Array(0)
//   statusId
//   : 
//   "1"
//   statusName
//   : 
//   "BACKLOG"}