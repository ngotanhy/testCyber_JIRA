export interface CreTask {
    listUserAsign: [];
    taskName: string;
    description: string;
    statusId: string|number;
    originalEstimate: number;
    timeTrackingSpent: number;
    timeTrackingRemaining: number;
    projectId: number;
    typeId: number|string;
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
    statusId: string;
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